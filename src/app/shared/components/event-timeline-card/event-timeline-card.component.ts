import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
// import { ButtonComponent } from '@components/button/button.component';
// import {
//   caret_right_icon,
//   map_pin_line_bold_icon,
//   user_group_bold_icon,
// } from '@components/svg-icon/icons';
// import { SvgIconComponent } from '@components/svg-icon/svg-icon.component';

@Component({
  selector: 'RVI-event-timeline-card',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: contents;
    }
  `,
  template: `
    <div class="relative flex w-full gap-16 pb-12">
      <!-- Dotted Line -->
      <div
        class="absolute top-1.5 bottom-0 left-[calc(7rem+4rem/2)] border-l-2 border-dashed"
      ></div>

      <!-- Date/time, line and dot -->
      <div class="relative z-10 w-28">
        <!-- Container -->
        <div class="sticky top-0">
          <!-- Date -->
          <div class="flex flex-col items-start gap-2">
            <p>{{ event_date() }}</p>
            <p class="text-gray-400">{{ event_day() }}</p>
          </div>
          <!-- Dot -->
          <div
            class="absolute top-[0.4375rem] right-[calc(-1*4rem/2-0.3125rem)] flex flex-center"
          >
            <div class="w-2 h-2 bg-black rounded-full "></div>
          </div>
        </div>
      </div>

      <!-- Card Content -->
      <div class="min-w-0 flex-1">
        <div
          class="py-3 pr-3 pl-4 relative rounded-lg bg-secondary border border-primary/20 overflow-hidden"
        >
          <div class="gap-3 flex flex-col">
            <div class="flex flex-row-reverse gap-4">
              <!-- Cover image -->
              <div class="cursor-none">
                <img
                  class="aspect-square rounded-lg w-32 overflow-hidden relative"
                  src="https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=180,height=180/gallery-images/nn/15b57214-b546-44e6-aaa5-bcf624ea7b14"
                  alt=""
                />
              </div>
              <!-- Event details -->
              <div class="flex flex-col gap-2 flex-1">
                <span class="overflow-ellipsis text-gray-500">{{
                  event_time()
                }}</span>
                <h6>{{ event_title() }}</h6>
                <div class="flex flex-col gap-1">
                  <!-- Location -->
                  <div class="flex gap-2 min-w-0 items-center">
                    <!-- Icon -->
                    <!-- <RVI-svg-icon [icon]="map_pin_line_bold_icon" icon_class="w-4 h-4 text-gray-500" /> -->
                    <p class="text-gray-500">{{ event_location() }}</p>
                  </div>

                  <!-- No. of attendees -->
                  <div class="flex gap-2 min-w-0 items-center">
                    <!-- Icon -->
                    <!-- <RVI-svg-icon [icon]="user_group_icon" icon_class="w-4 h-4 text-gray-500" /> -->
                    <p class="text-gray-500">{{ event_attendees() }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Manage event button -->
            <button rviButton variant="partnerDefault" class="w-fit">
              <span>Manage event</span>
              <!-- <RVI-svg-icon [icon]="caret_right_icon" icon_class="w-4 h-4" /> -->
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EventTimelineCardComponent {
  event_title = input<string>();
  event_date = input<string>();
  event_day = input<string>();
  event_time = input<string>();
  event_location = input<string>();
  event_attendees = input<number>();

  on_click = output<void>();

  // caret_right_icon = caret_right_icon;
  // user_group_icon = user_group_bold_icon;
  // map_pin_line_bold_icon = map_pin_line_bold_icon;

  onClick() {
    this.on_click.emit();
  }
}
