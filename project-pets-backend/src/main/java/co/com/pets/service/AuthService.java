package co.com.pets.service;

import co.com.pets.dto.LoginRequestDTO;
import co.com.pets.dto.LoginResponseDTO;

public interface AuthService {

	LoginResponseDTO login(LoginRequestDTO loginRequestDTO);

}
