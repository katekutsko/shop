import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserRole } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  private userRoleSource: Subject<UserRole> = new BehaviorSubject(
    UserRole.USER
  );

  constructor() {}

  getCurrentUserRole(): Observable<UserRole> {
    return this.userRoleSource.asObservable();
  }

  setCurrentUserRole(userRole: UserRole): void {
    this.userRoleSource.next(userRole);
  }
}
