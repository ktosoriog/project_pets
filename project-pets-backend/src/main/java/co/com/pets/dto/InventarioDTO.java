package co.com.pets.dto;

import java.util.Date;

public class InventarioDTO {

	private Integer idInventario;
	private String codigoProducto;
	private String nomProducto;
	private Double precioUnitario;
	private String descripcion;
	private Integer canDisponible;
	private Date ingreso;
	private Date salida;
	private Integer stopMin;

	public Integer getIdInventario() {
		return idInventario;
	}

	public void setIdInventario(Integer idInventario) {
		this.idInventario = idInventario;
	}

	public String getCodigoProducto() {
		return codigoProducto;
	}

	public void setCodigoProducto(String codigoProducto) {
		this.codigoProducto = codigoProducto;
	}

	public String getNomProducto() {
		return nomProducto;
	}

	public void setNomProducto(String nomProducto) {
		this.nomProducto = nomProducto;
	}

	public Double getPrecioUnitario() {
		return precioUnitario;
	}

	public void setPrecioUnitario(Double precioUnitario) {
		this.precioUnitario = precioUnitario;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public Integer getCanDisponible() {
		return canDisponible;
	}

	public void setCanDisponible(Integer canDisponible) {
		this.canDisponible = canDisponible;
	}

	public Date getIngreso() {
		return ingreso;
	}

	public void setIngreso(Date ingreso) {
		this.ingreso = ingreso;
	}

	public Date getSalida() {
		return salida;
	}

	public void setSalida(Date salida) {
		this.salida = salida;
	}

	public Integer getStopMin() {
		return stopMin;
	}

	public void setStopMin(Integer stopMin) {
		this.stopMin = stopMin;
	}
}
