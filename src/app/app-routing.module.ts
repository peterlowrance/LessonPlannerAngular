import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SectionListComponent} from './section-list/section-list.component';
import {ProjectViewComponent} from './project-view/project-view.component';

const routes: Routes = [
  {path: 'sections', component: SectionListComponent},
  {path: 'project/:id', component: ProjectViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
