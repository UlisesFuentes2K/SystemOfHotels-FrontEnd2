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
      this.userService.validateUser(this.sesion).subscribe({
        next: (data) => {
          console.log("Proceso exitoso", data);
          if (data === true) {
            this.router.navigate(['home']);
          } else {
            console.error("Usuario no validado");
            this.alertFailed();
          }
        },
        error: (error) => {
          console.error("Error al obtener respuesta de validación", error);
        }
      })
    }
  
    private alertFailed() {
      Swal.fire({
        title: '¡Error!',
        text: 'Credenciales incorrectas o no posees una cuenta registrada cuenta.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
    }
}
