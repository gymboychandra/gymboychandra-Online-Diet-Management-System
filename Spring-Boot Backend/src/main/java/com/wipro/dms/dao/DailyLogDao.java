package com.wipro.dms.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.wipro.dms.entity.DailyLog;

@Repository
public interface DailyLogDao extends JpaRepository<DailyLog, String> {
	
	public DailyLog save(DailyLog dailyLog);
}
