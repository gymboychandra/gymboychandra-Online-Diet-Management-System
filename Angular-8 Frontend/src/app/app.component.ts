import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {Globals} from './globals'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Diet Management System';
  
  constructor(private loginComp:LoginComponent,public globals: Globals){
  }
	

  onLogout(){
	  this.globals.invalidLogin=true;
  }
}

