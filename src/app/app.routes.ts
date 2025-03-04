import { Routes } from '@angular/router';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StocksComponent } from './stocks/stocks.component';

export const appRoutes: Routes = [
  { path: 'signup', component: SignUpComponent }, // Default first page
  { path: 'signin', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent},
    {path: 'stocks', component: StocksComponent},
    // Dashboard route
  { path: '', redirectTo: '/signup', pathMatch: 'full' } // Redirect to Sign-Up first
];
