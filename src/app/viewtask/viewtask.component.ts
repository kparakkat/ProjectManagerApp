import { Component, OnInit } from '@angular/core';
import { Task } from '../Shared/task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../Shared/task.service';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
import { ParenttaskService } from '../Shared/parenttask.service';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  tasks: Task[];
  projectName: String;
  projectId: Number;
  closeResult: String;
  errorMessage: string;
  deleteStatus: string;
  constructor(private modalService: NgbModal, public taskservice:TaskService, 
    public parenttaskservice: ParenttaskService ,private router:Router) { }

  ngOnInit() {
  }

  sort(sortBy: string): void {
    if (sortBy == 'StartDate')
      this.tasks = this.tasks.sort( (a,b) => a.startdate < b.startdate ? -1 : a.startdate > b.startdate ? 1: 0);
    else if (sortBy == 'EndDate')
      this.tasks = this.tasks.sort( (a,b) => a.enddate < b.enddate ? -1 : a.enddate > b.enddate ? 1: 0);
    else if (sortBy == 'Priority')
      this.tasks = this.tasks.sort( (a,b) => a.priority < b.priority ? -1 : a.priority > b.priority ? 1: 0);
    else if (sortBy == 'Status')  
      this.tasks = this.tasks.sort( (a,b) => a.status < b.status ? -1 : a.status > b.status ? 1: 0);
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
            this.projectId = +projectDetails[0];
            this.projectName = projectDetails[1];
            this.getTasksByProjectId(this.projectId);
          }
        }, 
        (reason) => { 
            this.closeResult = `${reason}`
        });
  }

  onEditTask(taskId: String)
  {
    let editTaskId = Number(taskId);
    this.router.navigate([`/editTask/${editTaskId}`]);
  }

  onEndTask(taskId: String)
  {
    let endTaskId = Number(taskId);
    this.taskservice.getTaskById(Number(endTaskId)).subscribe( 
      task => {
          task.status = "Completed";
          task.priority = 0;
          this.taskservice.saveTask(task).subscribe(
            updatedTask => {
                this.deleteStatus = "Completed";
            }
          );
      },
      error => this.errorMessage = <any> error
    );
  }

  public getTasksByProjectId(projectId: Number) : void {
    this.taskservice.getTasksByProjectId(Number(projectId)).subscribe( 
      tasksdata => {
          this.tasks = tasksdata;
          for (let task of this.tasks)
          {
            this.parenttaskservice.getByParentTaskId(Number(task.parenttaskid)).subscribe(
              parenttaskdata => {
                task.parenttaskname = parenttaskdata.parenttask;
              }
            );
          }
      },
      error => this.errorMessage = <any> error
    );
  }
}
