/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { appConfig } from '../../config/dev.config';
import { ApiRequest } from '../request';

const { baseUrl } = appConfig;

export class VideosController {
  async getAllVideos() {
    const response = await new ApiRequest().prefixUrl(baseUrl).method('GET').url('videos').send();
    return response;
  }
}
