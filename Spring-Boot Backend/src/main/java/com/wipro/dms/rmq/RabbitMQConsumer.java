package com.wipro.dms.rmq;


public class RabbitMQConsumer {

	public void handleMessage(String message) {
		try {
			System.out.println(" receive message [" + message + "] ");
		} catch (Exception ex) {
			System.out.println(" RabbitMQConsumer exception " + ex);
		}
	}

}
