import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  inBrowser: boolean;
  loginForm: FormGroup;
  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) { }

  ngOnInit() {
    this.inBrowser = isPlatformBrowser(this.platformId);
    this.loginForm = this.createFormGroupWithBuilder();

    if (this.inBrowser) {
      this.route.queryParams.subscribe((params: Params) => {
        if (Object.keys(params).length) {
          // Facebook Login
          if (params.code && params.state) {
            this.authService.facebookSignIn(params.code)
              .subscribe((params: Params) => {
                this.router.navigate(['/']);
              });
          } else if (params.oauth_token && params.oauth_verifier) {
            // Twitter Login
            this.authService.twitterSignIn(params.oauth_token, params.oauth_verifier)
              .subscribe((params: Params) => {
                this.router.navigate(['/']);
              });
          } else if (params.code) {
            // Google Login
            this.authService.googleSignIn(params.code)
              .subscribe((params: Params) => {
                this.router.navigate(['/']);
              });
          }
        }
      });

    }
  }

  createFormGroupWithBuilder() {

    return this.fb.group({
      emailFormControl: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required
      ])
    });
  }

  signUp() {
    this.authService.signUp(this.loginForm.value['emailFormControl'], this.loginForm.value['passwordFormControl']);
  }

  signIn() {
    this.authService.signIn(this.loginForm.value['emailFormControl'], this.loginForm.value['passwordFormControl']);
  }


  getProtected() {
    this.authService.getProtected()
      .subscribe((res: any) => {
        console.log(res);
      });
  }
  facebookLogin() {
    this.authService.requestFacebookRedirectUri()
      .subscribe((response: { redirect_uri: string }) => {
        window.location.replace(response.redirect_uri);
      });
  }

  twitterLogin() {
    this.authService.requestTwitterRedirectUri()
      .subscribe((response: { redirect_uri: string }) => {
        window.location.replace(response.redirect_uri);
      });
  }

  googleLogin() {
    this.authService.requestGoogleRedirectUri()
      .subscribe((response: { redirect_uri: string }) => {
        window.location.replace(response.redirect_uri);
      });
  }
}
