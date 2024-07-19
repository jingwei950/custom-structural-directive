import { NgIf } from '@angular/common';
import {
  Directive,
  effect,
  inject,
  Input,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[rviTabContent]',
  standalone: true,
})
export class TabContentDirective {
  templateRef = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef);

  tab_name = input('', { alias: 'rviTabContent' });

  ngOnInit() {
    console.log(this.templateRef.elementRef.nativeElement);
    console.log(this.viewContainer.createEmbeddedView(this.templateRef));
  }

  constructor() {
    // super(this.viewContainer, this.templateRef);
    // effect(() => {
    //   console.log(this.tab_name());
    //   if (this.tab_name() === 'account') {
    //     console.log(this.templateRef);
    //     this.viewContainer.createEmbeddedView(this.templateRef);
    //   } else {
    //     this.viewContainer.clear();
    //   }
    // });
  }
}
