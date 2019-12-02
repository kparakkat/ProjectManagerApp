import { Component, OnInit } from '@angular/core';
import { Task } from '../Shared/task';
import { ParenttaskService } from '../Shared/parenttask.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Parenttask } from '../Shared/parenttask';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { TaskService } from '../Shared/task.service';
import { UserService } from '../Shared/user.service';
import { ProjectService } from '../Shared/project.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {
  // Model for the Add Task
  model = new Task();
  // To disable validation on certain controls
  disableValidation = true;
  // This flag identifies whether this is a parent task
  isparenttask = false;
  // Start date
  todayDate: String;
  // Response after save
  saveStatus: any;
  // To identify a submit request
  submitted = false;
  // Underlying action
  actionName = "Add";
  // To capture the popup result
  closeResult: String;

  constructor(public parenttaskservice:ParenttaskService, private modalService: NgbModal,
              public taskservice:TaskService, public userservice:UserService,
              public projectservice:ProjectService,
              private router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    // Accessing the route parameter
    this.route.params.subscribe(params => {
      let taskId = params['taskid'];
      if (taskId > 0)
        this.loadTask(taskId);
    });
    // Intitalizing today's date
    let today = new Date((new Date().getTime() - 24 * 60 * 60 * 1000));
    this.todayDate = today.toISOString().slice(0,10);
    this.model.priority = 0;
  }

  onSubmit() {
    if (this.submitted)
    {
      if (this.isparenttask ){
        // Saves the Parent Task
        this.saveParentTask();
      }
      else {
          this.saveTask();
      }
    }
  }

  // This method saves the parent tasks
  saveParentTask(): void {
    let parentTask: Parenttask = new Parenttask();
    parentTask.parenttask = this.model.task;
    this.parenttaskservice.saveParentTask(parentTask).subscribe(
      data => {
        if (data.parenttaskid != null)
        {
          this.saveStatus = "Parent Task Saved Successfully!";
          this.clearForm();
        }
        else
        {
          this.saveStatus = "Save Failed! Try Again!";
        }
      });
  }

  // This method saves the task and detaches the old user and a call to attach the current user
  saveTask(): void {
    this.model.startdate = new Date(JSON.stringify(this.model.startdate));
    this.model.enddate = new Date(JSON.stringify(this.model.enddate));
    this.taskservice.saveTask(this.model).subscribe(data => {
        if (data != null && this.model.userid != this.model.selecteduserid)
        {
          let taskId: Number = data.taskid;
          this.userservice.getUserByTaskId(Number(taskId)).subscribe(user => {
            if (user != null)
            {
              user.taskid = null;
              this.userservice.editUser(user).subscribe(data => {
                  if (data != null && this.model.selecteduserid > 0)
                    this.saveUser(taskId);
                });
            }
            else if (this.model.selecteduserid > 0)
                this.saveUser(taskId);
          });
        }
        else
        {
          this.saveStatus = "Saved Successfully!";
          this.clearForm();
        }
      });
  }

  // This method associate the task with the current user
  saveUser(taskId: Number) : void {
    this.userservice.getUserById(Number(this.model.selecteduserid)).subscribe(data => {
      data.taskid = Number(taskId);
      this.userservice.editUser(data).subscribe(resultData => {
        this.saveStatus = "Saved Successfully!";
        this.clearForm();
      });
    });
  }

  // This method clear the form values after save
  clearForm() : void{
    this.model = new Task();
    this.model.priority = 0;
    this.disableValidation = true;
    this.submitted = false;
    this.actionName ="Add";
    this.isparenttask = false;
  }

  // This method to set whether it is a parent task
  // This will allow to disable certain controls
  setIsParentTask(): void{
    if (this.isparenttask) { this.isparenttask = false;}
    else {this.isparenttask = true;}
  }

  // To make sure it is a submit
  onSubmitClick(): void{
    this.submitted = true; 
  }

  // Detecting the change on form to enable validaiton
  setChange(): void{
    this.disableValidation = false;
    this.saveStatus = "";
  }

  // Search for the project using modal popup
  searchProject(): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Project Search';
    modalRef.componentInstance.setModelType = 2;
    modalRef.result.then((result) => { 
          this.closeResult =  `${result}`;
          if (this.closeResult != 'Close') {
            let projectDetails  = this.closeResult.split("~");
            this.model.projectid = +projectDetails[0];
            this.model.projectname = projectDetails[1];
          }
        }, 
        (reason) => { 
            this.closeResult = `${reason}`
        });
  }

  // This method to search for the parent tasks
  searchParentTask() : void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Parent Task Search';
    modalRef.componentInstance.setModelType = 3;
    modalRef.result.then((result) => { 
          this.closeResult =  `${result}`;
          if (this.closeResult != 'Close') {
            let parentTaskDetails  = this.closeResult.split("~");
            this.model.parenttaskid = +parentTaskDetails[0];
            this.model.parenttaskname =parentTaskDetails[1];
          }
        }, 
        (reason) => { 
            this.closeResult = `${reason}`
        });
  }

  // This method to search for the user
  searchUser() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'User Search';
    modalRef.componentInstance.setModelType = 1;
    modalRef.result.then((result) => { 
          this.closeResult =  `${result}`;
          if (this.closeResult != 'Close') {
            let userDetails  = this.closeResult.split("~");
            this.model.selecteduserid = +userDetails[0];
            this.model.username = userDetails[1];
          }
        }, 
        (reason) => { 
            this.closeResult = `${reason}`
        });
  }

  // This method loads the Tasks data
  public loadTask(taskId: Number) : void {
    this.actionName = "Edit";
    this.taskservice.getTaskById(Number(taskId)).subscribe(data => {
    this.model = data;
    this.model.startdate = new Date(JSON.stringify(data.startdate));
    this.model.enddate = new Date(JSON.stringify(data.enddate));
    
    this.projectservice.getProjectById(Number(this.model.projectid)).subscribe(
      project => {
        if (project != null) {
          this.model.projectname = project.project;
        }
      });

    this.parenttaskservice.getByParentTaskId(Number(this.model.parenttaskid)).subscribe(
      parenttask => {
        if (parenttask != null) {
          this.model.parenttaskname = parenttask.parenttask;
        }
      });

    this.userservice.getUserByTaskId(Number(taskId)).subscribe(user => {
        if (user != null)
        {
          this.model.userid = user.userid;
          this.model.selecteduserid = this.model.userid;
          this.model.username = user.firstname + " " + user.lastname;
        }
      });
    });
  }

}
