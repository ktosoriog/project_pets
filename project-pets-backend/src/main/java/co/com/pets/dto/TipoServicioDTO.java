package co.com.pets.dto;

public class TipoServicioDTO {
	private Integer idTipoServ;
	private String nombre;
	private Double precio;
	private String descripcion;

	public Integer getIdTipoServ() {
		return idTipoServ;
	}

	public void setIdTipoServ(Integer idTipoServ) {
		this.idTipoServ = idTipoServ;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
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
