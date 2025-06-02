import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { User } from '../../Models/user';
import { ActivatedRoute } from '@angular/router';
import { CambioPasswordComponent } from '../cambio-password/cambio-password.component';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, CambioPasswordComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  public user: User | null = null;
  public isEditing = false;
  public data:any={isActive:false, id:"0"};
  public id: any;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const Id = params['id'];
      this.id = Id;
    }) 

    this.userService.getOneUser(this.id).subscribe({
      next: (data) => {
        this.user = data;
        console.log("Los datos son: ", this.user);
      },
      error: (error) => {
        console.error("Error al obtener los datos", error);
      }
    })
  }

  cancelar() {
    this.isEditing = false;
  }

  guardarDatos() {
    this.userService.putUser(this.user).subscribe({
      next: (data) => {
        console.log("datos enviados: ", data);
        this.isEditing = false;
      },
      error: (error) => { console.error("Error al enviar los datos: ", error); }
    })
  }

  desactivarUser() {
    if(this.user){
      this.data.id= this.user.id || null;
      if (!this.data.isActive) {
      this.userService.activeUser(this.data).subscribe({
        next: (data) => { console.log("datos enviados: ", data); },
        error: (error) => { console.error("Error al enviar los datos: ", error); }
      })
    }
    }
  }

  cambiarPassword(id:string) {
    localStorage.setItem("idUserChange", id);
  }

  editarDatos() {
    this.isEditing = true;
  }

  public regresar() {
    this.router.navigate(['user']);
  }

  isAdmin(): boolean {
    const rol = localStorage.getItem('rol');
    if (rol !== "Admin") return false;

    return true;
  }
}
