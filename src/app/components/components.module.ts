import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from "../angular-material/angular-material.module";

import { FilterComponent } from './filter/filter.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CommonModule } from "@angular/common";
import { UsersListComponent } from './users-list/users-list.component';
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  declarations: [
    FilterComponent,
    UsersListComponent,
    UserDetailsComponent
  ],
  imports: [
    FormsModule,
    PipesModule,
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    FilterComponent,
    UsersListComponent,
    UserDetailsComponent
  ]
})
export class ComponentsModule { }
