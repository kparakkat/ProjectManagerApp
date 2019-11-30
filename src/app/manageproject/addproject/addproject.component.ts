import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/Shared/project';
import { ProjectService } from 'src/app/Shared/project.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal.component';

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
  actionName = "Add";
  todayDate: String;
  @Output() savedProject = new EventEmitter(); 
  constructor(public projectservice:ProjectService, private router:Router, private modalService: NgbModal) { }

  ngOnInit() {
    let today = new Date((new Date().getTime() - 24 * 60 * 60 * 1000));
    this.todayDate = today.toISOString().slice(0,10);
  }

  onSubmit() {
    if (this.submitted)
    {
      this.model.startdate = new Date(JSON.stringify(this.model.startdate));
      this.model.enddate = new Date(JSON.stringify(this.model.enddate));

      if (this.actionName == "Add")
        this.projectservice.addProject(this.model).subscribe(data => {this.saveStatus = data.response;this.savedProject.emit('Saved');});
      else
        this.projectservice.editProject(this.model).subscribe(data => {this.saveStatus = data.response; this.savedProject.emit('Saved');});

      this.submitted = false; 
      this.model = new Project();
      this.disableValidation = true;
      this.actionName = "Add"
    }
  }
  
  onSubmitClick(): void{
    this.submitted = true; 
  }

  resetProject(): void{
    this.model = new Project();
    this.disableValidation = true;
    this.saveStatus = "";
    this.actionName = "Add"
  }

  setChange(): void{
    this.disableValidation = false;
    this.saveStatus = "";
  }

  public editProject(projectId: string) : void
  {
    this.saveStatus = "";
    this.actionName = "Edit";
    this.projectservice.getProjectById(Number(projectId)).subscribe(data => {
      this.model = data;
      //this.model.startdate = new Date(JSON.stringify(this.model.startdate));
      //this.model.enddate = new Date(JSON.stringify(this.model.enddate));
    });

  }

  searchUser() {
    // const modalRef = this.modalService.open(ModalComponent);
    const modalRef = this.modalService.open(ModalComponent);
    // modalRef.componentInstance.title = 'About';
  }
}
