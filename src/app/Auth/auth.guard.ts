import { CanActivateFn, Router} from '@angular/router';
import { Inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = Inject(Router);
  const token = localStorage.getItem("token");
  console.log(token);
  if(!token){
    router.navigate(['login'])
    return false;
  }
  return true;
};
