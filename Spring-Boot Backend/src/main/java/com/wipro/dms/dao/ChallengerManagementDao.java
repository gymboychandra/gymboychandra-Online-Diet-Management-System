package com.wipro.dms.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.wipro.dms.entity.Challenger;

@Repository
public interface ChallengerManagementDao extends JpaRepository<Challenger, String> {
	
	public Challenger save(Challenger challenger);
	
	@Query("FROM Challenger WHERE status IS NULL OR status = ''")
	public List<Challenger> getChallengers();
	
	@Query("SELECT c FROM Challenger c WHERE LOWER(c.email) = Lower(:email)")
	public Challenger getChallengerByEmail(String email);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Challenger c WHERE LOWER(c.email) = Lower(:email)")
	public void delete(String email);

}
