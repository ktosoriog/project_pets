package co.com.pets.constant;

public class MensajesConstant {

	private MensajesConstant() {
		throw new IllegalStateException("Utility class MensajesConstant");
	}

	public static final String USUARIO_NO_ENCONTRADO_EMAIL = "Usuario no encontrado con el correo proporcionado";
	public static final String USUARIO_NO_ENCONTRADO_ID = "Usuario no encontrado con el ID proporcionado";
	public static final String CLAVE_INCORRECTA = "La contraseña proporcionada es incorrecta";
	public static final String TOKEN_INVALIDO = "El token proporcionado no es válido";
	public static final String TOKEN_EXPIRADO = "El token ha expirado o no es válido";

}
