import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cambio-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cambio-password.component.html',
  styleUrl: './cambio-password.component.css'
})
export class CambioPasswordComponent {
    public cambio: any = {passwordHash :'', email:'', id:""};
    public confirmed:String ="";

    constructor(private userService: UserService, private router: Router) { }

    onPassword() {
        if(this.confirmed !== this.cambio.passwordHash){
          Swal.fire('Error', 'Las contraseñas no son iguales', 'error');
          return false;
        }
        return true;
      }

      Alera(){
          Swal.fire({
          title: '¡Perfecto!',
          text: 'Todo ha salido bien.',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
          showClass: {
              popup: 'animate__animated animate__bounceIn'
          }
      });
    }
    
      enviarDatos(){
        if(this.onPassword()){
          this.cambio.id = localStorage.getItem("idUserChange")|| null;

          this.userService.changePassWord(this.cambio).subscribe({
            next:() =>{
              console.log("Datos enviados con exito");
              this.Alera();
              this.router.navigateByUrl(this.router.url);
            },
            error:(error) => {console.error("Error al enviar los datos", error);}
          })
        }
        console.log("Los datos son:", this.cambio);
      }
    
}
