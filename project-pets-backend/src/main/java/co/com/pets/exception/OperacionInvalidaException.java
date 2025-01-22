package co.com.pets.exception;

public class OperacionInvalidaException extends RuntimeException {

	private static final long serialVersionUID = 6001150646689342243L;

	public OperacionInvalidaException(String message) {
		super(message);
	}
}