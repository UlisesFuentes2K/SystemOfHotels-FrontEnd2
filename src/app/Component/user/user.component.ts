import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { User } from '../../Models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  public user: User | null = null;
  public isEditing = false;
  public data:any;
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
    if (this.user) {
      this.data.isActive = false;
      this.data.id= this.user.id;

      if (!this.data.isActive) {
        this.userService.activeUser(this.data).subscribe({
          next: (data) => { console.log("datos enviados: ", data); },
          error: (error) => { console.error("Error al enviar los datos: ", error); }
        })
      }
    }
  }

  cambiarPassword() {
    this.userService.changePassWord(this.user).subscribe({
      next: (data) => { console.log("datos enviados: ", data); },
      error: (error) => { console.error("Error al enviar los datos: ", error); }
    })
  }

  editarDatos() {
    this.isEditing = true;
  }

  public regresar() {
    this.router.navigate(['user']);
  }
}
