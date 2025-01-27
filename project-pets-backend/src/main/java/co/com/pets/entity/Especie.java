package co.com.pets.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "especie")
public class Especie {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idEspecie;

	@Column(name = "NomEspecie")
	private String nomEspecie;

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
}
