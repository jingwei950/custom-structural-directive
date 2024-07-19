import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ContentChild,
  contentChild,
  ContentChildren,
  contentChildren,
  effect,
  ElementRef,
  input,
  QueryList,
  signal,
  ViewChild,
  viewChild,
  ViewChildren,
  viewChildren,
} from '@angular/core';
import { TabTriggerDirective } from '../../directives/tab-trigger.directive';

@Component({
  selector: 'RVI-tab-list',
  standalone: true,
  imports: [TabTriggerDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClass()',
  },
  template: `<ng-content />`,
})
export class TabListComponent {
  public readonly userClass = input('', { alias: 'class' });
  protected computedClass = computed(
    () =>
      'inline-flex items-center justify-center rounded-md bg-[#e4e5e8] p-1 text-black' +
      this.userClass()
  );

  trigger_buttons = contentChildren(TabTriggerDirective, { read: ElementRef });

  tabs_arr = computed(() => {
    return this.trigger_buttons().map((tab) => tab.nativeElement);
  });

  tabs = computed(() => this.tabs_arr());

  onClick(clickedIndex: number) {
    this.tabs().forEach((tab, index) => {
      if (index === clickedIndex) {
        tab.setAttribute('data-state', 'active');
      } else {
        tab.setAttribute('data-state', 'inactive');
      }
    });
  }

  constructor() {
    effect(() => {
      // console.log(this.trigger_buttons());
      this.trigger_buttons().forEach((trigger, index) => {
        trigger.nativeElement.addEventListener('click', () => {
          this.onClick(index);
        });
        index === 0
          ? trigger.nativeElement.setAttribute('data-state', 'active')
          : trigger.nativeElement.removeAttribute('data-active');
      });
    });
  }
}
