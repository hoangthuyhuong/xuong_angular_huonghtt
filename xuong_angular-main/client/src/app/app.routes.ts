import { Routes, CanActivateFn, CanActivate } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/products/list/list.component';
import { AddProductComponent } from './pages/admin/products/add-product/add-product.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DetailComponent } from './pages/admin/products/detail/detail.component';
import { UpdateProductComponent } from './pages/admin/products/update-product/update-product.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [adminGuard],

    component: AdminLayoutComponent,

    children: [
      {
        path: 'products/list',
        component: ProductListComponent,
      },
      {
        path: 'products/detail/:id',
        component: DetailComponent,
      },

      {
        path: 'products/add',
        component: AddProductComponent,
      },
      {
        path: 'products/update/:id',
        component: UpdateProductComponent,
      },
      {
        path: 'user-list',
        component: UserListComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },

  { path: '**', component: NotfoundComponent },
];
