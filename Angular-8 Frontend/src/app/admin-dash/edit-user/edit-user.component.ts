import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';  
import { Observable } from 'rxjs';  
import { map,catchError,tap } from 'rxjs/operators';
import { MatRadioChange } from '@angular/material';
import { HttpResponse } from '@angular/common/http';
import { DietManagementServiceService } from '../../diet-management-service.service';  
import { Challenger } from '../../add-challenger/challenger'; 
import { User } from '../../user';  
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['../../add-challenger/add-challenger.component.css']
})
export class EditUserComponent implements OnInit {
   submitted = false; 
   challenger : Challenger=new Challenger();
   updatedUser : User = new User();
   emailid : String;
   userid : String;
   user: Observable<Challenger>;
   challengereditform : FormGroup;
   constructor(private dmsservice:DietManagementServiceService,private _router: Router,
   private route: ActivatedRoute) { 
	}
	 ngOnInit() {
		 this.challengereditform=new FormGroup({  
			fullName:new FormControl('', [Validators.required] ),  
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
		});  
		 this.route.paramMap.subscribe(params => {
			 this.emailid=params.get('email');
			 this.userid=params.get('id');
		this.loadChallenger(params.get('email'));
		});
	  }

    
	loadChallenger(email : String){
		this.user = this.dmsservice.getChallengerByEmail(email)
					.pipe(
						tap((user: any) => {
							console.log("inside tap");
							this.challengereditform.patchValue(user);
						})
					  )
					.pipe(catchError ((error: any) => {
							if (error.status < 400 ||  error.status ===500) {
								return Observable.throw(new Error(error.status));
							}
					}));
					/*.pipe(map((res: Challenger) => {
							if (res!=null){
								this.challenger = res;
								console.log("loadChallenger : user "+res.fullName+" details loaded by getChallengerByEmail!");
							}
					 }))
				 */
				
		this.user.subscribe(data => {
			if (data!=null){
				this.challenger = data;
				console.log("loadChallenger : user "+this.challenger.fullName+" details loaded!");
							}
		}, error => console.log(error));
	}
	onsubmit() {  
		this.challenger.fullName=this.challengereditform.get('fullName').value;  
		this.challenger.age=this.challengereditform.get('age').value;  
		this.challenger.gender=this.challengereditform.get('gender').value;; 
		this.challenger.mobile=this.challengereditform.get('mobile').value;  
		this.challenger.email=this.challengereditform.get('email').value;  
		this.challenger.address=this.challengereditform.get('address').value; 
		this.challenger.city=this.challengereditform.get('city').value; 
		this.challenger.state=this.challengereditform.get('state').value; 
		this.challenger.country=this.challengereditform.get('country').value; 
		this.challenger.pin=this.challengereditform.get('pin').value;  
		this.challenger.height=this.challengereditform.get('height').value;  
		this.challenger.weight=this.challengereditform.get('weight').value;
		this.challenger.reason=this.challengereditform.get('reason').value;  
		this.challenger.medicalCondition=this.challengereditform.get('medicalCondition').value;  
		this.challenger.dietRestriction=this.challengereditform.get('dietRestriction').value;
		this.challenger.dietType=this.challengereditform.get('dietType').value;
		this.challenger.pregnancyStatus=this.challengereditform.get('pregnancyStatus').value;
		//this.updatedUser.name=this.challengereditform.get('fullName').value; 
		//this.updatedUser.mobile=this.challengereditform.get('mobile').value;
		//this.updatedUser.email=this.emailid;
		//this.updatedUser.id=this.userid;
		this.submitted = true; 
		this.updateUsers();
	}  
	
	updateUsers(){
	 this.dmsservice.updateUser(this.userid,this.emailid,this.challengereditform.get('fullName').value,this.challengereditform.get('mobile').value)
		.pipe(map((res: User) => {
					if (res!=null && res.name!=null) {
						console.log(res.name+" user updated uccessfully!");
						this._router.navigate(['manage-user']);
					}
				}))
		.pipe(catchError ((error: any) => {
					if (error.status < 400 ||  error.status ===500) {
						console.log("saveUser exception - "+error.status+" : "+error.message);
						return Observable.throw(new Error(error.status));
					}
				})) 
		.subscribe(res => console.log(res), error => console.log(error)); 
		
	 this.dmsservice.saveChallenger(this.challenger)
		.pipe(map((res: Challenger) => {
                if (res!=null && res.fullName!=null) {
					console.log(res.fullName+" challenger updated uccessfully!");
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
