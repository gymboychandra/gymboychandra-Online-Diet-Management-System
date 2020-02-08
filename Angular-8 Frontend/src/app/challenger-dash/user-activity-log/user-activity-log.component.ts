import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';  
import { DietManagementServiceService } from '../../diet-management-service.service';  
import { DailyLog } from '../../daily-log';
import { Globals } from '../../globals';
import { Observable } from 'rxjs';  
import { map,catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-activity-log',
  templateUrl: './user-activity-log.component.html',
  styleUrls: ['../challenger-dash.component.css']
})
export class UserActivityLogComponent implements OnInit {

  constructor(private dmsservice:DietManagementServiceService,public globals: Globals,private _router: Router) { }
  submitted = false; 
  dailyLog : DailyLog=new DailyLog(); 

   ngOnInit() {
	  	      this.submitted=false;  
   }
   useractivityform=new FormGroup({  
		activityDate:new FormControl('' , [Validators.required] ),  
		breakfast:new FormControl('',[]),
		lunch:new FormControl('',[]),
		dinner:new FormControl('',[] ),
		fruits:new FormControl('',[]),
		vegetables:new FormControl('',[]),
		workouts:new FormControl('',[])
	});
	
	enterLog(){
	 this.dailyLog.userId=this.globals.userId;
	 console.log("enterLog : userid :: "+this.dailyLog.userId);
	 this.dailyLog.activityDate=this.useractivityform.get('activityDate').value;
	 this.dailyLog.breakfast=this.useractivityform.get('breakfast').value;
	 this.dailyLog.lunch=this.useractivityform.get('lunch').value;
	 this.dailyLog.dinner=this.useractivityform.get('dinner').value;
	 this.dailyLog.fruits=this.useractivityform.get('fruits').value;
	 this.dailyLog.vegetables=this.useractivityform.get('vegetables').value;
	 this.dailyLog.workouts=this.useractivityform.get('workouts').value;
	 this.submitted = true;  
	 
	 this.dmsservice.addUserLog(this.dailyLog)
	 .pipe(map((res: DailyLog) => {
				if (res!=null && res.userId!=null) {
					console.log("Daily user logs added for : "+res.userId+"!");
					this._router.navigate(['challenger-dashboard']);
				}
			}))
	 .pipe(catchError ((error: any) => {
				if (error.status < 400 ||  error.status ===500) {
					return Observable.throw(new Error(error.status));
				}
			})) 
	 .subscribe(res => console.log(res), error => console.log(error));
	}
	
}
