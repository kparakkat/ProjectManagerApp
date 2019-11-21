import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Shared/user';
import { UserService } from 'src/app/Shared/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  model = new User();
  saveStatus: any;
  constructor(public userservice:UserService) { }
  submitted = false;

  ngOnInit() {
  }

  onSubmit() {
    this.userservice.addUser(this.model).subscribe(data => {this.saveStatus = data.response;});
    this.submitted = true; 
    let model = new User();
    // this.resetUser();
  }

  resetUser(): void{
    let model = new User();
  }

}
