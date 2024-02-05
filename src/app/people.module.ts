import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list/people-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PeopleListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    PeopleListComponent,
  ],
})
export class PeopleModule { }
