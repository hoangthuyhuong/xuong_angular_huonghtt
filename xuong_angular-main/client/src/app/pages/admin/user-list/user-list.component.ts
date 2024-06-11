import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { RegisterForm } from '../../../../types/User';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, NgToastModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: RegisterForm[] = [];

  constructor(private userService: UserService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.loadUsers(); // Gọi hàm loadUsers trong ngOnInit
  }

  loadUsers() {
    this.userService.getUser().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(id: string): void {
    Swal.fire({
      title: 'Bạn có chắc chắn không?',
      text: 'Bạn không thể khôi phục hành động này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!',
      cancelButtonText: 'Không!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(() => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Xóa người dùng thành công',
            duration: 5000,
            sticky: false,
          });

          this.loadUsers(); // Gọi lại hàm loadUsers để lấy danh sách người dùng mới
        }, error => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Xóa người dùng thất bại',
            duration: 5000,
            sticky: true,
          });
        });
      }
    });
  }

}
