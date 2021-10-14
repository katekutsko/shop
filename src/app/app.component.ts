import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRole } from './core';
import { UserRoleService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle') header: ElementRef<HTMLHeadingElement>;

  title = 'shop';
  userRole$: Observable<UserRole> = this.userRoleService.getCurrentUserRole();

  constructor(private readonly userRoleService: UserRoleService) {}

  ngAfterViewInit(): void {
    this.header.nativeElement.textContent = this.title;
  }

  onUserRoleChanged($event: any): void {
    this.userRoleService.setCurrentUserRole($event.target.value);
  }
}
