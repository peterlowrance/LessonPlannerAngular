import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Member} from '../model/member';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MemberService {

  private sectionsUrl: string;

  constructor(private http: HttpClient) {
    this.sectionsUrl = 'http://localhost:8080/';
  }

  public findProjectMembers(projectID: number): Observable<Member[]> {
    return this.http.get<Member[]>(this.sectionsUrl + 'project/' + projectID + '/members/');
  }

  public save(member: Member) {
    return this.http.post<Member>(this.sectionsUrl + 'project/' + member.projectID + '/members/', member);
  }

  public delete(member: Member) {
    return this.http.delete<Member>(this.sectionsUrl + 'project/' + member.projectID + '/members/' + member.memberID);
  }
}
