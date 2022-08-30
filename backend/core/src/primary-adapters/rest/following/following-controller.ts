import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import { FollowingService } from '~/core/following/application/following-service';
import { ApiPath, FollowingApiPath } from '~/shared/enums/api/api';
import { CONTAINER_TYPES, VideosLiveResponseDto, VideosOfflineResponseDto } from '~/shared/types/types';
import { authenticationMiddleware } from '../middleware';

@controller(ApiPath.FOLLOWING)
export class FollowingController extends BaseHttpController {
  constructor(@inject(CONTAINER_TYPES.FollowingService) private followingService: FollowingService) {
    super();
  }

  // TODO: pagination
  @httpGet(FollowingApiPath.VIDEOS_OFFLINE, authenticationMiddleware)
  public async videosOffline(): Promise<VideosOfflineResponseDto> {
    return { videos: await this.followingService.getOfflineVideos() };
  }

  // TODO: pagination
  @httpGet(FollowingApiPath.VIDEOS_OFFLINE, authenticationMiddleware)
  public async videosLive(): Promise<VideosLiveResponseDto> {
    return { videos: await this.followingService.getOfflineVideos() };
  }
}
