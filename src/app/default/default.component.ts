import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  standalone: true,
  imports: [NgFor],
})
export class DefaultComponent {
  actions: string[] = [];
  counter = signal(0); //angular sees changes here. any type
  doubleLog = computed(() => {
    this.counter() * 2;
  }); // signal value that depends on other signal value

  constructor() {
    effect(() => console.log(this.counter()));
  } // fires whenever a signal changes

  increment() {
    // this.counter.update((oldCounter): number => {
    //   return oldCounter + 1;
    // });
    // this.counter.set(5) // change value to different
    this.counter.set(this.counter() + 1);

    this.actions = [...this.actions, 'INCREMENT'];
  }

  decrement() {
    this.counter.update((oldCounter): number => {
      return oldCounter - 1;
    });
    this.actions = [...this.actions, 'DECREMENT'];
  }
}
