package co.com.pets.exception;

public class ObjetoNoEncontradoException extends RuntimeException {

	private static final long serialVersionUID = 2987232949527611358L;

	public ObjetoNoEncontradoException(String message) {
		super(message);
	}
}