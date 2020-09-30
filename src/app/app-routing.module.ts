import { AssignmentsComponent } from './assignments/assignments.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { TodosComponent } from './todos/todos.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'tasks', component: TodosComponent },
  { path: 'assignments', component: AssignmentsComponent},
  { path: 'inventory', component: InventoryComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
