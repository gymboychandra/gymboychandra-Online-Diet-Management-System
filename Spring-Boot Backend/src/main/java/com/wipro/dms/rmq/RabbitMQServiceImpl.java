package com.wipro.dms.rmq;

import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Queue;
//import com.rabbitmq.client.AMQP.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Service
public class RabbitMQServiceImpl implements RabbitMQService {

	@Autowired
	private AmqpTemplate rabbitMqTemplate;

	@Autowired
	private AmqpAdmin admin;

	@Value("${dms.rabbitmq.exchange}")
	private String exchange;

	//@Value("${dms.rabbitmq.routingkey}")
	//private String routingkey;

	@Override
	public void send(String receiver, String message)  throws Exception{
		// default exchange -> exchange,routing key,message
		Queue queue = new Queue("queue_" + receiver, true, false, false);
		Binding binding = new Binding("queue_" + receiver, Binding.DestinationType.QUEUE,exchange, receiver, null);
		admin.declareQueue(queue);
		admin.declareBinding(binding);
		getRabbitTemplate(receiver).convertAndSend(message);
		System.out.println("Send msg : " + message + " to : " + receiver);
	}
	
	 public RabbitTemplate getRabbitTemplate(String receiver) {
		RabbitTemplate template = new RabbitTemplate(RabbitMQConfig.rabbitConnectionFactory);
		//The routing key is set to the name of the queue by the broker for the default exchange.
		template.setRoutingKey(receiver);
		//Where we will synchronously receive messages from
		template.setExchange(exchange);
		template.setQueue("queue_"+receiver);
		template.setMessageConverter(RabbitMQConfig.messageconverter);
		return template;
		}

	@Override
	public void read(String receiver) throws Exception{
		new RabbitMQConsumerConfig("queue_"+receiver,receiver,1);
	}

}
