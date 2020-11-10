import { IUser } from './user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersList } from './users-mock-data';
import { convertToCapital } from '../utilities/utils';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private userSubject$ = new BehaviorSubject<IUser[]>(UsersList);
    private idGenerator = 0;

    // public userList$ = this.userSubject$.asObservable();

    getUserListSubject$(): Observable<IUser[]> {
        return this.userSubject$.asObservable();
    }

    addItem(val: any) {
        const capitalizeFname = convertToCapital(val.firstname);
        const capitalizeLname = convertToCapital(val.lastname);

        const userObj: IUser = {
            id: String(this.idGenerator++),
            firstname: capitalizeFname,
            lastname: capitalizeLname,
            hasTask: false
        };

        UsersList.push(userObj);
        this.userSubject$.next(UsersList);
    }

    deleteItem(val: IUser) {
        UsersList.forEach((item, index) => {
            if (item.id === val.id) {
                UsersList.splice(index, 1);
            }
        });
    }
}