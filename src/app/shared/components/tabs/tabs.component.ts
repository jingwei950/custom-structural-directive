import { NgIf } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChild,
  contentChildren,
  ContentChildren,
  effect,
  ElementRef,
  inject,
  input,
  QueryList,
  viewChild,
  viewChildren,
} from '@angular/core';
import { TabContentDirective } from '../../directives/tab-content.directive';
import { TabTriggerDirective } from '../../directives/tab-trigger.directive';

@Component({
  selector: 'RVI-tabs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabTriggerDirective, TabContentDirective],
  template: `<ng-content />`,
})
export class TabsComponent {
  private cdr = inject(ChangeDetectorRef);

  @ContentChildren(TabTriggerDirective, { descendants: true })
  tabTriggers?: QueryList<TabTriggerDirective>;
  @ContentChildren(TabContentDirective)
  tabContents?: QueryList<TabContentDirective>;

  tab_triggers = contentChildren(TabTriggerDirective, { descendants: true });
  tab_contents = contentChildren(TabContentDirective);

  active_tab?: string;

  constructor() {
    afterNextRender(() => {
      this.tab_triggers().forEach((trigger, index) => {
        trigger.elementRef.nativeElement.addEventListener('click', () => {
          this.setActiveTab(trigger?.triggerFor as string);
        });
      });
      if (this.tab_triggers()[0]) {
        console.log(this.tab_triggers()[0].triggerFor);
        this.setActiveTab(this.tab_triggers()[0].triggerFor as string);
      }
    });
    // effect(() => {
    //   // console.log('tab_triggers', this.tab_triggers());
    //   this.tab_triggers().forEach((trigger, index) => {
    //     trigger.elementRef.nativeElement.addEventListener('click', () => {
    //       this.setActiveTab(trigger?.triggerFor as string);
    //     });
    //   });
    //   if (this.tab_triggers()[0]) {
    //     console.log(this.tab_triggers()[0].triggerFor);
    //     this.setActiveTab(this.tab_triggers()[0].triggerFor as string);
    //   }
    // });
  }

  // ngOnInit() {
  //   console.log('tab_triggers', this.tab_triggers());

  //   this.tab_triggers().forEach((trigger, index) => {
  //     trigger.elementRef.nativeElement.addEventListener('click', () => {
  //       this.setActiveTab(trigger?.triggerFor as string);
  //     });
  //   });
  //   if (this.tab_triggers()[0]) {
  //     console.log(this.tab_triggers()[0].triggerFor);
  //     this.setActiveTab(this.tab_triggers()[0].triggerFor as string);
  //   }
  // }

  setActiveTab(tabName: string) {
    this.active_tab = tabName.toLowerCase();
    this.updateTabStates();
    this.updateTabContents();
  }

  updateTabStates() {
    this.tab_triggers().forEach((trigger) => {
      const state =
        trigger?.triggerFor?.toLowerCase() === this.active_tab
          ? 'active'
          : 'inactive';
      trigger.elementRef.nativeElement.setAttribute('data-state', state);
    });
  }

  updateTabContents() {
    this.tab_contents().forEach((content) => {
      content.viewContainer.clear(); // Clear the previous content
      if (content.tab_name()?.toLowerCase() === this.active_tab) {
        content.viewContainer.createEmbeddedView(content.templateRef);

        this.cdr.detectChanges();
      } else {
        content.viewContainer.clear();
      }
    });
  }

  // public readonly tab = input.required<string>();

  // // @ContentChildren(TabTriggerDirective) tabTriggers?: QueryList<TabTriggerDirective>;
  // // @ContentChildren(TabContentDirective) tabContents?: QueryList<TabContentDirective>;

  // test = contentChild<ElementRef>('test');
  // tabTriggers = contentChildren(TabTriggerDirective, { read: ElementRef, descendants: true });
  // tabContents = contentChildren(TabContentDirective, { read: ElementRef, descendants: true });

  // activeTab?: string;

  // constructor() {
  //   effect(() => {
  //     // console.log(this.test());
  //     // console.log(this.tabTriggers().);
  //     this.tabTriggers().forEach((trigger, index) => {
  //       // console.log(trigger.nativeElement.getAttribute('rviTabTrigger'));
  //       trigger.nativeElement.addEventListener('click', () => {
  //         // console.log(trigger);
  //         this.setActiveTab(trigger.nativeElement.getAttribute('rviTabTrigger'));
  //       });
  //       // Initialize the first tab as active
  //       if (index === 0) {
  //         this.setActiveTab(trigger.nativeElement.getAttribute('rviTabTrigger'));
  //       }
  //     });
  //   });
  // }

  // setActiveTab(tabName: string) {
  //   console.log(tabName);
  //   this.activeTab = tabName.toLowerCase();
  //   this.updateTabStates();
  //   this.updateTabContents();
  // }

  // updateTabStates() {
  //   this.tabTriggers().forEach((trigger) => {
  //     const state =
  //       trigger.nativeElement.getAttribute('data-state').toLowerCase() === this.activeTab ? 'active' : 'inactive';
  //     trigger.nativeElement.setAttribute('data-state', state);
  //   });
  // }

  // updateTabContents() {
  //   console.log(this.tabContents());
  //   this.tabContents().forEach((content) => {
  //     console.log(content.nativeElement);
  //     // content.viewContainer.clear();
  //     // if (content.tabName.toLowerCase() === this.activeTab) {
  //     //   content.viewContainer.createEmbeddedView(content.templateRef);
  //     // }
  //   });
  // }
}
