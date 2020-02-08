package com.wipro.dms.rmq;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;

@Configuration
public class RabbitMQConfig {

	

	@Value("${dms.rabbitmq.exchange}")
	String exchange;

	@Value("${spring.rabbitmq.host}")
	private String host;
	
    @Value("${spring.rabbitmq.port}")
    private int port;

    @Value("${spring.rabbitmq.username}")
    private String username;

    @Value("${spring.rabbitmq.password}")
    private String password;

    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory(host);
        connectionFactory.setUsername(username);
        connectionFactory.setPassword(password);
        rabbitConnectionFactory = connectionFactory;
        return connectionFactory;
    }
	@Bean
	DirectExchange exchange() {
		return new DirectExchange(exchange);
	}

	public static MessageConverter messageconverter;
	
	public static ConnectionFactory rabbitConnectionFactory;

	@Bean
	public AmqpAdmin amqpAdmin() {
		return new RabbitAdmin(rabbitConnectionFactory);
	}

	@Bean
	public MessageConverter jsonMessageConverter() {
		messageconverter = new Jackson2JsonMessageConverter();
		return messageconverter;
	}

	/*@Bean
	public AmqpTemplate rabbitMqTemplate(ConnectionFactory connectionFactory) {
		final RabbitTemplate rabbitTemplate1 = new RabbitTemplate(connectionFactory);
		rabbitTemplate1.setMessageConverter(jsonMessageConverter());
		return rabbitTemplate1;
	}*/
}
