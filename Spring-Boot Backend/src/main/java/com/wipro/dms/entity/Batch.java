package com.wipro.dms.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Entity;

@Entity
public class Batch implements Serializable {

	private static final long serialVersionUID = 2L;

	@Id
	private String batchId;
	private String batchName;
	private Date startDate;
	private Date endDate;
	private Date measurmentDate;
	
	//@OneToMany(targetEntity=Users.class,mappedBy="batchId")
	//private Set<Users> users;


	public Batch() {
		super();
	}

	public String getBatchId() {
		return batchId;
	}

	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}

	/*
	 * Gets batch Name
	 * 
	 * @return String batch's name
	 */
	public String getBatchName() {
		return batchName;
	}

	/*
	 * Sets batch name.
	 * 
	 * @param batchName batch name
	 */
	public void setBatchName(String batchName) {
		this.batchName = batchName;
	}

	/*
	 * Gets batch start date
	 * 
	 * @return Date batch start date
	 */
	public Date getStartDate() {
		return startDate;
	}

	/*
	 * Sets batch start date.
	 * 
	 * @param startDate batch start date
	 */
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	/*
	 * Gets batch end date
	 * 
	 * @return Date batch end date
	 */
	public Date getEndDate() {
		return endDate;
	}

	/*
	 * Sets batch end date.
	 * 
	 * @param endDate batch end date
	 */
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	/*
	 * Gets batch measurement date. The date when batch members are supposed to
	 * submit their measurements
	 * 
	 * @return Date batch measurement date
	 */
	public Date getMeasurmentDate() {
		return measurmentDate;
	}

	/*
	 * Sets batch measurement date.The date when batch members are supposed to
	 * submit their measurements
	 * 
	 * @param measurmentDate batch measurement date
	 */
	public void setMeasurmentDate(Date measurmentDate) {
		this.measurmentDate = measurmentDate;
	}

	/*
	 * public Set<Users> getUsers() { return users; }
	 * 
	 * public void setUsers(Set<Users> users) { this.users = users; }
	 */

	/*
	 * public Set<Group11> getGroups() { return groups; }
	 * 
	 * public void setGroups(Set<Group11> groups) { this.groups = groups; }
	 */

}
