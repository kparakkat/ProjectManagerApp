import { Component, OnInit } from '@angular/core';
import { Task } from '../Shared/task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../Shared/task.service';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

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
  constructor(private modalService: NgbModal,
    public taskservice:TaskService, private router:Router) { }

  ngOnInit() {
  }

  sort(sortBy: string): void {
    if (sortBy == 'StartDate')
      this.tasks = this.tasks.sort( (a,b) => a.startdate < b.startdate ? -1 : a.startdate > b.startdate ? 1: 0);
    else if (sortBy == 'EndDate')
      this.tasks = this.tasks.sort( (a,b) => a.enddate < b.enddate ? -1 : a.enddate > b.enddate ? 1: 0);
    else if (sortBy == 'Priority')
    this.tasks = this.tasks.sort( (a,b) => a.priority < b.priority ? -1 : a.priority > b.priority ? 1: 0);
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

  public getTasksByProjectId(projectId: Number) : void {
    this.taskservice.getTasksByProjectId(Number(projectId)).subscribe( 
      tasksdata => {
          this.tasks = tasksdata;
      },
      error => this.errorMessage = <any> error
    );
  }
}
