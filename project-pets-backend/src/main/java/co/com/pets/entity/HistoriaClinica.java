package co.com.pets.entity;

import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "historiaclinica")
public class HistoriaClinica {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idHistoria;

	@ManyToOne
	@JoinColumn(name = "idServicio")
	private Servicio servicio;

	@Temporal(TemporalType.DATE)
	private Date fechaServ;

	@Column(length = 255)
	private String detalle;

	public Integer getIdHistoria() {
		return idHistoria;
	}

	public void setIdHistoria(Integer idHistoria) {
		this.idHistoria = idHistoria;
	}

	public Servicio getServicio() {
		return servicio;
	}

	public void setServicio(Servicio servicio) {
		this.servicio = servicio;
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
}
