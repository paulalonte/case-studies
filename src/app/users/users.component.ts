import { UserService } from './users.service';
import { ModalService } from './../shared/modal/modal.service';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from './user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  public pageHeader = 'Users List';
  public userModel: string;
  public isAddUser = false;
  public formGroup: FormGroup;
  public userInputFname: ElementRef;

  private toDeleteItem: IUser;
  private modalSubscription: Subscription;

  public usersList: IUser[] = [];

  @ViewChild('firstNameInput', { static: false } ) firstNameInput: ElementRef;

  constructor(private fb: FormBuilder, private modalService: ModalService, private userService: UserService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });

    this.modalSubscription = this.modalService.getPrimaryClick$().subscribe(data => {
      if (data === true) {
        this.userService.deleteItem(this.toDeleteItem);
        this.modalService.hideModal();
      }
    });

    this.userService.getUserListSubject$().subscribe(data => {
      this.usersList = data;
    });
  }

  onFormSubmit(): void {

    const obj = { firstname: this.formGroup.value.firstname, lastname: this.formGroup.value.lastname };
    this.userService.addItem(obj);

    this.formGroup.reset();
    this.isAddUser = false;
  }

  onAddUser(): void {
    this.isAddUser = true;
    setTimeout(() => {
      this.userInputFname = this.firstNameInput;
      this.userInputFname.nativeElement.focus();
    }, 0);
  }

  onDeleteUser(event: IUser): void {
    this.toDeleteItem = event;
    this.modalService.modalHeading$.next(`Are you sure you want to delete this item ${this.toDeleteItem.firstname} ?`);
    this.modalService.showModal();
  }

  onCancelForm(): void {
    this.isAddUser = false;
  }

  onFilterChange(index: number): void {
    console.log(index);
  }

  disableSelect(): boolean {
    let isDisable: boolean;

    if (this.usersList.length) {
      isDisable = false;
    } else {
      isDisable = true;

      // if (this.filterValue === TodoView.ACTIVE || this.filterValue === TodoView.COMPLETED) {
      //   isDisable = false;
      // }
    }

    return isDisable;
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

}
