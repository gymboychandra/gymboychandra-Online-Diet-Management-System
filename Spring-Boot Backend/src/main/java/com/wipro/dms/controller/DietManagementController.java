package com.wipro.dms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.reflect.TypeToken;
import com.google.gson.Gson;
import com.wipro.dms.commons.DMSException;
import com.wipro.dms.entity.Batch;
import com.wipro.dms.entity.Challenger;
import com.wipro.dms.entity.DailyLog;
import com.wipro.dms.entity.Dietplan;
import com.wipro.dms.entity.Group11;
import com.wipro.dms.entity.MonthlyMeasurement;
import com.wipro.dms.entity.Users;
import com.wipro.dms.service.DietManagementService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api")
public class DietManagementController {

	private Gson gson;

	@Autowired
	private DietManagementService service;

	public DietManagementController() {
		gson = new Gson();
	}

	@PostMapping(value = "/login")
	public Users login(@RequestBody String input) {
		Type type = new TypeToken<Map<String, String>>() {
		}.getType();
		Map<String, String> json = gson.fromJson(input, type);
		String email = json.get("email");
		String password = json.get("password");
		Users user = this.service.getUser(email, password);
		return user;
	}

	@PostMapping(value = "/save-challenger")
	public Challenger saveChallenger(@RequestBody Challenger challenger, HttpServletResponse response)
			throws IOException {
		try {
			response.setStatus(HttpServletResponse.SC_CREATED);
			return this.service.saveChallenger(challenger);
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return null;
	}

	@GetMapping(value = "/get-challengers")
	public List<Challenger> getChallengers(HttpServletResponse response) throws IOException {
		try {
			response.setStatus(HttpServletResponse.SC_OK);
			return this.service.getChallengers();
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return Collections.EMPTY_LIST;
	}

	@PostMapping(value = "/save-user")
	public Users saveUser(@RequestBody Users user, HttpServletResponse response) throws IOException {
		try {
			response.setStatus(HttpServletResponse.SC_CREATED);
			return this.service.saveUser(user);
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return null;
	}

	@PostMapping(value = "/delete-user")
	public ResponseEntity<String> deleteUser(@RequestBody String input) throws IOException {
		String id = "";
		try {
			// response.setStatus(HttpServletResponse.SC_ACCEPTED);
			Type type = new TypeToken<Map<String, Users>>() {
			}.getType();
			Map<String, Users> json = gson.fromJson(input, type);
			Users user = json.get("user");
			id = user.getId();
			this.service.deleteUser(user);
		} catch (Exception ex) {
			// response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
			// ex.getMessage());
			System.out.println(ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(id, HttpStatus.OK);
	}

	@GetMapping(value = "/get-users-only")
	public List<Users> getUserOnly(HttpServletResponse response) throws IOException {
		try {
			response.setStatus(HttpServletResponse.SC_ACCEPTED);
			return this.service.getUserOnly();
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return Collections.EMPTY_LIST;
	}
	
	@GetMapping(value = "/get-nonadmin-users")
	public List<Users> getNonAdminUsers(HttpServletResponse response) throws IOException {
		try {
			response.setStatus(HttpServletResponse.SC_ACCEPTED);
			return this.service.getNonAdminUsers();
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return Collections.EMPTY_LIST;
	}
	
	@GetMapping(value = "/get-batches")
	public List<Batch> getBatches(HttpServletResponse response) throws IOException {
		try {
			response.setStatus(HttpServletResponse.SC_ACCEPTED);
			return this.service.getBatches();
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return Collections.EMPTY_LIST;
	}

	@PostMapping(value = "/get-groups")
	public List<Group11> getGroups(@RequestBody String input, HttpServletResponse response) throws IOException {
		try {
			Type type = new TypeToken<Map<String, String>>() {
			}.getType();
			Map<String, String> json = gson.fromJson(input, type);
			String batchId = json.get("batch");
			response.setStatus(HttpServletResponse.SC_ACCEPTED);
			return this.service.getGroups(batchId);
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return Collections.EMPTY_LIST;
	}

	@PostMapping(value = "/get-challenger-by-email")
	public Challenger getChallengers(@RequestBody String input, HttpServletResponse response) throws IOException {
		try {
			Type type = new TypeToken<Map<String, String>>() {
			}.getType();
			Map<String, String> json = gson.fromJson(input, type);
			String email = json.get("email");
			response.setStatus(HttpServletResponse.SC_OK);
			return this.service.getChallengerByEmail(email);
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return null;
	}

	@PostMapping(value = "send-email")
	public ResponseEntity sendMail(@RequestBody String input) {
		try {
			Type type = new TypeToken<Map<String, String>>() {
			}.getType();
			Map<String, String> json = gson.fromJson(input, type);
			String email = json.get("email");
			String status = json.get("status");
			String comments = json.get("comments");
			if (email == "" || email == null) {
				return new ResponseEntity<>("Email can not be empty", HttpStatus.BAD_REQUEST);
			}
			if (status == "" || status == null)
				return new ResponseEntity<>("There is no status to update to user.", HttpStatus.BAD_REQUEST);

			this.service.sendEmail(email, status, comments);
		} catch (DMSException dmsEx) {
			System.out.println(dmsEx.getMessage());
			return new ResponseEntity<>(dmsEx.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
		} catch (Exception ex) {
			System.out.println(ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping(value = "/save-diet-plan")
	public @ResponseBody Dietplan saveDietPlan(@RequestParam("file") MultipartFile file,@RequestParam("batchid") String batchid,
			HttpServletResponse response) throws IOException {
		try {
			//String batchid ="Batch1";
			System.out.println("Diet Plan received for : saveDietPlan :" + file+" batchid : "+batchid);
			Type type = new TypeToken<Map<String, List<File>>>() {
			}.getType();
			// Map<String, File> json = gson.fromJson(plan, type);
			// File planFile = (File) formData.get("file");
			response.setStatus(HttpServletResponse.SC_CREATED);
			return this.service.addDietPlan(null);
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return null;
	}
	
	@PostMapping(value = "update-user")
	public Users updateUser(@RequestBody String input,HttpServletResponse response) throws IOException {
		try {
			Type type = new TypeToken<Map<String, String>>() {
			}.getType();
			Map<String, String> json = gson.fromJson(input, type);
			String email = json.get("email");
			String userid = json.get("userid");
			String mobile = json.get("mobile");
			String name = json.get("fullName");
			if (email == "" || email == null || userid == "" || userid == null) 
				response.sendError(HttpServletResponse.SC_BAD_REQUEST, "User details can not be empty");			
			return this.service.updateUser(email, userid, name,mobile);
		} catch (Exception ex) {
			System.out.println(ex);
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,ex.getMessage());
		}
		return null;
	}
	
	@PostMapping(value = "/save-daily-userlog")
	public DailyLog saveDailyUserlog(@RequestBody DailyLog log, HttpServletResponse response) throws IOException {
		try {
			response.setStatus(HttpServletResponse.SC_CREATED);
			return this.service.saveDailyUserlog(log);
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return null;
	}
	
	@PostMapping(value = "/save-monthly-measurementlog")
	public MonthlyMeasurement saveMonthlyUserlog(@RequestBody MonthlyMeasurement log, HttpServletResponse response) throws IOException {
		try {
			response.setStatus(HttpServletResponse.SC_CREATED);
			return this.service.saveMonthlyUserlog(log);
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return null;
	}
	
	@GetMapping(value = "/get-daily-userlog")
	public List<DailyLog> getDailyLogs(HttpServletResponse response) throws IOException {
		try {
			response.setStatus(HttpServletResponse.SC_OK);
			return this.service.getDailyLogs();
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return Collections.EMPTY_LIST;
	}
	@GetMapping(value = "/get-monthly-userlog")
	public List<MonthlyMeasurement> getMonthlyLogs(HttpServletResponse response) throws IOException {
		try {
			response.setStatus(HttpServletResponse.SC_OK);
			return this.service.getMonthlyLogs();
		} catch (Exception ex) {
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, ex.getMessage());
			System.out.println(ex);
		}
		return Collections.EMPTY_LIST;
	}


}