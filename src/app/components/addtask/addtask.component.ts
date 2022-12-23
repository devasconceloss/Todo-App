import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Todo } from 'src/models/todo.model';


@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  public title: String = 'Todo App';
  public todos: Todo[] = [];
  public form: FormGroup;
  public new_todo: Todo;

  public id: number;
  public title_todo: string;
  public category: string;
  @Output() newTodo: EventEmitter<Todo> = new EventEmitter;
  color: string


  constructor(private fb:FormBuilder, private apiService: ApiService) { 

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
  
  addNewTodo(){
    
    let title_todo = this.form.controls['title'].value
    let category = this.form.controls['category'].value
    let done:boolean = false

    this.filteringCategories(category)
    
    this.new_todo = new Todo(this.id, title_todo, category, done)
    this.id++

    this.newTodo.emit(this.new_todo)
  }

  filteringCategories(category: string): string {
    switch(category) {
      case "Work":
        return this.color = 'work-color'
        
      case "Health":
        return this.color = 'health-color'

      case "Fun":
        return this.color = 'fun-color'
      
      case "Other":
        return this.color = 'other-color'
          
      default:
        return 'default-color';
    }
  }
  


  async ngOnInit() {
    const response = await this.apiService.getHighestId();
    this.id = response + 1;
  }
  
  
}