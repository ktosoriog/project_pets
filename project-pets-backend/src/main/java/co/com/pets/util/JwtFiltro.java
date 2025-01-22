package co.com.pets.util;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import co.com.pets.service.impl.DetallesUsuarioService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtFiltro extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	private final DetallesUsuarioService detallesUsuarioService;

	public JwtFiltro(JwtUtil jwtUtil, DetallesUsuarioService detallesUsuarioService) {
		this.jwtUtil = jwtUtil;
		this.detallesUsuarioService = detallesUsuarioService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws IOException, jakarta.servlet.ServletException {
		final String authHeader = request.getHeader("Authorization");
		String correo = null;
		String jwtToken = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			jwtToken = authHeader.substring(7);
			try {
				correo = jwtUtil.obtenerCorreo(jwtToken);
			} catch (ExpiredJwtException e) {
				log.error("Token expirado");
			} catch (Exception e) {
				log.error("Token inválido");
			}
		}
		if (correo != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = detallesUsuarioService.loadUserByUsername(correo);
			if (jwtUtil.validarToken(jwtToken)) {
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
						null, userDetails.getAuthorities());

				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}
		filterChain.doFilter(request, response);
	}

}