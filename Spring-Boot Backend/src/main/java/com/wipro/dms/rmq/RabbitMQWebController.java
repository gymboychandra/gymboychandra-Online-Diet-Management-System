package com.wipro.dms.rmq;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/rabbitmq")
public class RabbitMQWebController {
	private Gson gson;

	@Autowired
	RabbitMQService rabbitMQService;
	
	public RabbitMQWebController() {
		gson = new Gson();
	}

	@PostMapping(value = "/publish")
	public ResponseEntity<String> publish(@RequestBody String input) {
		try {
			Type type = new TypeToken<Map<String, Object>>() {
			}.getType();
			Map<String, Object> json = gson.fromJson(input, type);
			List<String> receiver = (List<String>) json.get("receiverid");
			String message = json.get("message").toString();
			if (receiver == null || receiver.isEmpty()) {
				return new ResponseEntity<>("Receiver can not be empty", HttpStatus.BAD_REQUEST);
			}	
			this.rabbitMQService.send(receiver.get(0), message);
		} catch (Exception ex) {
			System.out.println(ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	@PostMapping(value = "/check-messages")
	public ResponseEntity<String> subscribe(@RequestBody String input) {
		try {
			Type type = new TypeToken<Map<String, String>>() {
			}.getType();
			Map<String, String> json = gson.fromJson(input, type);
			String receiver = json.get("userid");
			if (receiver == null || receiver.isEmpty()) {
				return new ResponseEntity<>("Receiver can not be empty", HttpStatus.BAD_REQUEST);
			}	
			this.rabbitMQService.read(receiver);
		} catch (Exception ex) {
			System.out.println(ex);
			return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
			
}
