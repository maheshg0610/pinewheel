import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../../shared/shared.module';
import { VendorRegistrationComponent } from './vendor-registration.component';
import { VendorRegistrationRoutingModule } from './vendor-registration-routing.module';

@NgModule({
  declarations: [VendorRegistrationComponent],
  imports: [
    CommonModule,
    VendorRegistrationRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    SharedModule
  ]
})
export class VendorRegistrationModule {}
