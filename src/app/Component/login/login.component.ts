import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' 
})
export class LoginComponent {
  public sesion: any = { Email: "", PasswordHash: ""};
    constructor(private userService: UserService, private router: Router) { }
  
    public login() {
      this.AlertaCargando();
      this.userService.validateUser(this.sesion).subscribe({
        next: (data) => {
          Swal.close();
          console.log("Proceso exitoso", data);
          if (data === "OK") {
            this.router.navigate(['home']);
          } else {
          Swal.close();
            this.alertFailed(data);
          }
        },
        error: (error) => {
          Swal.close();
          console.error("Error al obtener respuesta de validación", error);
        }
      })
    }
  
    private alertFailed(error:string){
      console.log("Error es: ", error);
      Swal.fire({
        title: '¡Error!',
        text: `${error}`,
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
    }

    private AlertaCargando() {
    Swal.fire({
        title: 'Cargando...',
        text: 'Por favor, espera mientras verificamos sus credenciales',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
  }
}
