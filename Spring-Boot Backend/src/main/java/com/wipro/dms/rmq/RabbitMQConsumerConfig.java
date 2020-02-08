package com.wipro.dms.rmq;

import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;

public class RabbitMQConsumerConfig {
	private String queueName;
	private String routingKey;
	private int onOfConsumer;

	public int getOnOfConsumer() {
	return onOfConsumer;
	}

	public void setOnOfConsumer(int onOfConsumer) {
	this.onOfConsumer = onOfConsumer;
	}

	public String getQueueName() {
	return queueName;
	}

	public void setQueueName(String queueName) {
	this.queueName = queueName;
	}

	public String getRoutingKey() {
	return routingKey;
	}

	public void setRoutingKey(String routingKey) {
	this.routingKey = routingKey;
	}

	public RabbitMQConsumerConfig(String queueName, String routingKey, int onOfConsumer) throws Exception {
	this.queueName = queueName;
	this.routingKey = routingKey;
	this.onOfConsumer = onOfConsumer;
	DMSDirectMessageListenerContainer container = new DMSDirectMessageListenerContainer();
	container.setConnectionFactory(RabbitMQConfig.rabbitConnectionFactory);
	container.setQueueNames(this.queueName);
	container.setConsumersPerQueue(this.onOfConsumer);
	container.setMessageListener(new MessageListenerAdapter(new RabbitMQConsumer(), RabbitMQConfig.messageconverter));
	container.startConsumers();
	}

	
}
