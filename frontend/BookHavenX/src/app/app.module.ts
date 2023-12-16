import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { BookListComponent } from './pages/books/book-list/book-list.component';
import { BookDetailsComponent } from './pages/books/book-details/book-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ChatbotComponent } from './shared/components/chatbot/chatbot.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { bookReducer } from './store/books/books.reducer';
import { BooksEffects } from './store/books/books.effects';
import { SidebarBooklistComponent } from './shared/components/sidebar-booklist/sidebar-booklist.component';
import { ProductCardComponent } from './shared/components/product-card/product-card.component';
import { AuthReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { DiscussionDetailsComponent } from './pages/discussion-details/discussion-details.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyprofileComponent } from './shared/components/profiletabs/myprofile/myprofile.component';
import { OrdersComponent } from './shared/components/profiletabs/orders/orders.component';
import { AddressesComponent } from './shared/components/profiletabs/addresses/addresses.component';
import { BooksComponent } from './shared/components/profiletabs/books/books.component';
import { UserlistsComponent } from './shared/components/profiletabs/userlists/userlists.component';
import { ThankYouComponent } from './shared/components/thank-you/thank-you.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    CarouselComponent,
    DashboardComponent,
    ChatbotComponent,
    CartPageComponent,
    LoadingComponent,
    CheckoutComponent,
    PagenotfoundComponent,
    WishlistComponent,
    SidebarBooklistComponent,
    BookDetailsComponent,
    BookListComponent,
    LoginComponent,
    SignupComponent,
    ProductCardComponent,
    DiscussionDetailsComponent,
    ProfilePageComponent,
    MyprofileComponent,
    OrdersComponent,
    AddressesComponent,
    BooksComponent,
    UserlistsComponent,
    ThankYouComponent
  ],
  imports: [BrowserModule,BrowserAnimationsModule, AppRoutingModule, FormsModule, FormsModule, HttpClientModule, StoreModule.forRoot({books: bookReducer, auth: AuthReducer}), EffectsModule.forRoot([BooksEffects, AuthEffects]), ToastrModule.forRoot({
    timeOut: 2000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    closeButton: true
  })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
