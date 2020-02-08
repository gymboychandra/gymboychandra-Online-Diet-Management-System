package com.wipro.dms.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.wipro.dms.entity.Users;

@Repository
public interface UsersDao extends JpaRepository<Users, String> {
	
	@Query("SELECT u FROM Users u WHERE LOWER(u.email) = Lower(:email) AND u.password = :password")
	public Users getUser(String email,String password);
	
	public Users save(final Users user);
	
	@Query("FROM Users WHERE LOWER(role) = 'challenger'")
	public List<Users> getUserOnly();
	
	public void delete(final Users user);
	
	@Query("SELECT u FROM Users u WHERE LOWER(u.email) = Lower(:email)")
	public Users getUserByemail(String email);

	@Query("FROM Users WHERE LOWER(role) != 'admin'")
	public List<Users> getNonAdmin();
	
}
