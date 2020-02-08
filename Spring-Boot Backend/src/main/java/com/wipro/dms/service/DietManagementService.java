package com.wipro.dms.service;

import java.util.List;
import com.wipro.dms.commons.DMSException;
import com.wipro.dms.entity.Batch;
import com.wipro.dms.entity.Challenger;
import com.wipro.dms.entity.DailyLog;
import com.wipro.dms.entity.Dietplan;
import com.wipro.dms.entity.Group11;
import com.wipro.dms.entity.MonthlyMeasurement;
import com.wipro.dms.entity.Users;

public interface DietManagementService {
	
	public Challenger saveChallenger(Challenger  challenger);
	
	public Users getUser(String email,String password);
	
	public Users saveUser(Users  user);
		
	public void deleteUser(Users  user);

	public List<Challenger> getChallengers();
	
	public List<Users> getUserOnly();
	
	public List<Users> getNonAdminUsers();
	
	public List<Batch> getBatches();
	
	public List<Group11> getGroups(String batchId);
	
	public Challenger getChallengerByEmail(String email);
	
	public boolean sendEmail(String email,String message,String comments) throws DMSException;
	
	public Dietplan addDietPlan(Dietplan plan) throws DMSException;
	
	public Dietplan getDietPlan(String batchId) throws DMSException;
	
	Users updateUser(String email,String userid,String name,String mobile);
	
	DailyLog saveDailyUserlog(DailyLog userLog);
	
	MonthlyMeasurement saveMonthlyUserlog(MonthlyMeasurement log);
	
	public List<DailyLog> getDailyLogs();
	
	public List<MonthlyMeasurement> getMonthlyLogs();
}
