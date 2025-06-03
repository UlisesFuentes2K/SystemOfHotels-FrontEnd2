import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Person } from '../../Models/person';
import { PersonService } from '../../Services/person.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../Services/register.service';
import { Register } from '../../Models/register';
import { City } from '../../Models/city';
import Swal from 'sweetalert2';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { CambioPasswordComponent } from '../cambio-password/cambio-password.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, CambioPasswordComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit{
  public person:Person | null = null;
    public user: User | null = null; 
    public data:any={isActive:false, id:"0"};
    public register:Register | null = null;
    public cityfilter:City[] = []; 
    public confirmedPassword:string = "";
    public idCountry:number= 0;
    public isEditing = false;
    idPerson:number = -1;
    rol:string="";
  
    constructor(private registerService:RegisterService, private personService:PersonService, 
      private router:Router, private route:ActivatedRoute, private userService: UserService){ }
  
    public ngOnInit(): void {
      this.route.params.subscribe((params) => {
      const Id = params['id'];
        this.idPerson = Id;
      })
      
      this.personService.getOneData(this.idPerson).subscribe({
        next:(data) =>{
          this.datosRegistro();
          this.person = data; 
          this.rol = localStorage.getItem('rol') || "";
          if (this.person?.city?.idCountry) {
          this.idCountry = this.person.city.idCountry;
          }},
        error:(error)=>{console.error("Error al obtener los datos: ", error)}
      }) 
      
    }
  
    Alerta(){
            Swal.fire({
            title: '¡Perfecto!',
            text: 'Perfil actualizado correctamente.',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            }
        });
      }
  
    guardarDatos(){
      this.personService.putData(this.person).subscribe({
        next:(data)=>{
          if (typeof data === 'string') {
            this.alertFailed(data);
          }
          this.Alerta()
          this.isEditing = false;
          window.location.reload();
        },
        error:(error)=>{console.error("Error al enviar los datos: ", error);}
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
  
    public editarDatos(){ 
      this.isEditing = true;
    }
  
    cancelar(){
      this.isEditing = false;
    }
  
    datosRegistro(){
      this.registerService.getRegister().subscribe({
        next:(data) => {
          this.register = data;
          this.onCountryChange(this.idCountry);
        },
        error:(error) => {console.error("Error al obtener los datos", error);}
      })
    }
  
    onCountryChange(idCountry:number) {
        this.cityfilter = this.register?.city.filter(x => x.idCountry == idCountry) || [];
    }

    desactivarUser() {
      if(this.person){
        this.data.id= this.person.users.id || null;
        this.data.isActive = !this.person?.users.isActive; 
        console.log("El envio de datos es: ", this.data);
        if (this.data.id != "0") {
        this.userService.activeUser(this.data).subscribe({
          next: (data) => { console.log("datos enviados: ", data)
            this.Alerta();
            window.location.reload();
          },
          error: (error) => { console.error("Error al enviar los datos: ", error); }
        })
      }
      }
    }
  
    cambiarPassword(id:string) {
      localStorage.setItem("idUserChange", id);
    }
  
    isAdmin(): boolean {
    if (this.rol === "Admin"){
      console.log("El rol es:, ", this.rol);
      return true;
    } 
    return false;
  }
}