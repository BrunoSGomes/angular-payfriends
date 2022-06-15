import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentsComponent } from './payments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { AgGridModule } from 'ag-grid-angular';
import { PaymentsRoutingModule } from './payments-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonRendererComponent } from './render/button-render.component';
import { PatchTaskComponent } from './components/update-task/patch-task.component';

@NgModule({
  declarations: [
    PaymentsComponent,
    ProfileComponent,
    NewTaskComponent,
    PatchTaskComponent,
    ButtonRendererComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    PaymentsRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ProfileComponent,
    NewTaskComponent,
    PatchTaskComponent
  ],
  providers: [
    PaymentsComponent
  ]
})

export class PaymentsModule { }
