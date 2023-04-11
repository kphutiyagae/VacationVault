import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AuthService} from "./shared/services/auth.service";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import { HomeComponent } from './components/home/home.component';
import { TripComponent } from './components/trip/trip.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { ItemInfoComponent } from './components/item-info/item-info.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NavBarComponent} from "./UI/molecule/nav-bar/nav-bar.component";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {TripCardComponent} from "./UI/molecule/trip-card/trip-card.component";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzListModule} from "ng-zorro-antd/list";
import {NzIconModule} from "ng-zorro-antd/icon";
import { CalendarCardComponent } from './UI/molecule/calendar-card/calendar-card.component';
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";

registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        DashboardComponent,
        HomeComponent,
        TripComponent,
        PageErrorComponent,
        ItemInfoComponent,
        NavBarComponent,
        TripCardComponent,
        CalendarCardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        provideFunctions(() => getFunctions()),
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        ReactiveFormsModule,
        NzModalModule,
        NgxSkeletonLoaderModule,
        NzDropDownModule,
        NzListModule,
        NzIconModule,
        NzCalendarModule,
        NzSelectModule,
        NzDatePickerModule
    ],
  providers: [
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase},
    { provide: NZ_I18N, useValue: en_US },
      AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
