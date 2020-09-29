import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from '../shared/modal/modal.service';
import { ITodo } from './todo';
import { TodoService, TodoView } from './todo.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit, OnDestroy {

  public pageHeader = 'Tasks List';
  public todoList: ITodo[] = [];
  public todoModel: string;
  public filterValue: number;
  public resultMessage: string;
  public checkAllText = 'Check All';
  public editButtonLabel = 'Edit';
  public currentEditItem: ITodo;

  private isEditMode = false;
  private todoSubscription: Subscription;
  private modalSubscription: Subscription;
  private toDeleteItem: ITodo;
  private isCheckAll = false;
  private currentEditedName: string;

  constructor(private todoService: TodoService,
              private modalService: ModalService,
              ) { }

  ngOnInit() {
    this.todoSubscription = this.todoService.getTodoListSubject$().subscribe(data => {
      this.todoList = data;
      this.setResultMessage();
      console.log(this.todoList);
    });

    this.todoService.filterTodo(TodoView.ALL);

    this.modalSubscription = this.modalService.getPrimaryClick$().subscribe(data => {
      if (data === true) {
        this.todoService.deleteItem(this.toDeleteItem.id);
        this.modalService.hideModal();
      }
    });
  }

  setResultMessage() {
    if (!this.todoList.length) {
      if (this.filterValue === TodoView.COMPLETED) {
        this.resultMessage = 'No Completed Tasks Yet.';
      }

      if (this.filterValue === TodoView.ACTIVE) {
        this.resultMessage = 'No Active Tasks.';
      }

      if (this.filterValue === TodoView.ALL) {
        this.resultMessage = 'No Todos List Yet.';
      }
    }
  }

  disableSelect() {
    let isDisable: boolean;

    if (this.todoList.length) {
      isDisable = false;
    } else {
      isDisable = true;

      if (this.filterValue === TodoView.ACTIVE || this.filterValue === TodoView.COMPLETED) {
        isDisable = false;
      }
    }

    return isDisable;
    // !todoList.length && filterValue != 1
  }

  onAddTodoItem(): void {
    this.todoService.addTodo(this.todoModel);
    this.todoModel = '';
  }

  onCheckChange(event: any): void {
    const status = event.checked;
    this.todoService.updateStatus(event.id, status);
  }

  onFilterChange(event: any) {
    this.filterValue = +event;
    this.todoService.filterTodo(+event);
  }

  onDeleteTodo(todo: ITodo) {
    this.toDeleteItem = todo;
    this.modalService.modalHeading$.next(`Are you sure you want to delete this item ${this.toDeleteItem.name} ?`);
    this.modalService.showModal();
  }

  onEditTodo(todo: ITodo) {
    this.currentEditItem = todo;

    console.log('edit');

    if (!this.isEditMode) {
      this.todoList.map(item => {
        if (item.id === this.currentEditItem.id) {
          item.isEditName = true;
        }
      });
    } else {
      this.currentEditItem.name = this.currentEditedName;
      this.todoService.editTodo(this.currentEditItem);
      // console.log("SUBMIT NA", todo.name);
    }

    this.isEditMode = !this.isEditMode;
  }

  onInputTodoChange(val: string): void {
    console.log('on change', val);
    this.currentEditedName = val;
  }

  isEditView(): boolean {
    if (this.currentEditItem)  {
      return false;
    } else {
      return true;
    }
  }

  onCheckAllTodos(): void {
    console.log('check all');
    if (!this.isCheckAll) {
      this.todoService.completeAll();
      this.checkAllText = 'Uncheck All';
    } else {
      this.todoService.activeAll();
      this.checkAllText = 'Check All';
    }

    this.isCheckAll = !this.isCheckAll;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
    // console.log(this.movies);
  }

  ngOnDestroy(): void {
    this.todoSubscription.unsubscribe();
    this.modalSubscription.unsubscribe();
  }
}

