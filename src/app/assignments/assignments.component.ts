import { UserService } from './../users/users.service';
import { TodoService } from './../todos/todo.service';
import { Component, OnInit } from '@angular/core';
import { ITodo } from '../todos/todo';
import { IUser } from '../users/user';
import { IAssignment } from './assignment';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  public pageHeader = 'Assignments Page';

  public todoList: ITodo[] = [];
  public userList: IUser[] = [];
  public assignmentList: IAssignment[] = [];

  public selectedTodoModel: ITodo;
  public selectedUserModel: IUser;

  constructor(private todoService: TodoService, private userService: UserService) { }

  ngOnInit() {
    this.todoService.getTodoListSubject$().subscribe(data => {
      this.todoList = data;
      this.selectedTodoModel = data[0];
    });

    this.userService.getUserListSubject$().subscribe(data => {
      this.userList = data;
      this.selectedUserModel = data[0];
    });
  }

  onTodoChange(val: ITodo): void {
    this.selectedTodoModel = val;
  }

  onUserChange(val: IUser): void {
    this.selectedUserModel = val;
  }

  onSubmitAssignment(): void {
     // object
    // task
    // user
    // isCompleted
    this.selectedUserModel.hasTask = true;
    const objAssignment: IAssignment = {
      id: '1',
      task: this.selectedTodoModel,
      user: this.selectedUserModel,
      isComplete: false
    };

    this.assignmentList.push(objAssignment);
    console.log(objAssignment);
  }

  onDeleteAssignment(): void {
    console.log('delete assignment');
  }

}
