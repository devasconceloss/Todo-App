import { HttpClient, HttpRequest, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { 
    const api_server_url = "http://127.0.0.1:8000";

    this.http.get(api_server_url, {responseType: 'text'}).subscribe((response) => {
      alert(JSON.stringify(response))
    })
  }


}
