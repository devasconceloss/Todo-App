import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
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
  @Output() reopenTodo: EventEmitter<Todo> = new EventEmitter
  todos: Todo[] = [];

  faCheck = faCheck;
  faTimes = faTimes;
  faArrow = faArrowAltCircleLeft

  constructor() { }

  ngOnInit() {
    
    }


  deletingTodo(todo: Todo){
    this.deleteTodo.emit(todo)
  }


  finishingTodo(todo: Todo){
    this.finishTodo.emit(todo)
  }

  reopeningTodo(todo: Todo){
    this.reopenTodo.emit(todo)
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