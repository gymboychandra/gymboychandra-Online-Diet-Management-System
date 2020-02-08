package com.wipro.dms.rmq;

import org.springframework.amqp.rabbit.listener.DirectMessageListenerContainer;

public class DMSDirectMessageListenerContainer extends DirectMessageListenerContainer {

	public void startConsumers() throws Exception {
		super.doStart();
	}
}