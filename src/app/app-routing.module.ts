import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomeComponent} from "./components/home/home.component";
import {TripComponent} from "./components/trip/trip.component";
import {PageErrorComponent} from "./components/page-error/page-error.component";
import {ItemInfoComponent} from "./components/item-info/item-info.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
      path: '',
      component: HomeComponent,
      canActivate: [AuthGuard],
      children: []
  },
    {
        path: 'trip/:tripId',
        component: TripComponent
    },
    {
        path: 'trip/:tripId/:itemId',
        component: ItemInfoComponent
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: '**',
        component: PageErrorComponent
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
