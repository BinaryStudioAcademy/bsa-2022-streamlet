import { BaseHttpController, controller, httpGet, httpPost, requestBody, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { ApiPath, DefaultRequestParam, TagApiPath, TagCreateRequestDto, TagResponseDto } from 'shared/build';
import { TagService } from '~/core/tag/application/tag-service';
import { NotFound } from '~/shared/exceptions/not-found';
import { DuplicationError } from '~/shared/exceptions/duplication-error';
import { normalizeTagPayload } from './helpers/helpers';

@controller(ApiPath.TAG)
export class TagController extends BaseHttpController {
  private tagService: TagService;

  constructor(@inject(CONTAINER_TYPES.TagService) tagService: TagService) {
    super();

    this.tagService = tagService;
  }

  @httpGet(TagApiPath.$ID)
  public async getById(@requestParam() { id }: DefaultRequestParam): Promise<TagResponseDto> {
    const tag = await this.tagService.getById(id);
    if (!tag) {
      throw new NotFound('Invalid Tag id');
    }

    return tag;
  }

  @httpPost(TagApiPath.ROOT)
  public async createTag(@requestBody() body: TagCreateRequestDto): Promise<TagResponseDto> {
    const payload = normalizeTagPayload(body);
    const isTagCreated = await this.tagService.getByName(payload);
    if (isTagCreated) {
      throw new DuplicationError('Tag already created');
    }

    return this.tagService.createTag(payload);
  }
}
