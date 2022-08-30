import { inject } from 'inversify';
import { BaseHttpController, controller, httpGet, request } from 'inversify-express-utils';
import { FollowingService } from '~/core/following/application/following-service';
import { ApiPath, FollowingApiPath } from '~/shared/enums/api/api';
import {
  CONTAINER_TYPES,
  ExtendedAuthenticatedRequest,
  VideosLiveResponseDto,
  VideosOfflineResponseDto,
} from '~/shared/types/types';
import { authenticationMiddleware } from '../middleware';

@controller(ApiPath.FOLLOWING)
export class FollowingController extends BaseHttpController {
  constructor(@inject(CONTAINER_TYPES.FollowingService) private followingService: FollowingService) {
    super();
  }

  // TODO: pagination
  @httpGet(FollowingApiPath.VIDEOS_OFFLINE, authenticationMiddleware)
  public async videosOffline(@request() req: ExtendedAuthenticatedRequest): Promise<VideosOfflineResponseDto> {
    return { videos: await this.followingService.getOfflineVideos(req.user.id) };
  }

  // TODO: pagination
  @httpGet(FollowingApiPath.VIDEOS_LIVE, authenticationMiddleware)
  public async videosLive(@request() req: ExtendedAuthenticatedRequest): Promise<VideosLiveResponseDto> {
    return { videos: await this.followingService.getLiveideos(req.user.id) };
  }
}
