import { ApiRequest } from '../request';

let baseUrl: string = global.appConfig.baseUrl;

export class VideosController {
  async getAllVideos() {
    const response = await new ApiRequest().prefixUrl(baseUrl).method('GET').url('videos').send();
    return response;
  }
}
