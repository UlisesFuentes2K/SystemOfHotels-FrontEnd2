import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { User } from '../../Models/user';

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
  constructor(private userService:UserService, private router:Router){}

  ngOnInit(): void {
    const Id = localStorage.getItem("Id") || "0";
      this.userService.getOneUser(Id).subscribe({
        next:(data) => {
          this.user = data;
          console.log("Los datos son: ", this.user);},
        error:(error) => {
          console.error("Error al obtener los datos", error);
        }
      })
  }

  public regresar(){
    this.router.navigate(['user']);
  }
}
