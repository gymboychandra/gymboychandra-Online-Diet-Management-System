package com.wipro.dms.commons;

import javax.servlet.MultipartConfigElement;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.wipro.dms.service.DietManagementService;
import com.wipro.dms.service.DietManagementServiceImpl;

@Configuration
@ComponentScan(value = { "com.wipro.dms.service" })
public class DIConfiguration {

	@Bean
	public DietManagementService getDietManagementService() {
		return new DietManagementServiceImpl();
	}
	 @Bean
	    public WebMvcConfigurer corsConfigurer() {
	        return new WebMvcConfigurerAdapter(){
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry.addMapping("/**");
	            }
	        };
	    }
}
