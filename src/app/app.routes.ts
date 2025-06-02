import { Routes } from '@angular/router';
// Importar Componentes
import { LoginComponent } from './Component/login/login.component';
import { RegistroComponent } from './Component/registro/registro.component';
import { CambioPasswordComponent } from './Component/cambio-password/cambio-password.component';
import { PerfilComponent } from './Component/perfil/perfil.component';
import { MenuComponent } from './Component/menu/menu.component';
import { HomeComponent } from './Component/home/home.component';
import { UserComponent } from './Component/user/user.component';
import { CustomerComponent } from './Component/customer/customer.component';
import { EmployeeComponent } from './Component/employee/employee.component';
import { authGuard } from './Auth/auth.guard';
import { roleAuthGuard } from './Auth/role-auth.guard';
//

export const routes: Routes = [
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'change_password', component:CambioPasswordComponent, canActivate:[authGuard]},
    {
        path:'',
        component:MenuComponent,
        children:[
            {path:'profile', component:PerfilComponent, canActivate:[authGuard]},
            {path:'profile/:id', component:PerfilComponent, canActivate:[authGuard]},
            {path:'register', component:RegistroComponent, canActivate:[authGuard]},
            {path:'home', component:HomeComponent, canActivate:[authGuard]},
            {path:'user/:id', component:UserComponent, canActivate:[authGuard]},
            {path:'customer', component:CustomerComponent, canActivate:[authGuard]},
            {path:'employee', component:EmployeeComponent, canActivate:[authGuard]},
        ]
    },
    {path:'**', redirectTo:'login'}
];
