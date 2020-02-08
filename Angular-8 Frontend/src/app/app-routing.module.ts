import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddChallengerComponent } from './add-challenger/add-challenger.component';
import { LoginComponent } from './login/login.component';
import { ChallengerDashComponent } from './challenger-dash/challenger-dash.component';
import { MotivatorDashComponent } from './motivator-dash/motivator-dash.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { ManageUserComponent } from './admin-dash/manage-user/manage-user.component';
import { UploadWeeklyPlanComponent } from './admin-dash/upload-weekly-plan/upload-weekly-plan.component';
import { SendMessageComponent } from './admin-dash/send-message/send-message.component';
import { EditUserComponent } from './admin-dash/edit-user/edit-user.component';
import { UserActivityLogComponent } from './challenger-dash/user-activity-log/user-activity-log.component';
import { UserMeasurementLogComponent } from './challenger-dash/user-measurement-log/user-measurement-log.component';
import { ViewUserLogsComponent } from './motivator-dash/view-user-logs/view-user-logs.component';

const routes: Routes = [
{ path: 'add-challenger', component: AddChallengerComponent },  
{ path : 'login', component: LoginComponent },
{ path : 'challenger-dashboard', component: ChallengerDashComponent }, 
{ path : 'admin-dashboard', component: AdminDashComponent }, 
{ path : 'motivator-dashboard', component: MotivatorDashComponent }, 
{ path : 'logout', component: LoginComponent }, 
{ path : 'manage-user', component: ManageUserComponent },
{ path : 'upload-weekly-plan', component: UploadWeeklyPlanComponent },
{ path : 'send-message', component: SendMessageComponent },
{ path : 'edit-user/:email/:id', component: EditUserComponent },
{ path : 'app-user-activity-log', component: UserActivityLogComponent},
{ path : 'user-measurement-log', component: UserMeasurementLogComponent},
{ path : 'view-logs', component: ViewUserLogsComponent},
{ path : '', component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [LoginComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
