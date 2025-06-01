import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../../Models/person';
import { PersonService } from '../../Services/person.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent implements OnInit{
   public person:Person | null = null;
  public isEditing = false;
  idPerson:number = -1;

  constructor(private personService:PersonService, private router:Router, private route:ActivatedRoute){ }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
    const Id = params['id'];
      this.idPerson = Id;
    })

    console.log("El idPerson es: ", this.idPerson);
    this.personService.getOneData(this.idPerson).subscribe({
      next:(data) =>{this.person = data; console.log("Los datos de person son", this.person);},
      error:(error)=>{console.error("Error al obtener los datos: ", error)}
    })
  }

  guardarDatos(){
    this.personService.putData(this.person).subscribe({
      next:(data)=>{
        console.log("datos enviados: ", data);
        this.isEditing = false;
      },
      error:(error)=>{console.error("Error al enviar los datos: ", error);}
    })
  }

  public editar(){ 
    this.isEditing = true;
  }

  cancelar(){
    this.isEditing = false;
  }
}
