package co.com.pets.entity;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "mascota")
public class Mascota {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idMascota")
	private Integer idMascota;

	@Column(name = "NomMascota", nullable = false)
	private String nomMascota;

	@Column(name = "FechaNacimiento")
	@Temporal(TemporalType.DATE)
	private Date fechaNacimiento;

	@ManyToOne
	@JoinColumn(name = "idRaza", nullable = false)
	private Raza raza;

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

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public Raza getRaza() {
		return raza;
	}

	public void setRaza(Raza raza) {
		this.raza = raza;
	}
}
