import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, firstValueFrom } from 'rxjs';


@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getHello(): Promise<Observable<AxiosResponse<any, any>>> {
    const { data } = await firstValueFrom(    
      this.httpService.get('https://medium.com/feed/the-atlantic'));
    return data
  }
}
