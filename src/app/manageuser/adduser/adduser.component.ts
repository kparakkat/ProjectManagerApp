import { Component, OnInit } from '@angular/core';
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
  constructor(public userservice:UserService, private router:Router) { }
  submitted = false;
  newUser = true;

  ngOnInit() {
  }

  onSubmit() {
    this.userservice.addUser(this.model).subscribe(data => {this.saveStatus = data.response;});
    this.submitted = true; 
    this.model = new User();
    this.newUser = true;
    // this.resetUser();
    // this.router.navigate([`/manageuser`]);
  }

  resetUser(): void{
    this.model = new User();
    this.newUser = true;
    this.saveStatus = "";
  }

  setChange(): void{
    this.newUser = false;
    this.saveStatus = "";
  }

}
