import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';  
import { DietManagementServiceService } from '../../diet-management-service.service';  
import { MonthlyMeasurement } from '../../monthly-measurement';
import { Globals } from '../../globals';
import { Observable } from 'rxjs';  
import { map,catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-user-measurement-log',
  templateUrl: './user-measurement-log.component.html',
  styleUrls: ['../challenger-dash.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class UserMeasurementLogComponent implements OnInit {
  date1 = new FormControl(moment());

  constructor(private dmsservice:DietManagementServiceService,public globals: Globals,private _router: Router) { }
  monthlyMeasurement : MonthlyMeasurement=new MonthlyMeasurement(); 

  ngOnInit() {
  }

   monthlymeasurementform=new FormGroup({  
		weight:new FormControl('',[]),
		height:new FormControl('',[]),
		chest:new FormControl('',[] ),
		waist:new FormControl('',[]),
		shoulders:new FormControl('',[]),
		biceps:new FormControl('',[]),
		forearm:new FormControl('' , [] ),  
		legs:new FormControl('' , [] ),  
		thighs :new FormControl('' , [] ) 
	});
	
	 chosenYearHandler(normalizedYear: Moment) {
		const ctrlValue = this.date1.value;
		ctrlValue.year(normalizedYear.year());
		this.date1.setValue(ctrlValue);
	  }

	  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
		const ctrlValue = this.date1.value;
		ctrlValue.month(normalizedMonth.month());
		this.date1.setValue(ctrlValue);
		datepicker.close();
		console.log("date1 :: " + this.date1.value.format('M')+"/"+this.date1.value.format('YYYY'));
	  }
	
	submitLog(){
	 this.monthlyMeasurement.userId=this.globals.userId;
	 console.log("enter monthly Log : userid :: "+this.monthlyMeasurement.userId);
	 this.monthlyMeasurement.date=this.date1.value.format('M')+"/"+this.date1.value.format('YYYY');
	 console.log("submitLog : date :: "+this.monthlyMeasurement.date);
	 this.monthlyMeasurement.weight=this.monthlymeasurementform.get('weight').value;
	 this.monthlyMeasurement.height=this.monthlymeasurementform.get('height').value;
	 this.monthlyMeasurement.chest=this.monthlymeasurementform.get('chest').value;
	 this.monthlyMeasurement.waist=this.monthlymeasurementform.get('waist').value;
	 this.monthlyMeasurement.shoulders=this.monthlymeasurementform.get('shoulders').value;
	 this.monthlyMeasurement.biceps=this.monthlymeasurementform.get('biceps').value;
	 this.monthlyMeasurement.forearm=this.monthlymeasurementform.get('forearm').value;
	 this.monthlyMeasurement.legs=this.monthlymeasurementform.get('legs').value;
	 this.monthlyMeasurement.thighs=this.monthlymeasurementform.get('thighs').value;
	 this.saveLog();
	}
	
	saveLog(){
		 this.dmsservice.addMonthlyLog(this.monthlyMeasurement)
		 .pipe(map((res: MonthlyMeasurement) => {
					if (res!=null && res.userId!=null) {
						console.log("Monthly measurement logs added for : "+res.userId+"!");
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
