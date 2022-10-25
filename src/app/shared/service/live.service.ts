import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Live } from '../model/live.model';
import { ResponsePageable } from '../model/responsePageable.model';


@Injectable({
  providedIn: 'root'
})
export class LiveService {
  apiUrl = 'http://localhost:8080/lives/';
  httpOptions = {
    headers: new HttpHeaders({
      'Contet-Type' : 'application/json'
    })
  };

  constructor(
      private httpClient: HttpClient
  ) {}
    public getLives(): Observable<ResponsePageable> {
      return this.httpClient.get<ResponsePageable>(this.apiUrl);
  }

    public postLives(live: any): Observable<Live>{
    return this.httpClient.post<any>(this.apiUrl, live, this.httpOptions); 
    }
  
    public getLivesWithFlag(flag: string): Observable<ResponsePageable> {
      return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag);
  }

    public deleteLives(id: string):Observable<unknown>{
      const url = this.apiUrl+id;
      console.log(url);
      return this.httpClient.delete(url, this.httpOptions).pipe();
    }

}
