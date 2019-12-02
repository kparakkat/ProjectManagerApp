import { Component, OnInit, Output, EventEmitter, NgModuleRef } from '@angular/core';
import { Project } from 'src/app/Shared/project';
import { ProjectService } from 'src/app/Shared/project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';
import { UserService } from 'src/app/Shared/user.service';
import { ResultData } from 'src/app/Shared/resultdata';
import { User } from 'src/app/Shared/user';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  model = new Project();
  saveStatus: any;
  submitted = false;
  disableValidation = true;
  isdaterequired = false;
  actionName = "Add";
  todayDate: String;
  closeResult: String;
  managerid: Number;
  selectedManagerid: Number;
  @Output() savedProject = new EventEmitter(); 
  constructor(public projectservice:ProjectService, private modalService: NgbModal, public userservice:UserService) { }

  ngOnInit() {
    this.model.priority = 1;
    let today = new Date((new Date().getTime() - 24 * 60 * 60 * 1000));
    this.todayDate = today.toISOString().slice(0,10);
    this.clearManagerId();
  }

  onSubmit() {
    if (this.submitted)
    {
      this.model.startdate = new Date(JSON.stringify(this.model.startdate));
      this.model.enddate = new Date(JSON.stringify(this.model.enddate));
      this.projectservice.saveProject(this.model).subscribe(data => {
         if (data != null && this.managerid != this.selectedManagerid)
         {
           let projectId: Number = data.projectid;
           this.userservice.getUserByProjectId(Number(projectId)).subscribe(user => {
              if (user != null)
              {
                user.projectid = null;
                this.userservice.editUser(user).subscribe(data => {
                    if (data != null && this.selectedManagerid > 0)
                      this.saveUser(projectId);
                  });
              }
              else if (this.selectedManagerid > 0)
                  this.saveUser(projectId);
            });
         }
         else
         {
          this.saveStatus = "Saved Successfully!";
          this.savedProject.emit('Saved');
          this.clearForm();
         }
      });
    }
  }

  clearForm() : void{
    this.submitted = false; 
    this.model = new Project();
    this.model.priority = 1;
    this.disableValidation = true;
    this.actionName = "Add"
    this.clearManagerId();
  }

  clearManagerId(): void {
    this.managerid = null;
    this.selectedManagerid = this.managerid;
  }
  saveUser(projectId: Number) : void {
      this.userservice.getUserById(Number(this.selectedManagerid)).subscribe(data => {
        data.projectid = Number(projectId);
        this.userservice.editUser(data).subscribe(resultData => {
          this.saveStatus = resultData.response;
          this.savedProject.emit('Saved');
          this.clearForm();
        });
      });
  }
    
  onSubmitClick(): void{
    this.submitted = true; 
  }

  resetProject(): void{
    this.model = new Project();
    this.disableValidation = true;
    this.saveStatus = "";
    this.actionName = "Add"
    this.managerid = null;
    this.selectedManagerid = this.managerid;
  }

  setChange(): void{
    this.disableValidation = false;
    this.saveStatus = "";
  }

  setIsdateRequired(): void{
    if (this.isdaterequired) { this.isdaterequired = false;}
    else {this.isdaterequired = true;}
  }

  public editProject(projectId: string) : void
  {
    this.saveStatus = "";
    this.actionName = "Edit";
    this.projectservice.getProjectById(Number(projectId)).subscribe(data => {
      this.model = data;
      // let startDate = JSON.stringify(this.model.startdate).slice(1,11);
      // console.log(startDate);
      this.model.startdate = new Date(JSON.stringify(data.startdate));
      this.model.enddate = new Date(JSON.stringify(data.enddate));
      // this.model.startdate = new Date(this.model.startdate);
      // this.model.enddate = new Date(this.model.enddate);
      if (this.model.startdate != null || this.model.enddate != null )
        this.isdaterequired = true;
      else
        this.isdaterequired = false;

        this.userservice.getUserByProjectId(Number(projectId)).subscribe(user => {
          if (user != null)
          {
            this.managerid = user.userid;
            this.selectedManagerid = this.managerid;
            this.model.managername = user.firstname + " " + user.lastname;
          }
          else
          {
            this.clearManagerId();
            this.model.managername = "";
          }
        });
      });
  }

  searchUser() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'User Search';
    modalRef.componentInstance.setModelType = 1;
    modalRef.result.then((result) => { 
          this.closeResult =  `${result}`;
          if (this.closeResult != 'Close') {
            let managerDetails  = this.closeResult.split("~");
            this.selectedManagerid = +managerDetails[0];
            this.model.managername = managerDetails[1];
          }
        }, 
        (reason) => { 
            this.closeResult = `${reason}`
        });
  }
}
