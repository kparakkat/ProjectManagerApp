import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { ManageprojectComponent } from './manageproject/manageproject.component';

const routes: Routes = [
   {
     path: 'manageuser',
     component: ManageuserComponent
   },
   {
    path: 'manageproject',
    component: ManageprojectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
