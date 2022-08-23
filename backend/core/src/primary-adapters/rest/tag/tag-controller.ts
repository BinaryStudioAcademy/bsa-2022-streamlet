import { BaseHttpController, controller, httpGet, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { CONTAINER_TYPES } from '~/shared/types/types';
import { ApiPath, DefaultRequestParam, TagApiPath, TagResponseDto } from 'shared/build';
import { TagService } from '~/core/tag/application/tag-service';
import { NotFound } from '~/shared/exceptions/not-found';

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

  // @httpPost('/notify-broadcast')
  // public notifyBroadcast(@requestBody() body: { data: { message: string } }): Promise<boolean> {

  // }
}
