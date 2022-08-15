import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { StorageService } from './storage/local-storage.service';

const storageService = new StorageService();

export { Http, AuthApi, storageService };
