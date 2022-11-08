import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { animate, trigger, style, transition } from '@angular/animations';


@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  public title: String = 'Todo List';
  public todos: Todo[] = [];
  public doneTodos: Todo[] = [];
  public form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.required
      ])],
      category: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.required
      ])],
    });
  }

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


    this.todos.push(new Todo(id, title, category, done))
    this.savingOnLocal()
    this.erasePreviousData()
    
  }

  removeTask(todo: Todo): void {
    const taskIndex = this.todos.indexOf(todo)
    if(taskIndex != -1){
      this.todos.splice(taskIndex, 1)
      const localData = JSON.parse(localStorage.getItem("todos"))
      localData.splice(taskIndex,1)
      
      const attData = JSON.stringify(localData)
      localStorage.setItem("todos", attData)

    } 
  
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

  savingOnLocal(){
    const localData = JSON.stringify(this.todos)
    localStorage.setItem("todos", localData)
  }

  loadPreviousTasks(){
    const data = localStorage.getItem("todos")
    if(data){
      this.todos = JSON.parse(data)
    } else {
      this.todos = []
    }
    
  }

  ngOnInit(): void {
    this.loadPreviousTasks()
  
  }

}
