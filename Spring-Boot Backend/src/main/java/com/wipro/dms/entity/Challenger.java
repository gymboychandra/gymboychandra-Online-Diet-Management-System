package com.wipro.dms.entity;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.persistence.Entity;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Challenger implements Serializable {

	private static final long serialVersionUID = 1L;
	private @NotNull String fullName;
	private @NotNull int age;
	private String gender;
	private @NotNull String mobile;
	private @Id @NotNull @Email String email;
	private String address;
	private @NotNull String city;
	private String state;
	private String country;
	private int pin;
	/*
	 * Member's height in inches
	 */
	private double height;
	/*
	 * Member's weight in Kgs
	 */
	private double weight;
	/*
	 * BMI will be internally calculated as per
	 * weight(in KG)/square[Height(in meters)]
	 * d(meter) = d(″) / 39.37
	 */
	private double bmi;
	private String reason;
	private String medicalCondition;
	private String dietRestriction;
	/*
	 * Diet type of user like Veg /Non-Veg /Vegan
	 */
	private String dietType;
	/*
	 * Pregnancy status only for females
	 */
	private boolean pregnancyStatus;
	/*
	 * A existing member's referral Code using which a new member is registering
	 */
	private @NotNull String referredCode;	
	/* Status of challenger after Approve/Reject by admin */
	private String status;	
	private String rejectionReason;

	public Challenger() {
		super();
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public int getPin() {
		return pin;
	}

	public void setPin(int pin) {
		this.pin = pin;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public double getBmi() {
		return bmi;
	}
	
	public void setBmi(double bmi) {
		this.bmi = bmi;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getMedicalCondition() {
		return medicalCondition;
	}

	public void setMedicalCondition(String medicalCondition) {
		this.medicalCondition = medicalCondition;
	}

	public String getDietRestriction() {
		return dietRestriction;
	}

	public void setDietRestriction(String dietRestriction) {
		this.dietRestriction = dietRestriction;
	}

	public String getDietType() {
		return dietType;
	}

	public void setDietType(String dietType) {
		this.dietType = dietType;
	}

	public String getReferredCode() {
		return referredCode;
	}

	public void setReferredCode(String referredCode) {
		this.referredCode = referredCode;
	}

	public boolean isPregnancyStatus() {
		return pregnancyStatus;
	}

	public void setPregnancyStatus(boolean pregnancyStatus) {
		this.pregnancyStatus = pregnancyStatus;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	public String getRejectionReason() {
		return rejectionReason;
	}

	public void setRejectionReason(String rejectionReason) {
		this.rejectionReason = rejectionReason;
	}

}
