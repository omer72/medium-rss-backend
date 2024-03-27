import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Observable, firstValueFrom } from 'rxjs';
var convert = require('xml-js');
var validAccounts:Array<string>= [];

export type rssItem = {
  title: {
    _cdata:string
  },
  description: {
    _cdata:string
  },
  link:{
    _text:string
  },
  "dc:creator":{
    _cdate:string
  }
  pubDate:{
    _text:string
  }
}
@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getMediumRss(userId:string):Promise<[rssItem]> {
    try{
      const rssXml = (await axios.get(`https://medium.com/feed/${userId}`)).data;
      if (validAccounts === undefined) {
        validAccounts = [userId];
      } else if (!validAccounts.find(user => user === userId)){
        validAccounts.push(userId); 
      } 
      const result = convert.xml2json(rssXml, {compact: true, spaces: 4});
      const resultJson = JSON.parse(result);
      return resultJson.rss.channel;
    } catch (err){
      console.error(err);
    }
  }

  getValidAccounts(){
    return validAccounts;
  }
}
