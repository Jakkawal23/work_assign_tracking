import { Component } from '@angular/core';
import { ConfirmationOptions, ConfirmationService } from './confirmation.service';
import { SHARED_PRIMENG } from '@/shared/shared-primeng';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [SHARED_PRIMENG],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss',
  providers: [ConfirmationService],
})
export class ConfirmationDialog {
  visible = false;
  options!: ConfirmationOptions;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.confirmationService.confirm$.subscribe(opts => {
      this.options = opts;
      this.visible = true;
    });
  }

  accept() {
    this.visible = false;
    if (this.options.accept) {
      this.options.accept();
    }
  }

  reject() {
    this.visible = false;
    if (this.options.reject) {
      this.options.reject();
    }
  }
}
