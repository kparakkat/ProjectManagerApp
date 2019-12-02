import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { ManageprojectComponent } from './manageproject/manageproject.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';

const routes: Routes = [
   {
     path: 'manageuser',
     component: ManageuserComponent
   },
   {
    path: 'manageproject',
    component: ManageprojectComponent
   },
   {
    path: 'addtask',
    component: AddtaskComponent
   },
   {
   path: 'viewtask',
   component: ViewtaskComponent
   },
   {
    path: 'editTask/:taskid',
    component: AddtaskComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
