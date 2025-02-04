package co.com.pets.dto;

import java.util.Date;

public class ServicioDTO {

	private Integer idServicio;
	private Date fechaServ;
	private String horaServicio;
	private String estado; // PENDIENTE, ACEPTADO, EN_CURSO, FINALIZADO, CANCELADO

	private Integer idMascota;
	private String nomMascota;

	private Integer idCliente;
	private String nomCliente;
	private String apeCliente;
	private String identCliente;

	private Integer idVet;
	private String nomVet;
	private String apeVet;

	private Integer idTipoServ;
	private String nomTipoServ;
	private Double precioServ;

	private String description; // descripción u observaciones

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

	public String getHoraServicio() {
		return horaServicio;
	}

	public void setHoraServicio(String horaServicio) {
		this.horaServicio = horaServicio;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public Integer getIdMascota() {
		return idMascota;
	}

	public void setIdMascota(Integer idMascota) {
		this.idMascota = idMascota;
	}

	public String getNomMascota() {
		return nomMascota;
	}

	public void setNomMascota(String nomMascota) {
		this.nomMascota = nomMascota;
	}

	public Integer getIdCliente() {
		return idCliente;
	}

	public void setIdCliente(Integer idCliente) {
		this.idCliente = idCliente;
	}

	public String getNomCliente() {
		return nomCliente;
	}

	public void setNomCliente(String nomCliente) {
		this.nomCliente = nomCliente;
	}

	public String getApeCliente() {
		return apeCliente;
	}

	public void setApeCliente(String apeCliente) {
		this.apeCliente = apeCliente;
	}

	public String getIdentCliente() {
		return identCliente;
	}

	public void setIdentCliente(String identCliente) {
		this.identCliente = identCliente;
	}

	public Integer getIdVet() {
		return idVet;
	}

	public void setIdVet(Integer idVet) {
		this.idVet = idVet;
	}

	public String getNomVet() {
		return nomVet;
	}

	public void setNomVet(String nomVet) {
		this.nomVet = nomVet;
	}

	public String getApeVet() {
		return apeVet;
	}

	public void setApeVet(String apeVet) {
		this.apeVet = apeVet;
	}

	public Integer getIdTipoServ() {
		return idTipoServ;
	}

	public void setIdTipoServ(Integer idTipoServ) {
		this.idTipoServ = idTipoServ;
	}

	public String getNomTipoServ() {
		return nomTipoServ;
	}

	public void setNomTipoServ(String nomTipoServ) {
		this.nomTipoServ = nomTipoServ;
	}

	public Double getPrecioServ() {
		return precioServ;
	}

	public void setPrecioServ(Double precioServ) {
		this.precioServ = precioServ;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
