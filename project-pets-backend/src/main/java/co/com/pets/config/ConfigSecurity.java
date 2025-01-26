package co.com.pets.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import co.com.pets.service.impl.DetallesUsuarioService;
import co.com.pets.util.JwtFiltro;

@Configuration
@EnableWebSecurity
public class ConfigSecurity {

	@Value("${frontend.url}")
	private String frontendUrl;
	private final DetallesUsuarioService detallesUsuarioService;
	private final JwtFiltro jwtFiltro;
	private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

	public ConfigSecurity(DetallesUsuarioService detallesUsuarioService, JwtFiltro jwtFiltro,
			CustomAuthenticationEntryPoint customAuthenticationEntryPoint) {
		this.detallesUsuarioService = detallesUsuarioService;
		this.jwtFiltro = jwtFiltro;
		this.customAuthenticationEntryPoint = customAuthenticationEntryPoint;
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	DaoAuthenticationProvider authProvider() {
		DaoAuthenticationProvider authProv = new DaoAuthenticationProvider();
		authProv.setUserDetailsService(detallesUsuarioService);
		authProv.setPasswordEncoder(passwordEncoder());
		return authProv;
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable());
		http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers("/api/auth/**").permitAll();
			auth.requestMatchers("/api/admin/**").hasRole("ADMINISTRADOR");
			auth.requestMatchers("/api/vet/**").hasRole("VETERINARIO");
			auth.requestMatchers("/api/cliente/**").hasRole("CLIENTE");
			auth.anyRequest().authenticated();
		}).addFilterBefore(jwtFiltro, UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling(exceptions -> exceptions.authenticationEntryPoint(customAuthenticationEntryPoint))
				.authenticationProvider(authProvider()).httpBasic(Customizer.withDefaults());
		return http.build();
	}

	private UrlBasedCorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(List.of(frontendUrl));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Accept", "Origin"));
		config.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
}
