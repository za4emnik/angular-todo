import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private tokenAuthSerivce:Angular2TokenService) { }

  canActivate() {
    return !this.tokenAuthSerivce.userSignedIn();
  }

}
