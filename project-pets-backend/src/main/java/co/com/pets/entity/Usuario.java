package co.com.pets.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "USUARIO")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idUsuario")
	private Integer idUsuario;

	@Column(name = "Correo", nullable = false)
	private String correo;

	@Column(name = "Clave", nullable = false)
	private String clave;

	@Column(name = "NomUsuario")
	private String nomUsuario;

	@Column(name = "ApeUsuario")
	private String apeUsuario;

	@ManyToOne
	@JoinColumn(name = "idRol")
	private Rol rol;

	public Integer getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Integer idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}

	public String getClave() {
		return clave;
	}

	public void setClave(String clave) {
		this.clave = clave;
	}

	public String getNomUsuario() {
		return nomUsuario;
	}

	public void setNomUsuario(String nomUsuario) {
		this.nomUsuario = nomUsuario;
	}

	public String getApeUsuario() {
		return apeUsuario;
	}

	public void setApeUsuario(String apeUsuario) {
		this.apeUsuario = apeUsuario;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}
}
