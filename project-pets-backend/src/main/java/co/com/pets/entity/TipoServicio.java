package co.com.pets.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tiposervicio")
public class TipoServicio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idTipoServ")
	private Integer idTipoServ;

	@Column(name = "NomBreServ", nullable = false)
	private String nombreServ;

	@Column(name = "Precio", nullable = false)
	private Double precio;

	@Column(name = "Descripcion", nullable = false)
	private String descripcion;

	public Integer getIdTipoServ() {
		return idTipoServ;
	}

	public void setIdTipoServ(Integer idTipoServ) {
		this.idTipoServ = idTipoServ;
	}

	public String getNombreServ() {
		return nombreServ;
	}

	public void setNombreServ(String nombreServ) {
		this.nombreServ = nombreServ;
	}

	public Double getPrecio() {
		return precio;
	}

	public void setPrecio(Double precio) {
		this.precio = precio;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
}
