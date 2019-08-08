import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../model/project';
import {Observable} from 'rxjs/Observable';
import {Descriptor} from '../model/descriptor';

@Injectable()
export class ProjectService {

  private sectionsUrl: string;

  constructor(private http: HttpClient) {
    this.sectionsUrl = 'http://localhost:8080/';
  }

  public findProjectsInSection(sectionName: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.sectionsUrl + sectionName + '/projects/');
  }

  public findByID(projectID: number): Observable<Project> {
    return this.http.get<Project>(this.sectionsUrl + '/project/' + projectID);
  }

  public findProjectDescriptors(projectID: number): Observable<Descriptor[]> {
    return this.http.get<Descriptor[]>(this.sectionsUrl + 'project/' + projectID + '/descriptors/');
  }

  public save(project: Project) {
    return this.http.post<Project>(this.sectionsUrl + 'section/' + project.sectionID + '/project', project);
  }

  public updateDate(project: Project) {
    return this.http.post<number>(this.sectionsUrl + 'project/' + project.projectID, project.date);
  }

  public delete(project: Project) {
    return this.http.delete<Project>(this.sectionsUrl + 'project/' + project.projectID);
  }

  public update(project: Project) {
    return this.http.put<Project>(this.sectionsUrl + 'project/' + project.projectID, project);
  }
}
