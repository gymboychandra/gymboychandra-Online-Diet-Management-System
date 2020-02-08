import { Component, OnInit} from '@angular/core';
import { Batch } from '../../batch';
import { DietManagementServiceService } from '../../diet-management-service.service';  
import { FormControl,FormGroup,Validators} from '@angular/forms';  
import { Observable } from 'rxjs';  
import { map,catchError } from 'rxjs/operators';
import { WeeklyPlan } from '../../weekly-plan';

@Component({
  selector: 'app-upload-weekly-plan',
   templateUrl: './upload-weekly-plan.component.html',
   styleUrls: ['../admin-dash.component.css']
})
export class UploadWeeklyPlanComponent implements OnInit {

  batches: Batch[] = [];
  batch : String;
  plan : File;
  constructor(private dmsservice:DietManagementServiceService) {
	this.loadBatches();
  }

  ngOnInit() {
  }
  uploaddietplanform=new FormGroup({  
		batch:new FormControl('' , [Validators.required] ),  
		plan:new FormControl('',[Validators.required] ),  
  });
  loadBatches(){
		 this.dmsservice.getBatches().subscribe((data: Batch[])=> {
			if(data === null){
				console.log("No Batch loaded!");
			}else{
				 console.log("Batches loaded Successfully "+data);
				 this.batches = data;
     		 }
        }, error => console.log(error));
	}
	upload(files: File[]){
		console.log("Batch : "+this.uploaddietplanform.get('batch').value);
		console.log("Plan : "+this.uploaddietplanform.get('plan').value);
		this.batch=this.uploaddietplanform.get('batch').value;  
		this.plan=this.uploaddietplanform.get('plan').value;  
	}
	submit(){
		this.dmsservice.saveWeeklyPlan(this.batch,this.plan)
		.subscribe((res: WeeklyPlan)=> {
			if(res === null){
			console.log("Diet plan not added!");
			}else{
			 console.log("Diet plan added!"+res);
     		 }
        }, error => console.log(error));
	}

}
