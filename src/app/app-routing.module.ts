import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesComponent } from './series/series.component';
import { AuthGuard } from './guards/secure.guard';


const routes: Routes = [
  { path: 'series', component: SeriesComponent, canActivate: [AuthGuard], data : {roles:['ADMIN']} },
  { path: '', redirectTo: 'series', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
