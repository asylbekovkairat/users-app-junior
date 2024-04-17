import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateEditUserComponent } from '../create-edit-user/create-edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UsersFacade } from '../../store/user.facade';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private userDialog = inject(MatDialog);
  private usersFacade = inject(UsersFacade);

  openCreateDialog() {
    const dialogRef = this.userDialog.open(CreateEditUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      const createdUser = {
        ...result,
        company: {
          name: result.companyName,
        },
      };
      if (result) this.usersFacade.addUser(createdUser);
    });
  }
}
