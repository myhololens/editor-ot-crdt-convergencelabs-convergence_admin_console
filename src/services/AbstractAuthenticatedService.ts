import {authStore} from '../stores/AuthStore';
import {AbstractService} from './AbstractService';
import {Response, SuperAgentRequest} from "superagent";

export abstract class AbstractAuthenticatedService extends AbstractService {

  protected _processResponse(httpResponse: Response) {
    if (httpResponse.status === 401) {
      authStore.logout();
    }
    return super._processResponse(httpResponse);
  };

  protected _preProcessRequest = (req: SuperAgentRequest) => {
    super._preProcessRequest(req);
    if (authStore.authToken) {
      req.set('authorization', `SessionToken ${authStore.authToken}`);
    }
  };
}