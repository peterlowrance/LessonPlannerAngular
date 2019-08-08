import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Section } from '../model/section';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SectionService {

  private sectionsUrl: string;

  constructor(private http: HttpClient) {
    this.sectionsUrl = 'http://localhost:8080/sections/';
  }

  public findAll(): Observable<Section[]> {
    return this.http.get<Section[]>(this.sectionsUrl);
  }

  public save(section: Section) {
    return this.http.post<Section>(this.sectionsUrl, section);
  }

  public delete(section: Section) {
    return this.http.delete<Section>(this.sectionsUrl + section.sectionID);
  }
}
