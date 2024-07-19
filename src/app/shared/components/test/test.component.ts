import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { delay, of, switchMap } from 'rxjs';

@Component({
  selector: 'RVI-test',
  standalone: true,
  imports: [],
  template: ` <p>test works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {}
