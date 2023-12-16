import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { BookListComponent } from './pages/books/book-list/book-list.component';
import { BookDetailsComponent } from './pages/books/book-details/book-details.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { DiscussionDetailsComponent } from './pages/discussion-details/discussion-details.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ThankYouComponent } from './shared/components/thank-you/thank-you.component';
import { authGuards } from './core/guards/auth.guard';

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"login", component: LoginComponent},
  {path:"signup", component: SignupComponent},
  {path:"books", component: BookListComponent},
  {path:"books/:id", component: BookDetailsComponent},
  {path:"discussions/:id", component: DiscussionDetailsComponent, canActivate: [authGuards]},
  {path: "cart", component: CartPageComponent , canActivate: [authGuards]},
  {path: "checkout", component:CheckoutComponent , canActivate: [authGuards]},
  {path: "wishlist", component:WishlistComponent , canActivate: [authGuards]},
  {path: "profile", component:ProfilePageComponent , canActivate: [authGuards]},
  {path: "order-confirmed", component:ThankYouComponent , canActivate: [authGuards]},
  {path: "**", component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
