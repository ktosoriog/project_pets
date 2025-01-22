package co.com.pets.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import co.com.pets.service.impl.DetallesUsuarioService;
import co.com.pets.util.JwtFiltro;

@Configuration
@EnableWebSecurity
public class ConfigSecurity {

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

	public DaoAuthenticationProvider authProvider() {
		DaoAuthenticationProvider authProv = new DaoAuthenticationProvider();
		authProv.setUserDetailsService(detallesUsuarioService);
		authProv.setPasswordEncoder(passwordEncoder());
		return authProv;
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(auth -> {
			auth.requestMatchers("/api/admin/**").hasRole("ADMINISTRADOR");
			auth.requestMatchers("/api/vet/**").hasRole("VETERINARIO");
			auth.requestMatchers("/api/cliente/**").hasRole("CLIENTE");
			auth.requestMatchers("/api/auth/**").permitAll();
			auth.anyRequest().authenticated();
		}).authenticationProvider(authProvider()).addFilterBefore(jwtFiltro, UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling(exceptionHandling -> exceptionHandling
						.authenticationEntryPoint(customAuthenticationEntryPoint));
		return http.build();
	}
}
