import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  isAuthenticated = false;
  _authSubscription: any;

  constructor(private _authService: AuthService) {
    this.isAuthenticated = _authService.isAuthenticated;
    this._authSubscription = _authService.isAuthenticatedChange.subscribe((value) => {
      this.isAuthenticated = value;
    });
  }

  ngOnDestroy() {
    this._authSubscription.unsubscribe();
  }

}
