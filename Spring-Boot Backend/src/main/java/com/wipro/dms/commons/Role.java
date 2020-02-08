package com.wipro.dms.commons;

public enum Role {

	ADMIN("admin"), MOTIVATOR("motivator"), CHALLENGER("challenger");

	private String which = null;

	Role(String role) {
		this.which = role;
	}

	public String getRole() {
		return this.which;
	}
}
