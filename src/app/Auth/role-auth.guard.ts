import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 
  const role = localStorage.getItem("rol");
  if(role !== "Admin"){
    router.navigate(['/home']);
    return false;
  }
  return true;
};
