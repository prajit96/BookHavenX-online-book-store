import {Injectable, inject} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, Router} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";

@Injectable({
    providedIn: "root"
})

class AuthGuard{
  isAuth: boolean = false;
  constructor(private router: Router, private store: Store<AppState>){}
  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean{
      this.store.select( (state)=> state.auth.token).subscribe((token)=>{
        if(token){
          this.isAuth = true
        }
      })
      if(this.isAuth){
          return true;
      }

      this.router.navigate(["/login"]);
      return false;
  }
}

export const authGuards: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean =>{
  return inject(AuthGuard).canActivate(route, state);
}