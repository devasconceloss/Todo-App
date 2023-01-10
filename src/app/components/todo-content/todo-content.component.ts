import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Todo } from 'src/models/todo.model';


@Component({
  selector: 'app-todo-content',
  templateUrl: './todo-content.component.html',
  styleUrls: ['./todo-content.component.css']
})
export class TodoContentComponent implements OnInit {
  @Input() todo: Todo;
  @Input() class: string;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter
  @Output() finishTodo: EventEmitter<Todo> = new EventEmitter
  todos: Todo[] = [];
  faCheck = faCheck;
  faTimes = faTimes;

  constructor() { }

  ngOnInit() {
    
    }


  deletingTodo(todo: Todo){
    this.deleteTodo.emit(todo)
  }


  finishingTodo(todo: Todo){
    this.finishTodo.emit(todo)
  }


  filteringCategories(category: String) {
    switch(category) {
      case "Work":
        return '#011526'
      case "Health":
        return '#012E40'
      case "Fun":
        return '#025959'
      case "Personal":
        return '#02735E'
      default:
        return {};
    }
  }
}