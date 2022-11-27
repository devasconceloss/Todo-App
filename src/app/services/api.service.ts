import { HttpClient, HttpRequest, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   api_server_url: string = "http://127.0.0.1:8000";
  
  constructor(private http: HttpClient) { 

  }

  public getTodos(){
    return this.http.get(`${this.api_server_url}`)
  }

}
