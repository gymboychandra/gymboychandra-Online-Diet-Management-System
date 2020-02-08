package com.wipro.dms.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.wipro.dms.entity.Batch;

@Repository
public interface BatchDao extends JpaRepository<Batch, String> {
	
	public Batch save(Batch batch);
	
	@Query("FROM Batch")
	public List<Batch> getBatches();

}
