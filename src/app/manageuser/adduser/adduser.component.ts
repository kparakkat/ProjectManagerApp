import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/Shared/user';
import { UserService } from 'src/app/Shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  model = new User();
  saveStatus: any;
  submitted = false;
  disableValidation = true;
  actionName = "Add";
  @Output() savedUser = new EventEmitter(); 

  constructor(public userservice:UserService, private router:Router) { }
  ngOnInit() {
  }

  onSubmit() {
    
    if (this.actionName == "Add")
      this.userservice.addUser(this.model).subscribe(data => {this.saveStatus = data.response;this.savedUser.emit('Saved');});
    else
      this.userservice.editUser(this.model).subscribe(data => {this.saveStatus = data.response; this.savedUser.emit('Saved');});

    this.submitted = true; 
    this.model = new User();
    this.disableValidation = true;
    this.actionName = "Add"
  }

  resetUser(): void{
    this.model = new User();
    this.disableValidation = true;
    this.saveStatus = "";
  }

  setChange(): void{
    this.disableValidation = false;
    this.saveStatus = "";
  }

  public editUser(userId: string) : void
  {
    this.saveStatus = "";
    this.actionName = "Edit";
    this.userservice.getUserById(Number(userId)).subscribe(data => {this.model = data;});
  }
}
