import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ITodo } from './todo';
import { TodoList } from './todo-mock-data';

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    public todoList = new BehaviorSubject<ITodo[]>(TodoList);
    private currentView: number;
    private idCountGenerator = 0;

    getTodoListSubject$(): Observable<ITodo[]> {
        return this.todoList.asObservable();
    }

    // getTodos() {
    //     this.todoList.next(TodoList);
    // }

    addTodo(val: string) {
        const convertToCapital = val.charAt(0).toUpperCase() + val.substr(1, val.length);
        const todo: ITodo = {
            id: String(this.idCountGenerator++),
            name: convertToCapital,
            isComplete: false,
            isEditName: false
        };

        TodoList.push(todo);
        this.todoList.next(TodoList);
    }

    editTodo(val: ITodo) {
        console.log('edit');
        console.log(val);
        TodoList.map(item => {
            if (item.id === val.id) {
                item.name = val.name;
                item.isEditName = false;
            }
        });

        this.todoList.next(TodoList);
    }

    updateStatus(id: string, status: boolean) {
        TodoList.map(todo => {
            if (todo.id === id) {
                todo.isComplete = status;
            }
        });

        this.filterTodo(this.currentView);
    }

    completeAll() {
        TodoList.map(todo => {
            todo.isComplete = true;
        });

        this.filterTodo(this.currentView);
    }

    activeAll() {
        TodoList.map(todo => {
            todo.isComplete = false;
        });

        this.filterTodo(this.currentView);
    }

    filterTodo(view: number) {
        this.currentView = view;
        let filteredList: ITodo[] = [];

        switch (this.currentView) {
            case TodoView.COMPLETED:
                filteredList = TodoList.filter(item => item.isComplete === true);
                break;

            case TodoView.ACTIVE:
                filteredList = TodoList.filter(item => item.isComplete !== true);
                break;

            case TodoView.ALL:
                filteredList = TodoList;
                break;
        }

        this.todoList.next(filteredList);
    }

    deleteItem(id: string) {
        TodoList.forEach((item, index) => {
            if (id === item.id) {
                // console.log('ID', item.id);
                TodoList.splice(index, 1);
            }
        });

        this.todoList.next(TodoList);
    }
}

export enum TodoView {
    ACTIVE = 0,
    COMPLETED = 1,
    ALL = 2
}
