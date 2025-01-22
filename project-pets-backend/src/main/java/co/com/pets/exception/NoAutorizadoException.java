package co.com.pets.exception;

public class NoAutorizadoException extends RuntimeException {

	private static final long serialVersionUID = 8086201597461507729L;

	public NoAutorizadoException(String message) {
		super(message);
	}
}