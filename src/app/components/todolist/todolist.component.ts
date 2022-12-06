import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { animate, trigger, style, transition } from '@angular/animations';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  public title: String = 'Todo List';
  todos: Todo[] = [];
  todo: Todo;

  constructor(private apiService: ApiService) { 


  }


  ngOnInit() {
    this.apiService
    .getTodos()
    .subscribe((todoData) => {
      this.todos = todoData['todos']
    })
    
  }

  deleteApiTodo(todo: Todo){
    this.apiService
    .deleteTodo(todo)
    .subscribe(
      () => (this.todos) = this.todos.filter((t) => t.id != todo.id))
    

  }


  addApiTodo(new_todo: Todo){
    this.apiService
    .addTodo(new_todo)
    .subscribe(todo => this.todos.push(todo))

  }
}
