import { Component, OnInit } from '@angular/core';
import { DietManagementServiceService } from '../diet-management-service.service';  
import { FormControl,FormGroup,Validators} from '@angular/forms';  
import { Challenger } from './challenger';  
import { Observable } from 'rxjs';  
import { map,catchError } from 'rxjs/operators';
import { MatRadioChange } from '@angular/material';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-add-challenger',
  templateUrl: './add-challenger.component.html',
  styleUrls: ['./add-challenger.component.css']
})
export class AddChallengerComponent implements OnInit {

  constructor(private dmsservice:DietManagementServiceService) { }

	challenger : Challenger=new Challenger(); 
	submitted = false; 
    ngOnInit() {
	      this.submitted=false;  
	}

    challengersaveform=new FormGroup({  
		fullName:new FormControl('' , [Validators.required] ),  
		age:new FormControl('',[Validators.required] ),  
		gender:new FormControl('',[Validators.required]),
		mobile:new FormControl('',[Validators.required]),//Validators.maxLength(10),Validators.maxLength(10),Validators.pattern('(7|8|9)\d{9}')
		email: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
		address:new FormControl('',[Validators.maxLength(150)] ), 
		city:new FormControl('',[]),
		state:new FormControl('',[Validators.required]),
		country:new FormControl('',[Validators.required]),
		pin:new FormControl('',[Validators.required]),
		height:new FormControl('',[]),//Validators.pattern('\d{6}')
		weight:new FormControl('',[]),
		reason:new FormControl('',[]),
		medicalCondition:new FormControl('',[]),
		dietRestriction:new FormControl('',[]),
		dietType:new FormControl('',[]),
		pregnancyStatus:new FormControl('',[]),
		referredCode:new FormControl('',[Validators.required] )
	});  
	
    saveChallenger(saveChallenger){
	 this.challenger=new Challenger();     
		this.challenger.fullName=this.challengersaveform.get('fullName').value;  
		this.challenger.age=this.challengersaveform.get('age').value;  
		this.challenger.gender=this.challengersaveform.get('gender').value;; 
		this.challenger.mobile=this.challengersaveform.get('mobile').value;  
		this.challenger.email=this.challengersaveform.get('email').value;  
		this.challenger.address=this.challengersaveform.get('address').value; 
		this.challenger.city=this.challengersaveform.get('city').value; 
		this.challenger.state=this.challengersaveform.get('state').value; 
		this.challenger.country=this.challengersaveform.get('country').value; 
		this.challenger.pin=this.challengersaveform.get('pin').value;  
		this.challenger.height=this.challengersaveform.get('height').value;  
		this.challenger.weight=this.challengersaveform.get('weight').value;
		this.challenger.reason=this.challengersaveform.get('reason').value;  
		this.challenger.medicalCondition=this.challengersaveform.get('medicalCondition').value;  
		this.challenger.dietRestriction=this.challengersaveform.get('dietRestriction').value;
		this.challenger.dietType=this.challengersaveform.get('dietType').value;
		this.challenger.pregnancyStatus=this.challengersaveform.get('pregnancyStatus').value;
		this.challenger.referredCode=this.challengersaveform.get('referredCode').value;
		this.submitted = true;  
		this.save();  
	}  
	  
		
	save() {  
	 this.dmsservice.saveChallenger(this.challenger)
	.pipe(map((res: Challenger) => {
                if (res!=null) {
					console.log(res.fullName+" challenger saved uccessfully!")
                }
            }))
	.pipe(catchError ((error: any) => {
                if (error.status < 400 ||  error.status ===500) {
                    return Observable.throw(new Error(error.status));
                }
            })) 
	.subscribe(res => console.log(res), error => console.log(error)); 
	
	 //this.challenger = new Challenger();  
	}  
  
    addChallengerForm(){  
		this.submitted=false;
		this.challengersaveform.reset(); 
        this.challengersaveform.markAsUntouched();
		this.challengersaveform.markAsPristine();
		this.challengersaveform.clearValidators();
        this.challengersaveform.updateValueAndValidity();
	}  
  
}
