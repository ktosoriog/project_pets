package co.com.pets.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

	private static final String KEY_MESSAGE = "message";
	private static final String KEY_TIMESTAMP = "timestamp";
	private static final String ERROR_KEY = "Error";

	@ExceptionHandler(ObjetoNoEncontradoException.class)
	public ResponseEntity<Object> handleObjetoNoEncontradoException(ObjetoNoEncontradoException ex) {
		log.error(ERROR_KEY, ex);
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(Map.of(KEY_MESSAGE, ex.getMessage(), KEY_TIMESTAMP, System.currentTimeMillis()));
	}

	@ExceptionHandler(OperacionInvalidaException.class)
	public ResponseEntity<Object> handleOperacionInvalidaException(OperacionInvalidaException ex) {
		log.error(ERROR_KEY, ex);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(Map.of(KEY_MESSAGE, ex.getMessage(), KEY_TIMESTAMP, System.currentTimeMillis()));
	}

	@ExceptionHandler(NoAutorizadoException.class)
	public ResponseEntity<Object> handleNoAutorizadoException(NoAutorizadoException ex) {
		log.error(ERROR_KEY, ex);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(Map.of(KEY_MESSAGE, ex.getMessage(), KEY_TIMESTAMP, System.currentTimeMillis()));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleGenericException(Exception ex) {
		log.error(ERROR_KEY, ex);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
				Map.of(KEY_MESSAGE, "Ha ocurrido un error inesperado", KEY_TIMESTAMP, System.currentTimeMillis()));
	}
}
