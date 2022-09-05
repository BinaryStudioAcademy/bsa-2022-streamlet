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
  BaseVideoResponseDto,
  TagApiPath,
  TagResponseDto,
  TagSearchRequestQueryDto,
  BindTagToVideoRequestDto,
} from 'shared/build';
import { TagService } from '~/core/tag/application/tag-service';
import { NotFound } from '~/shared/exceptions/not-found';
import { normalizeTagPayload } from './helpers/helpers';
import { normalizeTagFiltersPayload } from './helpers/normalize-tag-filters-helper';
import { authenticationMiddleware } from '../middleware';

@controller(ApiPath.TAG)
export class TagController extends BaseHttpController {
  private tagService: TagService;

  constructor(@inject(CONTAINER_TYPES.TagService) tagService: TagService) {
    super();

    this.tagService = tagService;
  }

  @httpGet(TagApiPath.SEARCH)
  public async search(@queryParam() { take, skip, tags }: TagSearchRequestQueryDto): Promise<BaseVideoResponseDto[]> {
    return this.tagService.search({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      tags: normalizeTagFiltersPayload(tags),
    });
  }

  @httpGet(TagApiPath.$ID)
  public async getById(@requestParam('tagId') id: string): Promise<TagResponseDto> {
    const tag = await this.tagService.getById(id);
    if (!tag) {
      throw new NotFound('Invalid Tag id');
    }

    return tag;
  }

  @httpPost(TagApiPath.$BIND, authenticationMiddleware)
  public async bindTagToVIdeo(
    @requestParam('tagId') id: string,
    @requestBody() { tags }: BindTagToVideoRequestDto,
  ): Promise<TagResponseDto[]> {
    const payload = tags.map((tag) => normalizeTagPayload(tag));

    const bindedTags = await this.tagService.bindTags({
      tagPayload: payload,
      videoId: id,
    });
    if (!bindedTags) {
      throw new NotFound('Video not found');
    }

    return bindedTags;
  }
}
