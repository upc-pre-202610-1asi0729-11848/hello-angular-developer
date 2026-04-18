import { Component, computed, EventEmitter, Output, Signal, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-developer-registration',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './developer-registration.html',
  styleUrl: './developer-registration.css',
})
export class DeveloperRegistration {
  firstName = signal<string>('');
  lastName = signal<string>('');
  isFormValid: Signal<boolean> = computed(() => this.firstName().trim().length >= 2
    && this.lastName().trim().length >= 2);

  @Output() public developerRegistered = new EventEmitter<{ firstName: string, lastName: string }>();
  @Output() public registrationDeferred = new EventEmitter<void>();

  public submitRegistrationRequest(): void {
    if (this.isFormValid()) {
      this.developerRegistered.emit({ firstName: this.firstName(), lastName: this.lastName() });
      this.clearFields();
    }
  }

  public deferRegistration() {
    this.clearFields();
    this.registrationDeferred.emit();
  }

  public clearFields(): void {
    this.firstName.set('');
    this.lastName.set('');
  }
}
