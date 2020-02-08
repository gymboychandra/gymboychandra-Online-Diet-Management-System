package com.wipro.dms.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class DailyLog implements Serializable {

	private static final long serialVersionUID = 2L;

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)  
	private String logId;
	@Column(nullable = false)
	private String userId;
	@Column(nullable = false)
	private Date activityDate;
	private String breakfast;
	private String lunch;
	private String dinner;
	private String fruits;
	private String vegetables;
	private String workouts;
	
	public DailyLog() {
		super();
	}

	public String getLogId() {
		return logId;
	}

	public void setLogId(String logId) {
		this.logId = logId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public Date getActivityDate() {
		return activityDate;
	}

	public void setActivityDate(Date activityDate) {
		this.activityDate = activityDate;
	}

	public String getBreakfast() {
		return breakfast;
	}

	public void setBreakfast(String breakfast) {
		this.breakfast = breakfast;
	}

	public String getLunch() {
		return lunch;
	}

	public void setLunch(String lunch) {
		this.lunch = lunch;
	}

	public String getDinner() {
		return dinner;
	}

	public void setDinner(String dinner) {
		this.dinner = dinner;
	}

	public String getFruits() {
		return fruits;
	}

	public void setFruits(String fruits) {
		this.fruits = fruits;
	}

	public String getVegetables() {
		return vegetables;
	}

	public void setVegetables(String vegetables) {
		this.vegetables = vegetables;
	}

	public String getWorkouts() {
		return workouts;
	}

	public void setWorkouts(String workouts) {
		this.workouts = workouts;
	}


}
