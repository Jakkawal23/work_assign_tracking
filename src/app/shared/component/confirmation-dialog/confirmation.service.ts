import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ConfirmationOptions {
  message: string;
  header?: string;
  icon?: string;
  accept?: () => void | Promise<void>;
  reject?: () => void;
}

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  private confirmSubject = new Subject<ConfirmationOptions>();
  confirm$ = this.confirmSubject.asObservable();

  confirm(options: ConfirmationOptions) {
    this.confirmSubject.next(options);
  }
}
