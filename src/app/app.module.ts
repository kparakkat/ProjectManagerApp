import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManageuserComponent } from './manageuser/manageuser.component';
import { AdduserComponent } from './manageuser/adduser/adduser.component';
import { ViewuserComponent } from './manageuser/viewuser/viewuser.component';
import { ManageprojectComponent } from './manageproject/manageproject.component';
import { AddprojectComponent } from './manageproject/addproject/addproject.component';
import { ViewprojectComponent } from './manageproject/viewproject/viewproject.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageuserComponent,
    AdduserComponent,
    ViewuserComponent,
    ManageprojectComponent,
    AddprojectComponent,
    ViewprojectComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [ NgbActiveModal ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalComponent
  ]
})
export class AppModule { }
