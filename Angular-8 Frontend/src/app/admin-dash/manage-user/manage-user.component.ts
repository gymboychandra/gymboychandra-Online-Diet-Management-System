import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DietManagementServiceService } from '../../diet-management-service.service';  
import { User } from '../../user';
import { Observable } from 'rxjs';  
import { map,catchError } from 'rxjs/operators';
import { Group } from '../../group';
import { Batch } from '../../batch';
import { Challenger } from '../../add-challenger/challenger';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['../admin-dash.component.css']
})
export class ManageUserComponent implements OnInit {
  
  displayedColumns = ['action','id','email','mobile','name','batchId','groupId','update'];
  displayedUserColumns = ['fullName','age','gender','state','country','bmi','reason','medicalCondition','dietRestriction',
  'dietType','pregnancyStatus','referredCode'];
  
  users: User[] = [];
  batches: Batch[] = [];
  groups : Group[] = [];
  challengers : Challenger[] = [];
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatTableDataSource,{static: true}) dataSource: MatTableDataSource<User> | null;
  @ViewChild(MatTableDataSource,{static: true}) dataSourceUser : MatTableDataSource<Challenger> | null;
  clicked : boolean = false;
  constructor(private dmsservice:DietManagementServiceService,private _router: Router) {
	this.getUsers();
	this.loadBatches();
	this.loadGroups('Batch1');
  }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

   getUsers(){
	  this.dmsservice.getUserOnly().subscribe((data: User[])=> {
			if(data === null){
				console.log("No users loaded!");
			}else{
				 console.log("Users loaded Successfully "+data);
				 this.updateEntry(data);
     		 }
        }, error => console.log(error));
	}
	
	updateEntry(data: User[]) {
		 this.users = data;
		 // Assign the data to the data source for the table to render
		 this.dataSource = new MatTableDataSource(this.users);
		  /**
		   * Set the paginator and sort after the view init since this component will
		   * be able to query its view for the initialized paginator and sort.
		   */
		 this.dataSource.paginator = this.paginator;
		 this.dataSource.sort = this.sort;
    }
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
	
	loadGroups(batch: String){
		this.dmsservice.getGroups(batch).subscribe((data: Group[])=> {
			if(data === null){
				console.log("No Group loaded!");
			}else{
				 console.log("Groups loaded Successfully "+data);
				 this.groups = data;
     		 }
        }, error => console.log(error));
	}
	updateUser(user : User){
		this.dmsservice.saveUser(user)
		.pipe(map((res: User) => {
                if (res!=null){
					console.log("user "+res.name+" updated successfully!");
                }
         }))
		.pipe(catchError ((error: any) => {
                if (error.status < 400 ||  error.status ===500) {
                    return Observable.throw(new Error(error.status));
                }
		})) 
		.subscribe(data => console.log(data), error => console.log(error));
	}
	deleteUser(user : User){
		this.dmsservice.deleteUser(user)
		.subscribe(data => console.log(data), error => console.log(error));
	}
	showUserDetails(user : User){
		this.clicked = !(this.clicked);
		this.dataSourceUser = null;
		this.challengers =[];
		if(this.clicked){
			this.dmsservice.getChallengerByEmail(user.email)
				.pipe(map((res: Challenger) => {
						if (res!=null){
							this.challengers.push(res);
							this.dataSourceUser = new MatTableDataSource(this.challengers);
							console.log("user "+res.fullName+" details loaded by getChallengerByEmail!");
						}
				 }))
				.pipe(catchError ((error: any) => {
						if (error.status < 400 ||  error.status ===500) {
							return Observable.throw(new Error(error.status));
						}
				})) 
				.subscribe(data => console.log(data), error => console.log(error));
		}
	}
	editUser(user : User){
		console.log("user : "+user.name+" going to edit!");
		this._router.navigate(['edit-user',user.email,user.id]);
	}
}
