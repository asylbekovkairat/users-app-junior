import { IUser } from './../../../../model/user.type';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  constructor() {}
  @Input() user!: IUser;
  @Output() openEditDialog = new EventEmitter<IUser>();
  @Output() deleteUser = new EventEmitter<number>();

  openEdit() {
    console.log('openEditDialog', this.openEditDialog);

    console.log('this.user', this.user);

    this.openEditDialog.emit(this.user);
  }

  deleteUserById() {
    this.deleteUser.emit(this.user.id);
  }
}
