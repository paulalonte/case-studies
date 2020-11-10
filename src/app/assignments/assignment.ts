import { IUser } from './../users/user';
import { ITodo } from './../todos/todo';

export interface IAssignment {
    id: string;
    task: ITodo;
    user: IUser;
    isComplete: boolean;
}