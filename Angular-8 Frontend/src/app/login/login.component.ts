import { Component, OnInit } from '@angular/core';
import { DietManagementServiceService } from '../diet-management-service.service';  
import { FormControl,FormGroup,Validators} from '@angular/forms';  
import { User } from '../user';  
import { Router } from '@angular/router';
import { Globals } from '../globals'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dmsservice:DietManagementServiceService,private _router: Router,public globals: Globals){ }
  email: string;
  password: string;
  minPw = 8;
  submitted: boolean = false;
  
  ngOnInit() {
  }

  loginForm=new FormGroup({  
		email:new FormControl('' , [Validators.required] ),  
		password:new FormControl('',[Validators.required,Validators.minLength(this.minPw)] )
	});		
  login(): void {
	this.globals.invalidLogin = false;
	this.email=this.loginForm.get('email').value;  
	this.password=this.loginForm.get('password').value;  
	this.submitted = true;
    if (this.loginForm.invalid) {
		this.globals.invalidLogin = true;
      return;
    }
	this.dmsservice.canLogin(this.email,this.password).subscribe((data: User)=> {
			if(data === null){
				this.globals.invalidLogin = true;
				console.log("Invalid credentials!");
			}else{
				this.globals.invalidLogin = false;
				this.globals.role = data.role;
				this.globals.userId = data.id;
				 console.log(this.globals.userId+" Logged in Successfully with role : "+this.globals.role);
				 this.loadDashboard(data);
			}
        }, error => console.log(error));
  }
  loadDashboard(user : User){
	if(user.role === 'challenger'){
		this._router.navigate(['challenger-dashboard']);
	}else if(user.role === 'admin'){
		this._router.navigate(['admin-dashboard']);
	}else if(user.role === 'motivator'){
		this._router.navigate(['motivator-dashboard']);
	}
  }
  
}
