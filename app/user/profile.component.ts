import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../common/toastr.service';

@Component({
  moduleId: module.id,
  templateUrl: 'profile.component.html',
  styles: [
    `
      em {
          float: right;
          color: #E05C65;
          padding-left:10px;
      }
      .error input{background-color:#E3C3C5;}
      .error ::-webkit-input-placeholder {color: #999}
      .error ::-moz-placeholder {color: #999}
      .error :-moz-placeholder {color: #999}
      .error :ms-input-placeholder {color: #999}
    `
  ]
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  firstName;
  lastName;

  constructor(private authService: AuthService, private router: Router,
              @Inject(TOASTR_TOKEN) private toastr: Toastr) {

  }

  ngOnInit(): void {
    this.firstName = new FormControl(this.authService.currentUser.firstName,
      [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.lastName = new FormControl(this.authService.currentUser.lastName,
      [Validators.required, Validators.pattern('[a-zA-Z].*')]);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  cancel() {
    this.router.navigate(['events']);
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe((resp) => {
        this.toastr.success('Provide saved successfully');
      });
      setTimeout(() => {
        this.router.navigate(['events']);
      }, 1000);
    }
  }

  validate(control) {
    return this.profileForm.controls[control].valid ||
      this.profileForm.controls[control].untouched;
  }

  logout() {
    this.authService.logout().subscribe((resp) => {
      this.router.navigate(['/login']);
    });
  }

}
