import {Component, OnInit} from '@angular/core';
import {Project} from '../model/project';
import {ProjectService} from '../service/project.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Descriptor} from '../model/descriptor';
import {Member} from '../model/member';
import {FormControl, FormGroup} from '@angular/forms';
import {MemberService} from '../service/member.service';
import {DescriptorService} from '../service/descriptor.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'scale(0)'}),
          animate('150ms', style({transform: 'scale(1)'}))
        ]),
        transition(':leave', [
          style({transform: 'scale(1)'}),
          animate('100ms', style({transform: 'scale(0)'}))
        ])
      ]
    ),
    trigger(
      'barAnimation', [
        transition(':enter', [
          style({transform: 'scaleX(0)'}),
          animate('200ms ease-out', style({transform: 'scaleX(1)'}))
        ])
      ]
    )
  ]
})
export class ProjectViewComponent implements OnInit {

  project: Project;
  descriptors: Descriptor[];
  members: Member[];
  newMember: Member;
  edit: boolean;
  descriptor: Descriptor;

  descToUpdate: Descriptor;
  updating: boolean;

  dateForm = new FormGroup({
    dateInput: new FormControl('' || undefined)
  });

  constructor(private projectService: ProjectService, private memberService: MemberService, private location: Location,
              private descriptorService: DescriptorService, private router: Router) {
    this.newMember = new Member();
    this.newMember.memberID = 0;
    this.edit = false;
    this.descriptor = new Descriptor();
    this.updating = false;
  }

  ngOnInit() {
    const s = this.location.path().split('/');
    const pID = +s[s.length - 1];
    this.projectService.findByID(pID).subscribe(data => {
      if (!data) {
        this.router.navigate(['/sections']);
      } else {
        this.project = data;
        if (this.project.date) {
          this.dateForm.get('dateInput').setValue(this.project.date);
          this.project.date = this.formatDate(this.project.date);
        }
        this.newMember.projectID = data.projectID;
        this.descriptor.projectID = data.projectID;
      }
    });

    this.projectService.findProjectDescriptors(pID).subscribe(data => {
      this.descriptors = data;
      if (data.length === 0) {
        this.edit = true;
      }
    });

    this.memberService.findProjectMembers(pID).subscribe(data => {
      this.members = data;
      if (data.length === 0) {
        this.edit = true;
      }
    });

    this.dateForm.get('dateInput').valueChanges.subscribe(data => {
      if (data) {
        this.project.date = data;
        this.projectService.updateDate(this.project).subscribe(result => this.project.date = this.formatDate(data));
      }
    });
  }

  formatDate(dateToFormat: string): string {
    const date = dateToFormat.split('-');
    if (date.length > 2) {
      return date[1] + '/' + date[2] + '/' + date[0];
    }
    return dateToFormat;
  }

  unformatDate(formattedDate: string): string {
    if (formattedDate) {
      const date = formattedDate.split('/');
      if (date.length > 2) {
        return date[2] + '-' + date[0] + '-' + date[1];
      }
    }
    return formattedDate;
  }

  addMember(member: Member) {
    if (member.name && member.role) {
      this.memberService.save(member).subscribe(data => this.members.push(data));
      this.newMember.name = '';
      this.newMember.role = '';
    }
  }

  deleteMember(member: Member) {
    member.projectID = this.newMember.projectID;
    this.memberService.delete(member).subscribe();
    this.members = this.members.filter(function (value, index, arr) {
      return value.memberID !== member.memberID;
    });
  }

  addDescriptor() {
    if (this.descriptor && this.descriptor.header) {
      this.descriptorService.save(this.descriptor).subscribe(data => this.descriptors.push(data));
      this.descriptor.header = '';
    }
  }

  deleteDescriptor(descriptor: Descriptor) {
    descriptor.projectID = this.newMember.projectID;
    this.descriptorService.delete(descriptor).subscribe();
    this.descriptors = this.descriptors.filter(function (value, index, arr) {
      return value.descriptorID !== descriptor.descriptorID;
    });
  }

  updateInfo(desc: Descriptor) {
    desc.projectID = this.descriptor.projectID;
    this.descToUpdate = desc;
    this.descriptorService.update(desc).subscribe();
  }

  updateName() {
    this.project.date = this.unformatDate(this.project.date);
    this.projectService.update(this.project).subscribe();
  }

  toggleSize(descriptor: Descriptor) {
    descriptor.projectID = this.descriptor.projectID;
    descriptor.bigHeader = !descriptor.bigHeader;
    this.descriptorService.update(descriptor).subscribe();
  }
}
