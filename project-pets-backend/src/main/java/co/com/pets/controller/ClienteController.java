package co.com.pets.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ClienteController {

	@GetMapping("/api/cliente/dashboard")
	public String clienteDashboard() {
		return "Bienvenido, CLIENTE!";
	}

}
