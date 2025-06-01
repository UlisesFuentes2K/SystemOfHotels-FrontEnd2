import { Component,OnInit } from '@angular/core';
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
  public user:User | null = null; 
  public isEditing = false;
  public id:any;
  constructor(private userService:UserService, private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
    const Id = params['id'];
      this.id = Id;
    })

      this.userService.getOneUser(this.id).subscribe({
        next:(data) => {
          this.user = data;
          console.log("Los datos son: ", this.user);},
        error:(error) => {
          console.error("Error al obtener los datos", error);
        }
      })
  }

  obtenerDatos(){

  }

  public regresar(){
    this.router.navigate(['user']);
  }
}
