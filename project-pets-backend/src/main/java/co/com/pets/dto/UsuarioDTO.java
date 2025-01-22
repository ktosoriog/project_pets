package co.com.pets.dto;

public class UsuarioDTO {

	private Integer idUsuario;
	private String nombreCompleto;
	private String correo;
	private String rolNombre;
	private String clave;

	public UsuarioDTO() {
	}

	public UsuarioDTO(Integer idUsuario, String nombreCompleto, String correo, String rolNombre) {
		this.idUsuario = idUsuario;
		this.nombreCompleto = nombreCompleto;
		this.correo = correo;
		this.rolNombre = rolNombre;
	}

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNombreCompleto() {
		return nombreCompleto;
	}

	public void setNombreCompleto(String nombreCompleto) {
		this.nombreCompleto = nombreCompleto;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getRolNombre() {
		return rolNombre;
	}

	public void setRolNombre(String rolNombre) {
		this.rolNombre = rolNombre;
	}

	public String getClave() {
		return clave;
	}

	public void setClave(String clave) {
		this.clave = clave;
	}
}
