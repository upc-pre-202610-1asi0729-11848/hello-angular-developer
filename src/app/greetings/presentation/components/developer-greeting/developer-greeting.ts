import { Component, computed, input } from '@angular/core';
import { Developer } from '../../../domain/model/developer';

@Component({
  selector: 'app-developer-greeting',
  imports: [],
  templateUrl: './developer-greeting.html',
  styleUrl: './developer-greeting.css',
})
export class DeveloperGreeting {
  firstName = input<string>('');
  lastName = input<string>('');
  fullName = computed(() => {
    if (!this.firstName || !this.lastName)
      return 'Anonymous Developer';
    const developer = new Developer(this.firstName(), this.lastName());
    return developer.fullName;
  });

  isRegistered = computed(() => !!this.firstName() || !!this.lastName());
}
