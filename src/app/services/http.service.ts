import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient : HttpClient) { }

  private token : string;

  public get(reqUrl:string,headers? : HttpHeaders): Observable<any>{
    return this.httpClient.get(env.apiBaseUrl+reqUrl);
  }

  public post(reqUrl:string,body:any,headers? : HttpHeaders): Observable<any> {
    return this.httpClient.post(env.apiBaseUrl+reqUrl,body,{headers});
  }

  public fetchToken(){
    let httpHeaders = new HttpHeaders({Accept : 'application/json'});
    this.httpClient.post(env.apiBaseUrl+'/token','',{headers : httpHeaders})
    .subscribe(val =>{
      this.token = val['token'];
      console.log(val);
    },error =>{
      console.log(error)
    });
  }

  public getTokenValue():string{
    return this.token;
  }
}
