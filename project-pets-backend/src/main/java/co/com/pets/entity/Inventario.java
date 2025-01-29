package co.com.pets.entity;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "inventario")
public class Inventario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idInventario;

	@Column(name = "CodigoProducto", length = 45)
	private String codigoProducto;

	@Column(name = "NomProducto", length = 45)
	private String nomProducto;

	@Column(name = "PrecioUnitario")
	private Double precioUnitario;

	@Column(name = "Descripcion", length = 255)
	private String descripcion;

	@Column(name = "CanDisponible")
	private Integer canDisponible;

	@Temporal(TemporalType.DATE)
	@Column(name = "Ingreso")
	private Date ingreso;

	@Temporal(TemporalType.DATE)
	@Column(name = "Salida")
	private Date salida;

	@Column(name = "StopMin")
	private Integer stopMin;

	// Getters y Setters

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
