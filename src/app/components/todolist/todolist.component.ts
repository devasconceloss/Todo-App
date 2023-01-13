import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { ApiService } from '../../services/api.service';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  todos: Todo[] = [];
  undoneTodos: Todo[] = [];
  doneTodos: Todo[] = [];
  todo: Todo;
  arraySize: number;
  currentView: "done" | "undone" = 'undone';

  constructor(private apiService: ApiService) { 
  }


  ngOnInit() {  
      this.loadUndoneTodos()
      this.loadDoneTodos()
      this.setView('undone')
  }
  

  catchArraySIze(localtodos: Todo[]){
    this.arraySize = localtodos.length
  }
  
  addApiTodo(new_todo: Todo){
    this.apiService
    .addTodo(new_todo).pipe(
      catchError((err) => {
        console.log(err)
        return of(new_todo)
      })
    )
    .subscribe(
      (todo) => {
        this.todos = JSON.parse(localStorage.getItem('undone todos'))
        this.todos.push(todo)
        localStorage.setItem('undone todos', JSON.stringify(this.todos))

      }
    
    )

    this.arraySize += 1
  }

  deleteApiTodo(todo: Todo){
    this.apiService
    .deleteTodo(todo).pipe(
      catchError((err) => {
        console.log(`API error ${err}`)
        return of(todo)
      })
    )
    .subscribe(
      () => (this.todos) = this.todos.filter((t) => t.id != todo.id,
      this.removeTodo(todo, this.currentView, "delete"))
      )
    
    this.arraySize -= 1
  }

  finishApiTodo(todo: Todo) {
    const updatedTodo = {...todo, done: true}
    this.apiService
    .finishTodo(updatedTodo).pipe(
      catchError((err) => {
        console.log(`API error ${err}`)
        return of(todo)
      })
    )
    .subscribe(
      () => {
        todo.done = updatedTodo.done
        this.todos = this.todos.filter((t) => t.id !== todo.id,
        this.removeTodo(todo, this.currentView, "finish"))

      }
    );
    this.arraySize -= 1;
  }
  
  reopenApiTodo(todo: Todo){
    const updatedTodo = {...todo, done: false}
    this.apiService
    .finishTodo(updatedTodo).pipe(
      catchError((err) => {
        console.log(`API error ${err}`)
        return of(todo)
      })
    )
    .subscribe(
      () => {
        todo.done = updatedTodo.done
        this.todos = this.todos.filter((t) => t.id !== todo.id,
        this.removeTodo(todo, this.currentView, "open"))

      }
    );
    this.arraySize -= 1;
  }

  removeTodo(todo: Todo, view: "done" | "undone", flag: "delete" | "finish" | "open"): void {
    const todoIndex = this.todos.indexOf(todo)

    if(todoIndex != -1){

      let localData = JSON.parse(localStorage.getItem(`${view} todos`))
      localData.splice(todoIndex,1)
      const attData = JSON.stringify(localData)
      localStorage.setItem(`${view} todos`, attData)
      
      if(flag == "finish"){
        let doneTodos = JSON.parse(localStorage.getItem('done todos'))
        doneTodos.push(todo)
        localStorage.setItem('done todos', JSON.stringify(doneTodos))

      } if(flag == "open"){
          let undoneTodos = JSON.parse(localStorage.getItem('undone todos'))
          undoneTodos.push(todo)
          localStorage.setItem('undone todos', JSON.stringify(undoneTodos))
      }
    } 

  }


  loadUndoneTodos(){
    this.apiService
      .getTodos()
      .pipe(
        catchError((err) => {
          console.log(`API error: ${err}`);
          localStorage.setItem('undone todos', JSON.stringify([]))
          return of([] as Todo[])
        }),
        map((todos) => todos.filter((todo) => !todo.done))
      )
      .subscribe((todoData) => {
        localStorage.setItem('undone todos', JSON.stringify(todoData))

      });

  }

  loadDoneTodos() {
    this.apiService
      .getTodos()
      .pipe(
        catchError((err) => {
          console.log(`API error: ${err}`);
          localStorage.setItem('done todos', JSON.stringify([]))
          return of([] as Todo[])
        }),
        map((todos) => todos.filter((todo) => todo.done))
      )
      .subscribe((todoData) => {
          localStorage.setItem('done todos', JSON.stringify(todoData))
      });
  }  

  setView(view: "done" | "undone" = "undone"){
    this.currentView = view
    if(view == 'done'){
      this.doneTodos = JSON.parse(localStorage.getItem('done todos'))
      this.todos = this.doneTodos
      this.catchArraySIze(this.todos)
    }
    if(view == 'undone') {
      this.undoneTodos = JSON.parse(localStorage.getItem('undone todos'))
      this.todos = this.undoneTodos
      this.catchArraySIze(this.todos)
    }
  }

}