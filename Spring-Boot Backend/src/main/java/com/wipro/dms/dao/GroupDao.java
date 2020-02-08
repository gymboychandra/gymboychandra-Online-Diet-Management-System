package com.wipro.dms.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.wipro.dms.entity.Group11;

@Repository
public interface GroupDao extends JpaRepository<Group11, String> {
	
	public Group11 save(Group11 group);
	
	@Query("Select g FROM Group11 g where LOWER(g.batchId) = LOWER(:batchId)")
	public List<Group11> getGroups(String batchId);

}
