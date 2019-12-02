import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/Shared/project';
import { ProjectService } from 'src/app/Shared/project.service';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/Shared/task.service';

@Component({
  selector: 'app-viewproject',
  templateUrl: './viewproject.component.html',
  styleUrls: ['./viewproject.component.css']
})
export class ViewprojectComponent implements OnInit {

  projects: Project[];
  filteredProjects: Project[];
  errorMessage: string;
  _searchText: string;
  deleteStatus: any;
  @Output() editProject = new EventEmitter(); 

  constructor(public projectservice:ProjectService, private router:Router, public taskservice:TaskService) { }
  
  get searchText(): string{
    return this._searchText;
  }
  set searchText(value:string){
      this._searchText = value;
      this.filteredProjects = this.searchText ? this.performFilter(this.searchText) : this.projects;
  }

  performFilter(searchBy: string): Project[] {
    searchBy = searchBy.toLocaleLowerCase();
    return this.projects.filter((project: Project) => ( project.project.toLocaleLowerCase().indexOf(searchBy) !== -1));
  }

  sort(sortBy: string): void {
    if (sortBy == 'StartDate')
      this.filteredProjects = this.projects.sort( (a,b) => a.startdate < b.startdate ? -1 : a.startdate > b.startdate ? 1: 0);
    else if (sortBy == 'EndDate')
      this.filteredProjects = this.projects.sort( (a,b) => a.enddate < b.enddate ? -1 : a.enddate > b.enddate ? 1: 0);
    else if (sortBy == 'Priority')
      this.filteredProjects = this.projects.sort( (a,b) => a.priority < b.priority ? -1 : a.priority > b.priority ? 1: 0);
    else if (sortBy == 'Completed')
    this.filteredProjects = this.projects.sort( (a,b) => a.completed < b.completed ? -1 : a.completed > b.completed ? 1: 0);
  }

  ngOnInit() : void {
    this.getAllProjects();
  }

  onEditProject(projectId: string)
  {
    this.editProject.emit(projectId);
  }

  onDeleteProject(projectId: string)
  {
    this.projectservice.deleteProject(Number(projectId)).subscribe( data => {this.deleteStatus = data.response;this.getAllProjects();});
  }

  public getAllProjects() : void {
    this.projectservice.getAllProjects().subscribe( 
      projectsdata => {
          this.projects = projectsdata;
          this.filteredProjects = this.projects;
          for(let project of this.projects)
          {
              this.taskservice.getTasksByProjectId(Number(project.projectid)).subscribe(
                tasks => {
                    project.numberoftasks = tasks.length;
                    let completedStatus:Boolean = true;
                    for(let task of tasks)
                    {
                        if (task.status != "Completed")
                          {
                            completedStatus = false;
                            break;
                          }
                    }
                    if (completedStatus)
                      project.completed = "Yes";
                    else
                      project.completed = "No";
                }
              );

          }
      },
      error => this.errorMessage = <any> error
    );
  }
}
