package co.com.pets.util;

import java.util.HashMap;
import java.util.Map;

public class ResetTokenStore {

	private ResetTokenStore() {
		throw new IllegalStateException("Utility class ResetTokenStore");
	}

	private static final Map<String, String> TOKENS = new HashMap<>();

	public static void guardarToken(String token, String correo) {
		TOKENS.put(token, correo);
	}

	public static String obtenerCorreoPorToken(String token) {
		return TOKENS.get(token);
	}

	public static void eliminarToken(String token) {
		TOKENS.remove(token);
	}
}
