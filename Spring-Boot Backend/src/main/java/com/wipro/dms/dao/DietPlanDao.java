package com.wipro.dms.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.wipro.dms.entity.Dietplan;
import com.wipro.dms.entity.Group11;

@Repository
public interface DietPlanDao extends JpaRepository<Group11, String> {
	
	public Dietplan save(Dietplan group);
	
	@Query("Select p FROM Dietplan p where LOWER(p.batch) = LOWER(:batchId)")
	public Dietplan getDietPlan(String batchId);

}
