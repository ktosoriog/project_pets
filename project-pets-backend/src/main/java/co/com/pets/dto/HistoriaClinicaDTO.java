package co.com.pets.dto;

import java.util.Date;

public class HistoriaClinicaDTO {

	private Integer idHistoria;
	private Integer idServicio;
	private Date fechaServ;
	private String detalle;
	private Integer idMascota;
	private String nombreMascota;

	public Integer getIdHistoria() {
		return idHistoria;
	}

	public void setIdHistoria(Integer idHistoria) {
		this.idHistoria = idHistoria;
	}

	public Integer getIdServicio() {
		return idServicio;
	}

	public void setIdServicio(Integer idServicio) {
		this.idServicio = idServicio;
	}

	public Date getFechaServ() {
		return fechaServ;
	}

	public void setFechaServ(Date fechaServ) {
		this.fechaServ = fechaServ;
	}

	public String getDetalle() {
		return detalle;
	}

	public void setDetalle(String detalle) {
		this.detalle = detalle;
	}

	public Integer getIdMascota() {
		return idMascota;
	}

	public void setIdMascota(Integer idMascota) {
		this.idMascota = idMascota;
	}

	public String getNombreMascota() {
		return nombreMascota;
	}

	public void setNombreMascota(String nombreMascota) {
		this.nombreMascota = nombreMascota;
	}
}
