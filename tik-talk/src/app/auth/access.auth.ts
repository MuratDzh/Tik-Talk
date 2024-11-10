import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { CanActivateFn, Router } from "@angular/router"
import { Subscription } from "rxjs"

export const canActivateAuth:CanActivateFn = ()=>{
    // const isLoggedIn=inject(AuthService).token1

    if(!!document.cookie){
        console.log(document.cookie)
        return true
    }

    // if(!isLoggedIn){
    //     console.log(document.cookie)
    //     return true
    // }

    return inject(Router).createUrlTree(['/login'])
}