package co.com.pets.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "raza")
public class Raza {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idRaza;

	@Column(name = "NomRaza")
	private String nomRaza;

	@ManyToOne
	@JoinColumn(name = "idEspecie")
	private Especie especie;

	@Column(name = "Descripcion")
	private String descripcion;

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

	public Especie getEspecie() {
		return especie;
	}

	public void setEspecie(Especie especie) {
		this.especie = especie;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
}
