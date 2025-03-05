import { Routes } from '@angular/router';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StocksComponent } from './stocks/stocks.component';
import { HighDemandOrdersComponent } from './high-demand-orders/high-demand-orders.component';
import { ShipmentTrackingComponent } from './shipment-tracking/shipment-tracking.component';
import { BlogListComponent } from './bloglist/bloglist.component';

export const appRoutes: Routes = [
  { path: 'signup', component: SignUpComponent }, // Default first page
  { path: 'signin', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent},
    {path: 'stocks', component: StocksComponent},
    {path:'high-demand-orders',component:HighDemandOrdersComponent},
    {path: 'shipment-tracking', component: ShipmentTrackingComponent},
    {path:'blogs',component:BlogListComponent},
    // Dashboard route
  { path: '', redirectTo: '/signup', pathMatch: 'full' } // Redirect to Sign-Up first
];


