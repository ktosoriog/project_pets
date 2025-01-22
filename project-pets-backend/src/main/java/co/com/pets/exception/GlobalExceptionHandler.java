package co.com.pets.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

	private static final String KEY_MESSAGE = "message";
	private static final String KEY_TIMESTAMP = "timestamp";

	@ExceptionHandler(ObjetoNoEncontradoException.class)
	public ResponseEntity<Object> handleObjetoNoEncontradoException(ObjetoNoEncontradoException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(Map.of(KEY_MESSAGE, ex.getMessage(), KEY_TIMESTAMP, System.currentTimeMillis()));
	}

	@ExceptionHandler(OperacionInvalidaException.class)
	public ResponseEntity<Object> handleOperacionInvalidaException(OperacionInvalidaException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(Map.of(KEY_MESSAGE, ex.getMessage(), KEY_TIMESTAMP, System.currentTimeMillis()));
	}

	@ExceptionHandler(NoAutorizadoException.class)
	public ResponseEntity<Object> handleNoAutorizadoException(NoAutorizadoException ex) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(Map.of(KEY_MESSAGE, ex.getMessage(), KEY_TIMESTAMP, System.currentTimeMillis()));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleGenericException(Exception ex) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
				Map.of(KEY_MESSAGE, "Ha ocurrido un error inesperado", KEY_TIMESTAMP, System.currentTimeMillis()));
	}
}
