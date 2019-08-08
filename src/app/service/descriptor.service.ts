import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Descriptor} from '../model/descriptor';

@Injectable()
export class DescriptorService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/';
  }

  public findProjectDescriptors(projectID: number): Observable<Descriptor[]> {
    return this.http.get<Descriptor[]>(this.url + 'project/' + projectID + '/descriptors');
  }

  public save(descriptor: Descriptor) {
    return this.http.post<Descriptor>(this.url + 'project/' + descriptor.projectID + '/descriptors/', descriptor);
  }

  public update(descriptor: Descriptor) {
    return this.http.put<Descriptor>(this.url + 'project/' + descriptor.projectID + '/descriptors/', descriptor);
  }

  public delete(descriptor: Descriptor) {
    return this.http.delete<Descriptor>(this.url + 'project/' + descriptor.projectID + '/descriptors/' + descriptor.descriptorID);
  }
}
