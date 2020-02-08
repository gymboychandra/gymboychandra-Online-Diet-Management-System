package com.wipro.dms.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Entity;

@Entity
public class Group11 implements Serializable {

	private static final long serialVersionUID = 2L;

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)  
	private String id;
	private String groupName;
	
	/*
	 * @ManyToOne(targetEntity = Batch.class)
	 * 
	 * @JoinColumn(name="batchId")
	 */
	private String batchId;

	@OneToMany(targetEntity=Users.class,mappedBy="groupId")
	private Set<Users> users;
	
	public Group11() {
		super();
	}

	/*
	 * Gets batch Id
	 * 
	 * @return String batch ID
	 */
	public String getBatchId() {
		return batchId;
	}

	/*
	 * Sets batch Id.
	 * 
	 * @param batchId batch ID
	 */
	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}

	/*
	 * Gets Group Name
	 * 
	 * @return String group name
	 */
	public String getGroupName() {
		return groupName;
	}

	/*
	 * Sets group name.
	 * 
	 * @param groupName group name
	 */
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	/*
	 * Gets unique group Id
	 * 
	 * @return String group ID
	 */
	public String getId() {
		return id;
	}
	
	/*
	 * Sets unique group Id
	 * 
	 * @return groupId A unique group ID
	 */
	public void setId(String id) {
		this.id = id;
	}

	
}
