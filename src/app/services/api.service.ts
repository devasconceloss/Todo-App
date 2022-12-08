import { HttpClient, HttpRequest, JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  api_server_url: string = "http://127.0.0.1:8000/";
  url_todo: string;
  
  constructor(private http: HttpClient) { 

  }

  public getTodos(): Observable<Todo>{
     return this.http.get<Todo>(this.api_server_url)

  }

  public deleteTodo(todo:Todo): Observable<Todo>{
    this.url_todo = `${this.api_server_url}todo/${todo.id}`
    return this.http.delete<Todo>(this.url_todo)
  }

  public addTodo(new_todo: Todo): Observable<Todo>{
    this.url_todo = `${this.api_server_url}todo/`
    return this.http.post<Todo>(this.url_todo, new_todo)
  }

  public finishTodo(todo: Todo): Observable<Todo>{
    this.url_todo = `${this.api_server_url}todo/${todo.id}`
    return this.http.put<Todo>(this.url_todo, todo)
  }
}
