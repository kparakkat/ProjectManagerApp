import { Component, OnInit, ViewChild } from '@angular/core';
import { AdduserComponent } from './adduser/adduser.component';
import { ViewuserComponent } from './viewuser/viewuser.component';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {

  @ViewChild('addUser') manageUser: AdduserComponent;
  @ViewChild('viewUser') viewUser: ViewuserComponent;
  constructor() { }

  ngOnInit() {
  }

  onEditUser(userId: string) : void {
    this.manageUser.editUser(userId);
  }

  onSavedUser(message: string) : void {
    this.viewUser.getAllUsers();
  }
}
