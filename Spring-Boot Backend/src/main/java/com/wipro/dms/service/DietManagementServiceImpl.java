package com.wipro.dms.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.wipro.dms.commons.DMSException;
import com.wipro.dms.dao.BatchDao;
import com.wipro.dms.dao.ChallengerManagementDao;
import com.wipro.dms.dao.DailyLogDao;
import com.wipro.dms.dao.DietPlanDao;
import com.wipro.dms.dao.GroupDao;
import com.wipro.dms.dao.MonthlyLogDao;
import com.wipro.dms.dao.UsersDao;
import com.wipro.dms.entity.Batch;
import com.wipro.dms.entity.Challenger;
import com.wipro.dms.entity.DailyLog;
import com.wipro.dms.entity.Dietplan;
import com.wipro.dms.entity.Group11;
import com.wipro.dms.entity.MonthlyMeasurement;
import com.wipro.dms.entity.Users;

public class DietManagementServiceImpl implements DietManagementService {

	@Autowired
	private ChallengerManagementDao challengerDao;

	@Autowired
	private UsersDao usersDao;

	@Autowired
	private BatchDao batchDao;

	@Autowired
	private GroupDao groupDao;

	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	private DietPlanDao dietPlanDao;
	
	@Autowired
	private DailyLogDao dailyLogDao;
	
	@Autowired
	private MonthlyLogDao monthlyLogDao;

	@Override
	public Challenger saveChallenger(Challenger challenger) {
		double height = challenger.getHeight();
		double weight = challenger.getWeight();
		/*
		 * BMI is calculated as per: weight(in KG)/square[Height(in meters)] where,
		 * d(meter) = d(″) / 39.37
		 */
		double bmi = weight / (Math.pow((height / 39.37), 2));
		challenger.setBmi(bmi);
		return challengerDao.save(challenger);
	}

	@Override
	public Users getUser(String email, String password) {
		return usersDao.getUser(email, password);
	}

	@Override
	public Users saveUser(Users user) {
		String random = UUID.randomUUID().toString();
		String[] fName = user.getName().split(" ");
		user.setPassword(random.substring(0, 4) + "%" + random.substring(random.length() - 5, random.length()));
		user.setReferralCode(fName[0] + ("_" + random.substring(0, 5)));
		return usersDao.save(user);
	}

	@Override
	public void deleteUser(Users user) {
		usersDao.delete(user);
		challengerDao.delete(user.getEmail());
	}

	@Override
	public List<Challenger> getChallengers() {
		return challengerDao.getChallengers();
	}

	@Override
	public List<Users> getUserOnly() {
		return usersDao.getUserOnly();
	}

	@Override
	public List<Batch> getBatches() {
		return batchDao.getBatches();
	}

	@Override
	public List<Group11> getGroups(String batchId) {
		return groupDao.getGroups(batchId);
	}

	@Override
	public Challenger getChallengerByEmail(String email) {
		return challengerDao.getChallengerByEmail(email);
	}

	private Users getUserByEmail(String email) {
		return usersDao.getUserByemail(email);
	}

	@Override
	public boolean sendEmail(String email, String status, String comments) throws DMSException {
		String message = "";
		boolean isMailSent = false;
		try {
			Users user = getUserByEmail(email);
			SimpleMailMessage msg = new SimpleMailMessage();
			if (status.equalsIgnoreCase("approved")) {
				if (user == null) {
					throw new DMSException("There is no user for " + email);
				}
				message = "Welocme to Diet Management referal program!  Please refer below account details :" + " Userid - "
						+ user.getId() + "  Password - " + user.getPassword() + "   Referral Code - "
						+ user.getReferralCode();
			} else if (status.equalsIgnoreCase("rejected")) {
				message = "We regret to inform you that you can not be part of Diet Management referal program! right now. But we would like to hear from you again, after rectification of below condition : "
						+ comments;
			}
			msg.setTo(email);
			msg.setSubject("Diet program membership update");
			msg.setText(message);

			javaMailSender.send(msg);
			isMailSent = true;
		} catch (Exception ex) {
			throw new DMSException(ex.getMessage());
		}
		return isMailSent;
	}

	@Override
	public Dietplan addDietPlan(Dietplan plan) throws DMSException {
		return dietPlanDao.save(plan);	
	}

	@Override
	public Dietplan getDietPlan(String batchId) throws DMSException {
		return dietPlanDao.getDietPlan(batchId);
	}

	@Override
	public List<Users> getNonAdminUsers() {
		return usersDao.getNonAdmin();
	}
	
	@Override
	public Users updateUser(String email,String userid,String name,String mobile) {
		Users user = usersDao.getUserByemail(email);
		user.setName(name);
		user.setMobile(mobile);
		return usersDao.save(user);
	}

	@Override
	public DailyLog saveDailyUserlog(DailyLog userLog){
		return dailyLogDao.save(userLog);
	}
	
	@Override
	public MonthlyMeasurement saveMonthlyUserlog(MonthlyMeasurement log) {
		return monthlyLogDao.save(log);
	}

	@Override
	public List<DailyLog> getDailyLogs() {
		return dailyLogDao.findAll();
	}

	@Override
	public List<MonthlyMeasurement> getMonthlyLogs() {
		return monthlyLogDao.findAll();
	}


}
