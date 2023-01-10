import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { animate, trigger, style, transition } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  doneTodos: Todo[] = [];
  todo: Todo;
  arraySize: number;

  constructor(private apiService: ApiService) { 
  }


  ngOnInit() {  
      this.loadUndoneTodos()
      this.loadDoneTodos()
  }
  

  setTodos(localtodos: Todo[]){
    this.arraySize = localtodos.length
  }
  
  addApiTodo(new_todo: Todo){
    this.apiService
    .addTodo(new_todo)
    .subscribe(todo => this.todos.push(todo))

    this.arraySize += 1
  }

  deleteApiTodo(todo: Todo){
    this.apiService
    .deleteTodo(todo)
    .subscribe(
      () => (this.todos) = this.todos.filter((t) => t.id != todo.id))
    
    this.arraySize -= 1
  }

  finishApiTodo(todo: Todo) {
    this.apiService.finishTodo(todo).subscribe(
      (updatedTodo: Todo) => {
        todo.done = updatedTodo.done;
        this.todos = this.todos.filter((t) => t.id !== todo.id)
      }
    )
    this.arraySize -= 1
  }

  loadUndoneTodos(){
    this.apiService
      .getTodos()
      .pipe(
        catchError((err) => {
          console.log(`API error: ${err}`);
          return of([] as Todo[]);
        }),
        map((todos) => todos.filter((todo) => !todo.done))
      )
      .subscribe((todoData) => {
          this.todos = this.todos.concat(todoData);
      });

  }

  loadDoneTodos() {
    this.apiService
      .getTodos()
      .pipe(
        catchError((err) => {
          console.log(`API error: ${err}`);
          return of([] as Todo[]);
        }),
        map((todos) => todos.filter((todo) => todo.done))
      )
      .subscribe((todoData) => {
          this.doneTodos = this.doneTodos.concat(todoData);
          console.log(this.doneTodos);
      });
  }  
}