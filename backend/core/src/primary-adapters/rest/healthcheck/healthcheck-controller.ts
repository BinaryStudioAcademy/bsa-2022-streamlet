import { BaseHttpController, controller, httpGet } from 'inversify-express-utils';
import { OkNegotiatedContentResult } from 'inversify-express-utils/lib/results';

@controller('/healthcheck')
export class HealthcheckController extends BaseHttpController {
  @httpGet('/')
  public async healthcheck(): Promise<OkNegotiatedContentResult<string>> {
    return this.ok('healthy');
  }
}
