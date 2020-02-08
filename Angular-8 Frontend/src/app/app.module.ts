import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddChallengerComponent } from './add-challenger/add-challenger.component';
import { HttpClientModule } from '@angular/common/http';  
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,MatPaginatorModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatRadioModule,MatSelectModule,
  MatListModule,MatTabsModule,MatSidenavModule,MatDividerModule,MatDatepickerModule,MatNativeDateModule} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { DietManagementServiceService } from './diet-management-service.service';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { MotivatorDashComponent } from './motivator-dash/motivator-dash.component';
import { ChallengerDashComponent } from './challenger-dash/challenger-dash.component';  
import { Globals } from './globals';
import { ManageUserComponent } from './admin-dash/manage-user/manage-user.component';
import { UploadWeeklyPlanComponent } from './admin-dash/upload-weekly-plan/upload-weekly-plan.component';
import { SendMessageComponent } from './admin-dash/send-message/send-message.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './my-rx-stomp-config';
import { MessagesComponent } from './motivator-dash/messages/messages.component';
import { EditUserComponent } from './admin-dash/edit-user/edit-user.component';
import { UserActivityLogComponent } from './challenger-dash/user-activity-log/user-activity-log.component';
import { UserMeasurementLogComponent } from './challenger-dash/user-measurement-log/user-measurement-log.component';
import { ViewUserLogsComponent } from './motivator-dash/view-user-logs/view-user-logs.component';

@NgModule({
  declarations: [
    AppComponent,
    AddChallengerComponent,
    LoginComponent,
    AdminDashComponent,
    MotivatorDashComponent,
    ChallengerDashComponent,
    ManageUserComponent,
    UploadWeeklyPlanComponent,
    SendMessageComponent,
    MessagesComponent,
    EditUserComponent,
    UserActivityLogComponent,
    UserMeasurementLogComponent,
    ViewUserLogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	BrowserAnimationsModule,
	FormsModule,  
    ReactiveFormsModule,
	HttpClientModule,
	MatToolbarModule, 
    MatButtonModule, 
    MatCardModule, 
    MatDialogModule,
	MatDatepickerModule,	
	MatInputModule, 
    MatIconModule,
	MatMenuModule,
	MatNativeDateModule,
    MatProgressSpinnerModule,
	MatRadioModule,
	MatPaginatorModule,
	MatSelectModule,
	MatTableModule, 
	MatListModule,
	MatTabsModule,
	MatSidenavModule,
	MatDividerModule
  ],
  providers: [DietManagementServiceService,Globals,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
