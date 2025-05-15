import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient } from '@angular/common/http';
import { ShopModule } from './shop/shop.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeModule } from "./home/home.module";

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
    ShopModule,
    HomeModule
],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
