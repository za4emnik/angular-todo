import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Router } from '@angular/router';

@Injectable()
export class TodosGuardService implements CanActivate {

  constructor(private router: Router, private tokenAuthSerivce:Angular2TokenService) { }

  canActivate() {
    if (this.tokenAuthSerivce.userSignedIn()){
      return true;
    }else{
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
