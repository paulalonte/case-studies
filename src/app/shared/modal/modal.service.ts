import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ModalService {
    public modalSubject$ = new Subject<boolean>();
    public primaryClick$ = new Subject<boolean>();
    public modalHeading$ = new Subject<string>();

    getModalHeading$(): Observable<string> {
        return this.modalHeading$.asObservable();
    }

    getPrimaryClick$(): Observable<boolean> {
        return this.primaryClick$.asObservable();
    }

    getModalSubject$(): Observable<boolean> {
        return this.modalSubject$.asObservable();
    }

    showModal(): void {
        this.modalSubject$.next(true);
    }

    hideModal(): void {
        this.modalSubject$.next(false);
    }
}