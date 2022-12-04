import { HttpClient, HttpRequest, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  api_server_url: string = "http://127.0.0.1:8000/";
  
  constructor(private http: HttpClient) { 

  }

  public getTodos(): Observable<Todo>{
     return this.http.get<Todo>(this.api_server_url)

  }

  public deleteTodo(todo:Todo): Observable<Todo>{
    const url_todo = `${this.api_server_url}todo/${todo.id}`
    return this.http.delete<Todo>(url_todo)
  }

}
