package co.com.pets.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // Permitir todas las rutas
				.allowedOrigins("*") // Permitir cualquier origen
				.allowedMethods("*") // Permitir cualquier método HTTP
				.allowedHeaders("*") // Permitir cualquier encabezado
				.allowCredentials(false); // No permite credenciales (puedes cambiar a true si lo necesitas)
	}
}