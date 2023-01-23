import { Injectable } from '@angular/core';
import { InstagramApiService } from '../shared/services/instagram-api.service';
import { ResponseInstagramApi } from '../shared/types/response-api-instagram.type';
import { Register } from './register.type';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends InstagramApiService {

  register(registerData: Register): Promise<ResponseInstagramApi> {
    return this.post('cadastro', registerData)
  }
}
