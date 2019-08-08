import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {SectionListComponent} from './section-list/section-list.component';
import {SectionService} from './service/section.service';
import {ProjectService} from './service/project.service';
import {ProjectViewComponent} from './project-view/project-view.component';
import {MemberService} from './service/member.service';
import {DescriptorService} from './service/descriptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SectionListComponent,
    ProjectViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SectionService, ProjectService, MemberService, DescriptorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
