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

  constructor(private apiService: ApiService) { 


  }

/*
  addTask(){
    const id = this.todos.length + 1
    const title = this.form.controls['title'].value
    let category = this.form.controls['category'].value
    const done = false

    switch(category){
      case "Work":
        category = "👜"
        break;
      case "Health":
        category = "💓"
        break;
      case "Fun":
        category = "😛"
        break;
      case "Other":
        category = "➕"
        break;
    }



    this.savingOnLocal("todos")
    this.erasePreviousData()
    
  }

  removeTask(todo: Todo): void {
    const taskIndex = this.todos.indexOf(todo)
    if(taskIndex != -1){
      this.todos.splice(taskIndex, 1)
      const localData = JSON.parse(localStorage.getItem("todos"))
      localData.splice(taskIndex,1)
      
      
      this.attData(localData)

    } 
  
  }

  attData(data: any){
    const attData = JSON.stringify(data)
    localStorage.setItem("todos", attData)
  }

  finishTask(todo: Todo){
    todo.done = true

  }

  reopenTask(todo: Todo){
    todo.done = false
  }

  erasePreviousData(){
    this.form.reset()
  }

  savingOnLocal(data: string){
    const localData = JSON.stringify(this.todos)
    localStorage.setItem(data, localData)
  }

  loadPreviousTasks(){
    const data = localStorage.getItem("todos")
    if(data){
      this.todos = JSON.parse(data)
    } else {
      this.todos = []
    }
   */ 
  

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

}
