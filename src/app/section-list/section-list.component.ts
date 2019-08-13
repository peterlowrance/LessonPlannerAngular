import {Component, OnInit, ViewChild} from '@angular/core';
import {Section} from '../model/section';
import {SectionService} from '../service/section.service';
import {Project} from '../model/project';
import {ProjectService} from '../service/project.service';
import {trigger, transition, style, animate} from '@angular/animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'scale(0)'}),
          animate('200ms ease-out', style({transform: 'scale(1)'}))
        ]),
        transition(':leave', [
          style({transform: 'scale(1)'}),
          animate('150ms ease-out', style({transform: 'scale(0)'}))
        ])
      ]
    ),
    trigger(
      'barAnimation', [
        transition(':enter', [
          style({transform: 'scaleX(0)'}),
          animate('200ms ease-out', style({transform: 'scaleX(1)'}))
        ]),
        transition(':leave', [
          style({transform: 'scaleX(1)'}),
          animate('150ms ease-out', style({transform: 'scaleX(0)'}))
        ])
      ]
    )
  ]
})
export class SectionListComponent implements OnInit {

  sections: Section[];

  projects: Map<number, Project[]>;

  section: Section;

  newProjects: Map<number, Project>;

  edit: boolean;

  @ViewChild('myForm', { static: false }) myForm;

  constructor(private sectionService: SectionService, private projectService: ProjectService, private router: Router) {
    this.projects = new Map();
    this.section = new Section();
    this.newProjects = new Map();
    this.edit = false;
  }

  ngOnInit() {
    this.sectionService.findAll().subscribe(data => {
      this.sections = data;
      if (data.length === 0) {
        this.edit = true;
      }
      this.sections.forEach(section => {
        this.projectService.findProjectsInSection(section.name).subscribe(project => {
          this.projects.set(section.sectionID, project);
        });
        this.newProjects.set(section.sectionID, new Project());
      });
    });
  }

  goToProject(project) {
    this.router.navigate(['/project', project.projectID]);
  }

  deleteProject(project, sectionID) {
    console.log(sectionID);
    this.projectService.delete(project).subscribe(data => {
      this.projects.set(sectionID, this.projects.get(sectionID).filter(function (value, index, arr) {
        return value.projectID !== project.projectID;
      }));
    });
  }

  deleteSection(section) {
    this.sectionService.delete(section).subscribe(data => {
      this.sections = this.sections.filter(function (value, index, arr) {
        return value.sectionID !== section.sectionID;
      });
      this.projects.delete(section.sectionID);
      this.newProjects.delete(section.sectionID);
    });
  }

  addSection() {
    if (this.section && this.section.name) {
      this.sectionService.save(this.section).subscribe(data => {
        this.sections.push(data);
        const emptyArr: Project[] = [];
        this.projects.set(data.sectionID, emptyArr);
        this.newProjects.set(data.sectionID, new Project());
        this.section.name = '';
      });
    }
  }

  addProject(sectionID: number) {
    if (this.newProjects.get(sectionID) && this.newProjects.get(sectionID).name) {
      this.newProjects.get(sectionID).sectionID = sectionID;
      this.projectService.save(this.newProjects.get(sectionID)).subscribe(data => this.projects.get(sectionID).push(data));
      this.newProjects.get(sectionID).name = '';
    }
  }
}
