package com.wipro.dms.entity;

import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
@Table(name = "diet_plan")
public class Dietplan implements Serializable {

	private static final long serialVersionUID = 2L;

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(updatable = false, nullable = false)
	private String dietPlanId;
	
    private String batch;
	
	private byte[] plan;
	
	public String getBatch() {
		return batch;
	}


	public void setBatch(String batch) {
		this.batch = batch;
	}


	public byte[] getPlan() {
		return plan;
	}


	public void setPlan(byte[] plan) {
		this.plan = plan;
	}

	public String getDietPlanId() {
		return dietPlanId;
	}


	public void setDietPlanId(String dietPlanId) {
		this.dietPlanId = dietPlanId;
	}
	
	public Dietplan() {
		super();
	}

}
