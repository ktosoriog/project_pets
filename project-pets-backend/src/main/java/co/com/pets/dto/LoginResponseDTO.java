package co.com.pets.dto;

public class LoginResponseDTO {

	private String token;
	private String correo;
	private String rol;
	private Integer idUsuario;
	private String nombreUsuario;

	public LoginResponseDTO(String token, String correo, String rol, Integer idUsuario, String nombreUsuario) {
		super();
		this.token = token;
		this.correo = correo;
		this.rol = rol;
		this.idUsuario = idUsuario;
		this.nombreUsuario = nombreUsuario;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getRol() {
		return rol;
	}

	public void setRol(String rol) {
		this.rol = rol;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNombreUsuario() {
		return nombreUsuario;
	}

	public void setNombreUsuario(String nombreUsuario) {
		this.nombreUsuario = nombreUsuario;
	}

}
