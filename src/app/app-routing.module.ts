import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageuserComponent } from './manageuser/manageuser.component';

const routes: Routes = [
   {
     path: 'manageuser',
     component: ManageuserComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
