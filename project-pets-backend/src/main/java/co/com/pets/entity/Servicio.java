package co.com.pets.entity;

import java.util.Date;
import jakarta.persistence.*;

@Entity
@Table(name = "servicio")
public class Servicio {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idServicio;

	@Temporal(TemporalType.DATE)
	private Date fechaServ;

	@Column(length = 5)
	private String horaServicio;

	@Column(length = 20) // "PENDIENTE", "ACEPTADO", etc.
	private String estado;

	// Relación a la mascota
	@ManyToOne
	@JoinColumn(name = "idMascota")
	private Mascota mascota;

	// Quien lo solicita
	@ManyToOne
	@JoinColumn(name = "idCliente")
	private Usuario cliente;

	// Quien lo atiende
	@ManyToOne
	@JoinColumn(name = "idVet")
	private Usuario vet;

	// Tipo de servicio
	@ManyToOne
	@JoinColumn(name = "idTipoServ")
	private TipoServicio tipoServicio;

	@Column(columnDefinition = "TEXT")
	private String description;

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

	public Mascota getMascota() {
		return mascota;
	}

	public void setMascota(Mascota mascota) {
		this.mascota = mascota;
	}

	public Usuario getCliente() {
		return cliente;
	}

	public void setCliente(Usuario cliente) {
		this.cliente = cliente;
	}

	public Usuario getVet() {
		return vet;
	}

	public void setVet(Usuario vet) {
		this.vet = vet;
	}

	public TipoServicio getTipoServicio() {
		return tipoServicio;
	}

	public void setTipoServicio(TipoServicio tipoServicio) {
		this.tipoServicio = tipoServicio;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
