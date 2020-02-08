package com.wipro.dms.rmq;

public interface RabbitMQService {

	void send(String receiver,String message) throws Exception;

	void read(String receiver) throws Exception;
}
