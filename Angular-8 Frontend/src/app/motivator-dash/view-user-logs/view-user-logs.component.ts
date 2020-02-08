import { Component, OnInit, ViewChild} from '@angular/core';
import { map,catchError } from 'rxjs/operators';
import { FormControl,FormGroup,Validators} from '@angular/forms';  
import { DietManagementServiceService } from '../../diet-management-service.service';  
import {Globals} from '../../globals';
import { MonthlyMeasurement } from '../../monthly-measurement';
import { DailyLog } from '../../daily-log';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-user-logs',
  templateUrl: './view-user-logs.component.html',
  styleUrls: ['../motivator-dash.component.css']
})
export class ViewUserLogsComponent implements OnInit {
  
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatTableDataSource,{static: true}) dataSourceDaily: MatTableDataSource<DailyLog> | null;
  @ViewChild(MatTableDataSource,{static: true}) dataSourceMonthly: MatTableDataSource<MonthlyMeasurement> | null;
  displayedWeeklyColumns = ['userId','activityDate','breakfast','lunch','dinner','fruits','vegetables','workouts'];
  displayedMonthlyColumns =['userId','date','weight','height','chest','waist','shoulders','biceps','forearm','legs','thighs'];
  whichLog : String = '';
  isDaily : boolean = false;
  
  constructor(private dmsservice:DietManagementServiceService,public globals: Globals) { }

  ngOnInit() {
	  this.whichLog='';
	  this.isDaily = false;
  }
  
  viewuserlogsForm=new FormGroup({  
		logType:new FormControl('',[Validators.required]),
		thighs :new FormControl('' , [] ) 
	});
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
	if(this.viewuserlogsForm.get('logType').value=='daily'){
		    this.dataSourceDaily.filter = filterValue;
	}else if(this.viewuserlogsForm.get('logType').value=='monthly'){
			this.dataSourceMonthly.filter = filterValue;
	}
  }
  selectLogType(event){
	  this.whichLog=this.viewuserlogsForm.get('logType').value;
	  if(this.whichLog=='daily'){
		  this.loadDailyLogs();
		  this.isDaily = true;
	  }else if(this.whichLog=='monthly'){
		  this.loadMonthlyLogs();
		  this.isDaily = false;
	  }
  }
  loadDailyLogs(){
		 this.dmsservice.getDailyLogs().subscribe((data: DailyLog[])=> {
			if(data === null){
				console.log("No daily logs loaded!");
			}else{
				 console.log("daily logs loaded Successfully "+data.length);
				 this.dataSourceDaily = new MatTableDataSource(data);
				 this.dataSourceDaily.paginator = this.paginator;
				 this.dataSourceDaily.sort = this.sort;
     		 }
        }, error => console.log(error));
	}
   loadMonthlyLogs(){
		 this.dmsservice.getMonthlyLogs().subscribe((data: MonthlyMeasurement[])=> {
			if(data === null){
				console.log("No monthly logs loaded!");
			}else{
				 console.log("monthly logs loaded Successfully "+data.length);
				 this.dataSourceMonthly = new MatTableDataSource(data);
				 this.dataSourceMonthly.paginator = this.paginator;
				 this.dataSourceMonthly.sort = this.sort;
     		 }
        }, error => console.log(error));
	}
}
