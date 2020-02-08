 package com.wipro.dms.commons;

public class DMSException extends Exception{

	private static final long serialVersionUID = 8L;
	
	String message;

	public DMSException(String s) {
		this.message = s;
	}
	
	public String getMessage() {
		return message;
	}
}
