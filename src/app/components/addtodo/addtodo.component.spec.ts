import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddtodoComponent } from './addtodo.component';
import { HttpClientModule } from '@angular/common/http';
import { Todo } from 'src/models/todo.model';
import { ApiService } from 'src/app/services/api.service';

describe('AddtodoComponent', () => {
  let component: AddtodoComponent;
  let fixture: ComponentFixture<AddtodoComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule ],
      declarations: [ AddtodoComponent ]
    })
    .compileComponents();

    apiService = TestBed.inject(ApiService)

    fixture = TestBed.createComponent(AddtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when select category or input title is empyt', () => {
    expect(component.form.invalid).toBeTrue()
  })

  it('title field validity', () => {
    const title = component.form.controls['title'];
    expect(title.valid).toBeFalsy();

    let errors = {};
    errors = title.errors || {};
    expect(errors['required']).toBeTruthy();

    title.setValue("Test");
    errors = title.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(title.valid).toBeTruthy();
  });

  it('category field validity', () => {
    const category = component.form.controls['category'];
    expect(category.valid).toBeFalsy();

    let errors = {};
    errors = category.errors || {};
    expect(errors['required']).toBeTruthy();

    category.setValue("Test");
    errors = category.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(category.valid).toBeTruthy();
  });

  it('should add a new todo, emit this event and clear the form values after the proccess', async () => {
    const spy = spyOn(component.newTodo, 'emit');
    spyOn(apiService, 'getHighestId').and.returnValue(Promise.resolve(1));
  
    component.form.controls['title'].setValue('Test Title');
    component.form.controls['category'].setValue('Test Category');
  
    await component.addNewTodo();
  
    expect(spy).toHaveBeenCalledWith(new Todo(1, 'Test Title', 'Test Category', false));
    expect(component.form.controls['title'].value).toEqual(null);
    expect(component.form.controls['category'].value).toEqual(null);
    expect(component.id).toEqual(2);
  });
  

  

  it('should call api service on ngOnInit', async () => {
    spyOn(apiService, 'getHighestId').and.returnValue(Promise.resolve(1))
    await component.ngOnInit()
    expect(apiService.getHighestId).toHaveBeenCalled()
    expect(component.response).toEqual(1)
});


});
