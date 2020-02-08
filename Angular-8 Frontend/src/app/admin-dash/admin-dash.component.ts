import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Challenger } from '../add-challenger/challenger';  
import { DietManagementServiceService } from '../diet-management-service.service';  
import { User } from '../user';
import { Observable } from 'rxjs';  
import { map,catchError } from 'rxjs/operators';
import { FormControl,FormGroup,Validators} from '@angular/forms';  

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css','admin-dash.component.css']
})

/* Actions supported in this dashboard :
 * Approve/Disapprove registered user
 * Assign Registered users to batches[BelowBMI25,AboveBMI25] and groups
 * Add/Delete/Modify users
 * Search user/group/batch details
 * Post weekly diet and workout plan
 * View daily logs and monthly workout chart
 * Communicate with motivator and challengers 
*/
export class AdminDashComponent {

  displayedColumns = ['fullName','age','gender','state','country','bmi','reason','medicalCondition','dietRestriction',
  'dietType','pregnancyStatus','referredCode','rejectionReason','status'];
  user : User=new User(); 	
  challengers: Challenger[] = [];
  isRejected : boolean = false;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatTableDataSource,{static: true}) dataSource: MatTableDataSource<Challenger> | null;
  
  constructor(private dmsservice:DietManagementServiceService) {
	this.getChallengers();
	}
  challengerstatusform=new FormGroup({  
	rejectionReason:new FormControl('' , [Validators.required] )
  });	

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  /** Fetch all Registered Challengers. */
  getChallengers(){
	  this.dmsservice.getChallengers().subscribe((data: Challenger[])=> {
			if(data === null){
				console.log("No challenger loaded!");
			}else{
				 console.log("Challenger's loaded Successfully "+data);
				 this.updateEntry(data);
     		 }
        }, error => console.log(error));
	}
	
	updateEntry(data: Challenger[]) {
		 this.challengers = data;
		 // Assign the data to the data source for the table to render
		 this.dataSource = new MatTableDataSource(this.challengers);
		  /**
		   * Set the paginator and sort after the view init since this component will
		   * be able to query its view for the initialized paginator and sort.
		   */
		 this.dataSource.paginator = this.paginator;
		 this.dataSource.sort = this.sort;
    }
	
	approved(approvedChallenger : Challenger){
		this.saveUser(approvedChallenger);
		//Update challenger with status
		this.updateChallengerStatus(approvedChallenger,'approved');
	}
	rejected(rejectedChallenger : Challenger){
		//Update challenger with status
		this.isRejected = true;
		rejectedChallenger.rejectionReason=this.challengerstatusform.get('rejectionReason').value;  
		this.updateChallengerStatus(rejectedChallenger,'rejected');
		console.log("Rejection reason - "+ rejectedChallenger.rejectionReason);
	}
	saveUser(approvedChallenger : Challenger){
		this.user.name=approvedChallenger.fullName;
		this.user.mobile=approvedChallenger.mobile;
		this.user.email=approvedChallenger.email;
		this.user.role='challenger';
		this.dmsservice.saveUser(this.user)
		.pipe(map((res: User) => {
                if (res!=null){
					console.log("user - "+ res.name+" enrolled successfully!");
                }
         }))
		.pipe(catchError ((error: any) => {
                if (error.status < 400 ||  error.status ===500) {
                    return Observable.throw(new Error(error.status));
                }
		})) 
		.subscribe(data => console.log(data), error => console.log(error)); 
	}
	
	updateChallengerStatus(updateChallenger : Challenger,update : String){
		updateChallenger.status = update;
		this.dmsservice.updateChallenger(updateChallenger)
		.pipe(map((res: Challenger) => {
                if (res!=null){
					console.log("Sending mail to user - "+ res.email);
					if(res.status != null && res.status != '')
						this.sendMail(res);
                }
         }))
		.pipe(catchError ((error: any) => {
                if (error.status < 400 ||  error.status ===500) {
                    return Observable.throw(new Error(error.status));
                }
		})) 
		.subscribe(data => console.log(data), error => console.log(error)); 
	}
	sendMail(challenger : Challenger){
		this.dmsservice.sendMail(challenger.email,challenger.status,challenger.rejectionReason)
		.subscribe(data => console.log(data), error => console.log(error)); 
	}
	
	
}



