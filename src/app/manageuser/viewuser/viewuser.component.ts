import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Shared/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/Shared/user';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  constructor(public userservice:UserService, private router:Router) { }
  users: User[];
  filteredUsers: User[];
  errorMessage: string;
  _searchText: string;

  get searchText(): string{
    return this._searchText;
  }
  set searchText(value:string){
      this._searchText = value;
      this.filteredUsers = this.searchText ? this.performFilter(this.searchText) : this.users;
  }

  performFilter(searchBy: string): User[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.users.filter((user: User) => ( user.firstname.toLocaleLowerCase().indexOf(searchBy) !== -1
              || user.lastname.toLocaleLowerCase().indexOf(searchBy) !== -1 
              || user.employeeid.toString().toLocaleLowerCase().indexOf(searchBy) !== -1));
  }

  sort(sortBy: string): void {
    if (sortBy == 'FirstName')
      this.filteredUsers = this.users.sort( (a,b) => a.firstname < b.firstname ? -1 : a.firstname > b.firstname ? 1: 0);
    else if (sortBy == 'LastName')
      this.filteredUsers = this.users.sort( (a,b) => a.lastname < b.lastname ? -1 : a.lastname > b.lastname ? 1: 0);
    else if (sortBy == 'Id')
    this.filteredUsers = this.users.sort( (a,b) => a.employeeid < b.employeeid ? -1 : a.employeeid > b.employeeid ? 1: 0);
  }

  ngOnInit() : void {
    this.userservice.getAllUsers().subscribe( 
      users => {
          this.users = users;
          this.filteredUsers = this.users;
      },
      error => this.errorMessage = <any> error
    );
  }

}
