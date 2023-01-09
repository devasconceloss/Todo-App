import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { animate, trigger, style, transition } from '@angular/animations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  todo: Todo;
  arraySize: number;

  constructor(private apiService: ApiService) { 
  }


  ngOnInit() {
    this.apiService
    .getTodos()
    .subscribe((todoData) => {
      this.todos = this.todos.concat(todoData);
      this.setTodos(this.todos)
      });

  }
  

  setTodos(localtodos: Todo[]){
    this.arraySize = localtodos.length
  }

  deleteApiTodo(todo: Todo){
    this.apiService
    .deleteTodo(todo)
    .subscribe(
      () => (this.todos) = this.todos.filter((t) => t.id != todo.id))
    
    this.arraySize -= 1
  }

  addApiTodo(new_todo: Todo){
    this.apiService
    .addTodo(new_todo)
    .subscribe(todo => this.todos.push(todo))

    this.arraySize += 1
  }

  finishApiTodo(todo: Todo) {
    this.apiService.finishTodo(todo).subscribe(
      (updatedTodo: Todo) => todo.done = updatedTodo.done)
  }
  


  showAllTodos(){
    this.todos = [...this.todos]
  }

  showDoneTodos(){
    this.todos = this.todos.filter((todo) => todo.done === true)
  }

  showUndoneTodos(){
    this.todos = this.todos.filter((todo) => todo.done === false)

  }

}