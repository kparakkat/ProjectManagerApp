import { Component, OnInit, ViewChild } from '@angular/core';
import { AddprojectComponent } from './addproject/addproject.component';
import { ViewprojectComponent } from './viewproject/viewproject.component';

@Component({
  selector: 'app-manageproject',
  templateUrl: './manageproject.component.html',
  styleUrls: ['./manageproject.component.css']
})
export class ManageprojectComponent implements OnInit {

  @ViewChild('addProject') manageUser: AddprojectComponent;
  @ViewChild('viewProject') viewUser: ViewprojectComponent;
  constructor() { }

  ngOnInit() {
  }

  onEditProject(userId: string) : void {
    this.manageUser.editProject(userId);
  }

  onSavedProject(message: string) : void {
    this.viewUser.getAllProjects();
  }
}
