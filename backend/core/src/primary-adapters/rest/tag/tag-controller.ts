import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  queryParam,
  requestBody,
  requestParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import {
  ApiPath,
  DefaultRequestParam,
  SearchByTagResponseDto,
  TagApiPath,
  TagCreateRequestDto,
  TagResponseDto,
  TagSearchRequestQueryDto,
} from 'shared/build';
import { TagService } from '~/core/tag/application/tag-service';
import { NotFound } from '~/shared/exceptions/not-found';
import { normalizeTagPayload } from './helpers/helpers';
import { normalizeTagFiltersPayload } from './helpers/normalize-tag-filters-helper';
import { authenticationMiddleware } from '../middleware';

@controller(ApiPath.TAG, authenticationMiddleware)
export class TagController extends BaseHttpController {
  private tagService: TagService;

  constructor(@inject(CONTAINER_TYPES.TagService) tagService: TagService) {
    super();

    this.tagService = tagService;
  }

  @httpGet(TagApiPath.SEARCH)
  public async search(@queryParam() { take, skip, tags }: TagSearchRequestQueryDto): Promise<SearchByTagResponseDto[]> {
    return this.tagService.search({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      tags: normalizeTagFiltersPayload(tags),
    });
  }

  @httpGet(TagApiPath.$ID)
  public async getById(@requestParam() { id }: DefaultRequestParam): Promise<TagResponseDto> {
    const tag = await this.tagService.getById(id);
    if (!tag) {
      throw new NotFound('Invalid Tag id');
    }

    return tag;
  }

  @httpPost(TagApiPath.$BIND)
  public async bindTagToVIdeo(
    @requestParam() { id }: DefaultRequestParam,
    @requestBody() body: TagCreateRequestDto,
  ): Promise<TagResponseDto> {
    const payload = normalizeTagPayload(body);

    const tag = await this.tagService.bindTag({
      ...payload,
      videoId: id,
    });
    if (!tag) {
      throw new NotFound('Video not found');
    }

    return tag;
  }
}
