import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';
import { debounceTime, map, Observable, of, switchMap } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgClass, NgToastModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;
  userService = inject(UserService);
  router = inject(Router);
  toast = inject(NgToastService);
  hide: boolean = true;
  hideConfirmPassword: boolean = true;
  emailExistsValidato = inject(UserService)

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),

    email: new FormControl('',
      [Validators.required, Validators.email],
      [this.emailExistsValidato.emailExists()]
    ),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  }, { validators: this.confirmPassword });

  toggleVisibility() {
    this.hide = !this.hide;
  }
  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  ngOnInit() {
  }

  confirmPassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  // emailExistsValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     if (!control.value) {
  //       return of(null);
  //     }
  //     return control.valueChanges.pipe(
  //       debounceTime(300),
  //       switchMap(value => this.userService.emailExists(value)),
  //       map(res => res.exists ? { emailExists: true } : null)
  //     );
  //   };
  // }
  onSubmit() {
    console.log(this.registerForm.value);
    this.loading = true;

    // Call API, navigate, show notification
    this.userService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Thêm tài khoản mới thành công',
          duration: 5000,
          sticky: false,
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error(error.message);
        this.toast.error({
          detail: 'ERROR',
          summary: 'API Not Found',
          duration: 5000,
          sticky: true,
        });
        this.toast.error({
          detail: 'ERROR',
          summary: 'Email đã tồn tại',
          duration: 5000,
          sticky: true,
        });
        this.loading = false;
      },
    });
  }
}
