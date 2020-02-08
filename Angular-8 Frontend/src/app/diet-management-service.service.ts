import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Challenger } from './add-challenger/challenger';  
import { User } from './user'; 
import { Batch } from './batch'; 
import { Group } from './group';  
import { WeeklyPlan } from './weekly-plan';
import { DailyLog } from './daily-log';
import { MonthlyMeasurement } from './monthly-measurement';

@Injectable({
  providedIn: 'root'
})
export class DietManagementServiceService {

  private baseUrl = 'http://localhost:8080/api/';
  private rmqUrl = 'http://localhost:8080/rabbitmq/';  

  httpOptions = {
	  headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': 'my-auth-token'
	  })
  };
  
  httpOptionsFormData = {
	  headers: new HttpHeaders({
		'Access-Control-Allow-Origin':'*',
		'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
	  })
  };
  constructor(private http:HttpClient) { 
   
  }
  
  
  saveChallenger(challenger: object): Observable<Object> {  
    return this.http.post(this.baseUrl+'save-challenger', challenger);  
  }  
  
  saveUser(user: object): Observable<Object> {
	 return this.http.post(this.baseUrl+'save-user', user);   
  }
  
  deleteUser(user: object): Observable<Object> {
	  return this.http.post(this.baseUrl+'delete-user',
	{user: user},this.httpOptions);  
  }
  
  getChallengers(): Observable<Object>{
    return this.http.get<Challenger[]>(this.baseUrl+'get-challengers');
  }
  
  getUserOnly(): Observable<Object>{
	return this.http.get<User[]>(this.baseUrl+'get-users-only');
  }
  
  getNonadminUsers(): Observable<Object>{
	return this.http.get<User[]>(this.baseUrl+'get-nonadmin-users');
  }

  canLogin(email: string,userpassword: string): Observable<Object> {
    return this.http.post(this.baseUrl+'login',{
		email: email, 
		password: userpassword},this.httpOptions);
  }
  
  updateChallenger(updateChallenger : Challenger): Observable<Object>{
	  	 return this.http.post(this.baseUrl+'save-challenger', updateChallenger);   
  }
  sendMail(email : String, status : String,rejectionReason:String): Observable<Object>{
	  	 return this.http.post(this.baseUrl+'send-email',{
			 email: email,
			 status : status,
			 comments : rejectionReason},this.httpOptions);
  }
  getBatches(): Observable<Object>{
    return this.http.get<Batch[]>(this.baseUrl+'get-batches');
  }
  
  getGroups(batchId: String): Observable<Object>{
    return this.http.post<Group[]>(this.baseUrl+'get-groups',
	{batch: batchId},this.httpOptions);
  }
  getChallengerByEmail(email: String): Observable<Object>{
    return this.http.post<Challenger>(this.baseUrl+'get-challenger-by-email',
	{email: email},this.httpOptions);
  }
 
  saveWeeklyPlan(batch: String,plan:any): Observable<Object> {
	 console.log("saveWeeklyPlan :: Batch : "+batch);
	 console.log("saveWeeklyPlan :: Plan : "+plan);
	const formdata: FormData = new FormData();
    formdata.append('file',plan);
    formdata.append('batchid',""+batch);
	//return this.http.post(this.baseUrl+'save-diet-plan', formdata,this.httpOptionsFormData);
    const req = new HttpRequest('POST',this.baseUrl+'save-diet-plan', formdata,this.httpOptionsFormData);
    return this.http.request(req);	 
  }
  
  sendMessage(id : String,message : String): Observable<Object>{
	  console.log("sendMessage :: id : "+id);
	 console.log("sendMessage :: message : "+message);
	 return this.http.post(this.rmqUrl+'publish',{
		 receiverid: id,
		 message: message},this.httpOptions);
  }
  
  readMessage(userid : String): Observable<Object>{
	 console.log("readMessage :: userid : "+userid);
	 return this.http.post(this.rmqUrl+'check-messages',{
		 userid: userid},this.httpOptions);
  }
  
  updateUser(userid : String,emailid : String,name:String,mobile: String) : Observable<Object>{
	   console.log("updateUser :: userid : "+userid + " emailid : "+emailid);
	   return this.http.post(this.baseUrl+'update-user', {
		   userid : userid,
		   fullName : name,
		   mobile : mobile,
		   email : emailid
	   });  
  }
  addUserLog(dailyLog : DailyLog): Observable<Object>{
	 return this.http.post(this.baseUrl+'save-daily-userlog', dailyLog);   
  }
  addMonthlyLog(monthlyLog : MonthlyMeasurement): Observable<Object>{
	 return this.http.post(this.baseUrl+'save-monthly-measurementlog', monthlyLog);   
  }
  getDailyLogs(): Observable<Object>{
	  return this.http.get(this.baseUrl+'get-daily-userlog'); 
  }
  getMonthlyLogs() : Observable<Object>{
	  return this.http.get(this.baseUrl+'get-monthly-userlog'); 
  }
}
