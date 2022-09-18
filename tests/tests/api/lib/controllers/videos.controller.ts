import { ApiRequest } from '../request';
import { CONFIG } from '../../../config/config';

let baseUrl: string = CONFIG.BASE_URL;

export class VideosController {
  async getAllVideos() {
    const response = await new ApiRequest().prefixUrl(baseUrl).method('GET').url('videos').send();
    return response;
  }
}
