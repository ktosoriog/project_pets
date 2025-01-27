package co.com.pets.util;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

	private long expiration = 3600000;

	public String generarToken(String correo, String rol, Integer idUsuario) {
		return Jwts.builder().setSubject(correo).claim("rol", rol).claim("idUsuario", idUsuario).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + expiration)).signWith(secretKey).compact();
	}

	public boolean validarToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token);
			return true;
		} catch (JwtException e) {
			return false;
		}
	}

	public String obtenerCorreo(String token) {
		return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
	}

	public String obtenerRol(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
		return claims.get("rol", String.class);
	}

	public Integer obtenerIdUsuario(String token) {
		Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
		return claims.get("idUsuario", Integer.class);
	}

}
