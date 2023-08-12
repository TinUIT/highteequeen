package com.highteequeen.highteequeen_backend;

import com.highteequeen.highteequeen_backend.DTO.RegisterRequest;
import com.highteequeen.highteequeen_backend.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.highteequeen.highteequeen_backend.entity.Role.ADMIN;
import static com.highteequeen.highteequeen_backend.entity.Role.MANAGER;

@SpringBootApplication
public class HighteequeenBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(HighteequeenBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service
	) {
		return args -> {
			var admin = RegisterRequest.builder()
					.firstname("Admin")
					.lastname("Admin")
					.email("admin@mail.com")
					.password("password")
					.role(ADMIN)
					.build();
			System.out.println("Admin token: " + service.register(admin).getAccessToken());

			var manager = RegisterRequest.builder()
					.firstname("Admin")
					.lastname("Admin")
					.email("manager@mail.com")
					.password("password")
					.role(MANAGER)
					.build();
			System.out.println("Manager token: " + service.register(manager).getAccessToken());

		};
	}
}
