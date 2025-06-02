import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router:Router, private userService:UserService) {}
  
  irProfile(){
    const idPerson = Number(localStorage.getItem("idPerson")) ?? -2;
    this.router.navigate([`/profile/${idPerson}`]);
  }

  irEmployee(){
    this.router.navigate(['employee']);
  }

  irCustomer(){
    this.router.navigate(['customer']);
  }

  cerrarSesion(){
    const id = localStorage.getItem("Id") || "0";

    this.userService.logoutUser(id).subscribe({
      next:()=>{this.router.navigate(['login']);
        console.log(localStorage.getItem("token"));
      },
      error:(error)=>{console.error("Error al cerrar la sesión", error);}
    })
  }

  isAdmin(): boolean {
    const rol = localStorage.getItem('rol');
    if (rol !== "Admin") return false;

    return true;
  }
}
