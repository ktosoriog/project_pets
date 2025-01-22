package co.com.pets.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VetController {

	@GetMapping("/api/vet/dashboard")
	public String vetDashboard() {
		return "Bienvenido, VETERINARIO!";
	}

}
