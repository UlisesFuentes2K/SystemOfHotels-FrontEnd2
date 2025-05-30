import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../../Models/person';
import { PersonService } from '../../Services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  public person:Person | null = null;
  public isEditing = false;

  constructor(private personService:PersonService, private router:Router){ }

  public ngOnInit(): void {
    const idPerson = 8;
    this.personService.getOneData(idPerson).subscribe({
      next:(data) =>{this.person = data; console.log("Los datos de person son", this.person);},
      error:(error)=>{console.error("Error al obtener los datos: ", error)}
    })
  }

  public editar(){

  }

  public adminCuenta(){
    
  }
}
