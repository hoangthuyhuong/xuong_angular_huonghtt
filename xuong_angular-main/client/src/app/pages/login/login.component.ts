import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgClass, NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserLoginRes, UserLoginResponse } from '../../../types/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, HeaderComponent, FooterComponent, NgClass,
    NgToastModule, NgxPaginationModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;
  loading: boolean = false;
  userService = inject(UserService);
  router = inject(Router);
  toast = inject(NgToastService);

  login = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  toggleVisibility() {
    this.hide = !this.hide;
  }

  ngOnInit() { }

  onSubmit() {
    this.loading = true;

    this.userService.login(this.login.value).subscribe({
      next: (data) => {
        // Assuming your server sends back an accessToken upon successful login
        localStorage.setItem('token', (data as UserLoginRes).token);
        localStorage.setItem('userId', (data as UserLoginRes).user._id);


        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Đăng nhập thành công',
          duration: 5000,
          sticky: false,
        });

        setTimeout(() => {
          // this.router.navigate(['admin/products/list']);
          console.log(this.router.navigate(['admin/products/list']));
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
          summary: 'Thông tin tài khoản hoặc mật khẩu không chính xác',
          duration: 5000,
          sticky: true,
        });
        this.loading = false;
      },
    });
  }
}
