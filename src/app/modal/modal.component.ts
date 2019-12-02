import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Searchdata } from '../Shared/searchdata';
import { UserService } from '../Shared/user.service';
import { ProjectService } from '../Shared/project.service';
import { ParenttaskService } from '../Shared/parenttask.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  // Added for search
  searchDataList: Searchdata[];
  filteredSearchDataList: Searchdata[];
  _searchText: string;
  errorMessage: string;
  
  @Input() title = 'Information';

  constructor(public activeModal: NgbActiveModal, public userservice:UserService, 
    public projectservice:ProjectService, public parenttaskservice:ParenttaskService) { }

  ngOnInit() {
  }

  get searchText(): string{
    return this._searchText;
  }
  set searchText(value:string){
      this._searchText = value;
      this.filteredSearchDataList = this.searchText ? this.performFilter(this.searchText) : this.searchDataList;
  }

  set setModelType(value: Number){
    if (value == 1)
    {
      this.getAllUsers();
    }
    else if (value == 2)
    {
      this.getAllProjects();
    }
    else if (value == 3)
    {
      this.getAllParentTasks();
    }
  }

  performFilter(searchBy: string): Searchdata[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.searchDataList.filter((searchData: Searchdata) => ( searchData.name.toLocaleLowerCase().indexOf(searchBy) !== -1 ));
  }

  public getAllUsers() : void {
    this.userservice.getAllUsers().subscribe( 
      usersdata => {
          this.searchDataList = usersdata.map( u => {
            return {id: u.userid, name: u.firstname + " " + u.lastname}
          });
          this.filteredSearchDataList = this.searchDataList;
      },
      error => this.errorMessage = <any> error
    );
  }

  public getAllProjects() : void {
    this.projectservice.getAllProjects().subscribe( 
      projectsdata => {
          this.searchDataList = projectsdata.map( p => {
            return {id: p.projectid, name: p.project}
          });
          this.filteredSearchDataList = this.searchDataList;
      },
      error => this.errorMessage = <any> error
    );
  }

  public getAllParentTasks() : void {
    this.parenttaskservice.getAllParentTasks().subscribe( 
      parenttasksdata => {
          this.searchDataList = parenttasksdata.map( pt => {
            return {id: pt.parenttaskid, name: pt.parenttask}
          });
          this.filteredSearchDataList = this.searchDataList;
      },
      error => this.errorMessage = <any> error
    );
  }
}
