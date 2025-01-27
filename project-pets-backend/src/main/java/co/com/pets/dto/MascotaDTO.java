package co.com.pets.dto;

import java.util.Date;

public class MascotaDTO {
	private Integer idMascota;
	private String nombre; // NomMascota
	private Date fechaNacimiento;

	private Integer idRaza;
	private String nomRaza;
	private Integer idEspecie;
	private String nomEspecie;

	// Dueño
	private Integer idDueno; // idUsuario del dueño
	private String nombreDueno; // Nombre completo
	private String identificacionDueno;

	public Integer getIdMascota() {
		return idMascota;
	}

	public void setIdMascota(Integer idMascota) {
		this.idMascota = idMascota;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public Integer getIdRaza() {
		return idRaza;
	}

	public void setIdRaza(Integer idRaza) {
		this.idRaza = idRaza;
	}

	public String getNomRaza() {
		return nomRaza;
	}

	public void setNomRaza(String nomRaza) {
		this.nomRaza = nomRaza;
	}

	public Integer getIdEspecie() {
		return idEspecie;
	}

	public void setIdEspecie(Integer idEspecie) {
		this.idEspecie = idEspecie;
	}

	public String getNomEspecie() {
		return nomEspecie;
	}

	public void setNomEspecie(String nomEspecie) {
		this.nomEspecie = nomEspecie;
	}

	public Integer getIdDueno() {
		return idDueno;
	}

	public void setIdDueno(Integer idDueno) {
		this.idDueno = idDueno;
	}

	public String getNombreDueno() {
		return nombreDueno;
	}

	public void setNombreDueno(String nombreDueno) {
		this.nombreDueno = nombreDueno;
	}

	public String getIdentificacionDueno() {
		return identificacionDueno;
	}

	public void setIdentificacionDueno(String identificacionDueno) {
		this.identificacionDueno = identificacionDueno;
	}
}
