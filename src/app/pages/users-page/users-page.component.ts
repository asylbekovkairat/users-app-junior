import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { IUser } from '../../model/user.type';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UserCardComponent } from './ui/user-card/user-card.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent } from '../../components/create-edit-user/create-edit-user.component';
import { UsersFacade } from '../../store/user.facade';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [
    HeaderComponent,
    NgFor,
    UserCardComponent,
    UserCardComponent,
    NgFor,
    AsyncPipe,
    MatButtonModule,
    NgIf,
    MatProgressBarModule,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  private userDialog = inject(MatDialog);
  private usersFacade = inject(UsersFacade);

  public users$ = this.usersFacade.users$;
  public status$ = this.usersFacade.status$;
  public error$ = this.usersFacade.error$;

  ngOnInit() {
    this.usersFacade.loadUsers();
  }

  openEditDialog(user?: IUser) {
    console.log('user', user);

    const dialogRef = this.userDialog.open(CreateEditUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);

      const editedUser = {
        ...result,
        company: {
          name: result.companyName,
        },
      };
      if (result) this.usersFacade.editUser(editedUser);
    });
  }

  deleteUser(deleteUserId: number): void {
    this.usersFacade.deleteUser(deleteUserId);
  }
}
