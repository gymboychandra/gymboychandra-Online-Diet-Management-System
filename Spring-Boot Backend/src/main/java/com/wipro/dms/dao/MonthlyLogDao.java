package com.wipro.dms.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.wipro.dms.entity.MonthlyMeasurement;

@Repository
public interface MonthlyLogDao extends JpaRepository<MonthlyMeasurement, String>{
	
	@Query("Select m FROM MonthlyMeasurement m")
	public List<MonthlyMeasurement> getMonthlyLogs();
    //use findAll instead of get
	
	public MonthlyMeasurement save(MonthlyMeasurement monthlyLog);

}
