import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  public isShowModal = false;
  public modalHeading: string;

  private modalSubscription: Subscription;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalSubscription = this.modalService.getModalSubject$().subscribe(data => this.isShowModal = data);
    this.modalService.getModalHeading$().subscribe(heading => this.modalHeading = heading);
  }

  onYesClick(): void {
    this.modalService.primaryClick$.next(true);
  }

  onCancelClick(): void {
    this.modalService.hideModal();
  }

  ngOnDestroy(): void {
    this.modalSubscription.unsubscribe();
  }

}
