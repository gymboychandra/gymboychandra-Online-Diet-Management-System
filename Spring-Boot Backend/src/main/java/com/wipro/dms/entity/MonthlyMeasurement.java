package com.wipro.dms.entity;

import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Entity;

@Entity
@IdClass(MeasurementId.class)
public class MonthlyMeasurement implements Serializable {

	private static final long serialVersionUID = 2L;

	@Id
	private String userId;
	@Id
	private String date;
	private int weight;
	private int height;
	private int chest;
	private int waist;
	private int shoulders;
	private int biceps;
	private int forearm;
	private int legs;
	private int thighs;
	
	public MonthlyMeasurement() {
		super();
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	
	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getChest() {
		return chest;
	}

	public void setChest(int chest) {
		this.chest = chest;
	}

	public int getWaist() {
		return waist;
	}

	public void setWaist(int waist) {
		this.waist = waist;
	}

	public int getShoulders() {
		return shoulders;
	}

	public void setShoulders(int shoulders) {
		this.shoulders = shoulders;
	}

	public int getBiceps() {
		return biceps;
	}

	public void setBiceps(int biceps) {
		this.biceps = biceps;
	}

	public int getForearm() {
		return forearm;
	}

	public void setForearm(int forearm) {
		this.forearm = forearm;
	}

	public int getLegs() {
		return legs;
	}

	public void setLegs(int legs) {
		this.legs = legs;
	}

	public int getThighs() {
		return thighs;
	}

	public void setThighs(int thighs) {
		this.thighs = thighs;
	}
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
}
