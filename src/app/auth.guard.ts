import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('seller')){
    return true;
  }
  return true;
  
};

// import{Injectable} from '@angular/core';
// import { ActivatedRouteSnapshot,CanActivate,RouterStateSnapshot,UrlTree } from '@angular/router';
// import{Observable} from 'rxjs';
// import { SellerService } from './services/seller.service';

// export class authGuard implements CanActivate{
//   constructor(private sellerService:SellerService){}
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
//     return this.sellerService.isSellerLoggedIn;
//   }
// }