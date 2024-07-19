import { state } from '@angular/animations';
import {
  computed,
  Directive,
  ElementRef,
  inject,
  Input,
  input,
  signal,
} from '@angular/core';

@Directive({
  selector: '[rviTabTrigger]',
  standalone: true,
  host: {
    '[class]': 'computedClass()',
    '[attr.data-state]': 'state()',
  },
})
export class TabTriggerDirective {
  elementRef = inject(ElementRef);

  @Input('rviTabTrigger') triggerFor?: string;
  // triggerFor = input<string>('rviTabTrigger');

  // tab_name = input.required({ alias: 'rviTabTrigger' });
  public readonly userClass = input('', { alias: 'class' });

  protected computedClass = computed(
    () =>
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm' +
      this.userClass()
  );

  state = signal<'active' | 'inactive'>('inactive');

  // // computed_state = computed(() => (this.state() === 'active' ? true : false));

  // // ngOnInit() {
  // //   console.log(this.tab_name());
  // // }

  // // onClick() {
  // //   if (this.state() === 'active') {
  // //     this.state.set('inactive');
  // //   } else {
  // //     this.state.set('active');
  // //   }
  // // }
}
