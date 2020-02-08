import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { DietManagementServiceService } from '../../diet-management-service.service';  
import { User } from '../../user';
import { Observable } from 'rxjs';  
import { map,catchError } from 'rxjs/operators';
import { FormControl,FormGroup,Validators} from '@angular/forms';  
import { RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import {Globals} from '../../globals';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['../admin-dash.component.css']
})
export class SendMessageComponent implements OnInit {
  userList: User[];
  selectedreceivers : String;
  messagetosend : string;
  public receivedMessages: string[] = [];
  private topicSubscription: Subscription;
  displayedColumns: string[] = ['conversation'];
  @ViewChild(MatTableDataSource,{static: true}) dataSource: MatTableDataSource<string> | null;
  
  constructor(private dmsservice:DietManagementServiceService,private rxStompService: RxStompService,public globals: Globals) { 
  this.loadUsers();
  }

   ngOnInit() {
      console.log("watching messages for :: role ::"+this.globals.role + " :: "+this.globals.userId);
      this.topicSubscription = this.rxStompService.watch('/topic/'+this.globals.userId).subscribe((message: Message) => {
	  console.log("received message by user: "+ message.body);
      this.receivedMessages.push(message.body);
	  this.dataSource = new MatTableDataSource(this.receivedMessages);
	  this.selectedreceivers=this.globals.userId;
    });
  }
   ngOnDestroy() {
    this.topicSubscription.unsubscribe();
   }
	loadUsers(){
		 this.dmsservice.getNonadminUsers().subscribe((data: User[])=> {
			if(data === null){
				console.log("No users loaded!");
			}else{
				 console.log("Users loaded Successfully "+data.length);
				 this.userList = data;
     		 }
        }, error => console.log(error));
	}
	change(event)
	  {
		if(event.isUserInput) {
		this.receivedMessages =[];
		this.dataSource = new MatTableDataSource(this.receivedMessages);
		console.log("change this.topicSubscription :: "+this.topicSubscription);
		if(this.topicSubscription!=null){
			this.topicSubscription.unsubscribe();
		}
		  console.log("user selected - "+event.source.value);
		  this.selectedreceivers = event.source.value;
		  this.topicSubscription = this.rxStompService.watch('/topic/'+event.source.value).subscribe((message: Message) => {
		  console.log("received message by admin : "+ message.body);
		  this.receivedMessages.push(message.body);
		  this.dataSource = new MatTableDataSource(this.receivedMessages);
		});
		}
	  }
	sendmessageform=new FormGroup({  
		receivers:new FormControl('' , [Validators.required] ), 
		message:new FormControl('' , [Validators.required] )
	}); 
	
	sendMessage(){
		//this.selectedreceivers = this.sendmessageform.get('receivers').value;
		this.messagetosend = this.sendmessageform.get('message').value;
		console.log("sendMessage : receiversList "+this.selectedreceivers);
		console.log("sendMessage : messagetosend "+this.messagetosend);
		this.rxStompService.publish({destination: '/topic/'+this.selectedreceivers, body: this.globals.userId+' - '+this.messagetosend, skipContentLengthHeader: true});
		/*this.dmsservice.sendMessage(this.selectedreceivers,this.messagetosend).subscribe((data: any)=> {
			if(data === null){
				console.log("Message in if sent!");
			}else{
				 console.log("Message in else sent!"+data);
     		}
        }, error => console.log(error));*/
	}
}
