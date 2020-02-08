import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { RxStompService} from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { FormControl,FormGroup,Validators} from '@angular/forms';  
import { User } from '../../user';
import { DietManagementServiceService } from '../../diet-management-service.service';  
import {Globals} from '../../globals';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['../motivator-dash.component.css']
})
export class MessagesComponent implements OnInit {
	
  public receivedMessages: string[] = [];
  private topicSubscription: Subscription;
  userList: User[];
  messagetosend : string;
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
		if(this.topicSubscription){
			this.topicSubscription.unsubscribe();
		}
		if(event.isUserInput) {
		  console.log("user selected - "+event.source.value);
		  this.topicSubscription = this.rxStompService.watch('/topic/'+event.source.value).subscribe((message: Message) => {
		  console.log("received message by admin : "+ message.body);
		  this.receivedMessages.push(message.body);
		  this.dataSource = new MatTableDataSource(this.receivedMessages);
		});
		}
	  }
	messageform=new FormGroup({  
		receivers:new FormControl('' , [Validators.required] ), 
		message:new FormControl('' , [Validators.required] )
	}); 
 
  sendMessage(){
		this.messagetosend = this.messageform.get('message').value;
		console.log("sendMessage : messagetosend "+this.messagetosend);
		this.rxStompService.publish({destination: '/topic/'+this.globals.userId, body: this.globals.userId+'  - '+this.messagetosend, skipContentLengthHeader: true});
	}
}
