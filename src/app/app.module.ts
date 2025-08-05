import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ShopModule } from './shop/shop.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HomeModule } from "./home/home.module";
import { loaderInterceptor } from './core/nav-bar/Interceptor/loader.interceptor';
import { credentialsInterceptor } from './core/Interceptor/credentials.interceptor';

@NgModule({
  declarations: [
    AppComponent
    
  ],
  exports:[
    NgxPaginationModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HomeModule ,
    NgxSpinnerModule ,
     ToastrModule.forRoot({
      closeButton:true ,
      positionClass:'toast-top-right',
      countDuplicates:true, 
      timeOut:1500,
      progressBar:true
     })
],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptorsFromDi()) , 
    {provide:HTTP_INTERCEPTORS,useClass:loaderInterceptor ,multi :true},
    {provide:HTTP_INTERCEPTORS,useClass:credentialsInterceptor ,multi :true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
