import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TabListComponent } from './shared/components/tab-list/tab-list.component';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { TabContentDirective } from './shared/directives/tab-content.directive';
import { TabTriggerDirective } from './shared/directives/tab-trigger.directive';
import { TestComponent } from './shared/components/test/test.component';
import { EventTimelineCardComponent } from './shared/components/event-timeline-card/event-timeline-card.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { delay, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TestComponent,
    TabListComponent,
    TabsComponent,
    TabContentDirective,
    TabTriggerDirective,
    EventTimelineCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'custom-structural-directive';

  isLoading = signal(true);
  tab_value = signal<string>('Upcoming');

  events = toSignal(
    toObservable(this.tab_value).pipe(
      switchMap((tab) => {
        this.isLoading.set(true);
        return of(this.getDataForTab(tab)).pipe(
          delay(2000),
          switchMap((data) => {
            this.isLoading.set(false);
            return of(data);
          })
        );
      })
    )
  );

  setTabValue(value: string) {
    this.tab_value.set(value);
    // console.log(value);
  }

  private getDataForTab(tab: string) {
    switch (tab) {
      case 'In-Progress':
        return this.in_progress_events;
      case 'Past':
        return this.past_events;
      default:
        return this.upcoming_events;
    }
  }

  upcoming_events = [
    {
      event_id: 1,
      event_title: 'Test event',
      event_date: this.formatDate(new Date()),
      event_day: this.getDayOfWeek(new Date()),
      event_time: this.formatSingaporeTime(new Date()),
      event_location: 'Serangoon',
      event_attendees: 100,
    },
    {
      event_id: 2,
      event_title: 'Test event 1',
      event_date: this.formatDate(new Date('2024-07-17T14:30:00')),
      event_day: this.getDayOfWeek(new Date('2024-07-17T14:30:00')),
      event_time: this.formatSingaporeTime(new Date('2024-07-17T11:30:00')),
      event_location: 'Paya Lebar',
      event_attendees: 99,
    },
    {
      event_id: 3,
      event_title: 'Test event 2',
      event_date: this.formatDate(new Date('2024-07-18T14:30:00')),
      event_day: this.getDayOfWeek(new Date('2024-07-18T14:30:00')),
      event_time: this.formatSingaporeTime(new Date('2024-07-18T23:30:00')),
      event_location: 'Ang Mo Kio',
      event_attendees: 59,
    },
    {
      event_id: 4,
      event_title: 'Test event 3',
      event_date: this.formatDate(new Date('2024-07-19T14:30:00')),
      event_day: this.getDayOfWeek(new Date('2024-07-19T14:30:00')),
      event_time: this.formatSingaporeTime(new Date('2024-07-19T16:30:00')),
      event_location: 'Bishan',
      event_attendees: 29,
    },
    {
      event_id: 5,
      event_title: 'Test event 4',
      event_date: this.formatDate(new Date('2024-07-20T14:30:00')),
      event_day: this.getDayOfWeek(new Date('2024-07-20T14:30:00')),
      event_time: this.formatSingaporeTime(new Date('2024-07-20T17:30:00')),
      event_location: 'Sengkang',
      event_attendees: 41,
    },
    {
      event_id: 6,
      event_title: 'Test event 5',
      event_date: this.formatDate(new Date('2024-07-21T14:30:00')),
      event_day: this.getDayOfWeek(new Date('2024-07-21T14:30:00')),
      event_time: this.formatSingaporeTime(new Date('2024-07-21T18:30:00')),
      event_location: 'Newton',
      event_attendees: 42,
    },
  ];

  in_progress_events = [
    {
      event_id: 1,
      event_title: 'Test event',
      event_date: this.formatDate(new Date()),
      event_day: this.getDayOfWeek(new Date()),
      event_time: this.formatSingaporeTime(new Date()),
      event_location: 'Serangoon',
      event_attendees: 100,
    },
    {
      event_id: 2,
      event_title: 'Test event 1',
      event_date: this.formatDate(new Date('2024-07-17T14:30:00')),
      event_day: this.getDayOfWeek(new Date('2024-07-17T14:30:00')),
      event_time: this.formatSingaporeTime(new Date('2024-07-17T11:30:00')),
      event_location: 'Paya Lebar',
      event_attendees: 99,
    },
  ];

  past_events = [
    {
      event_id: 1,
      event_title: 'Test event',
      event_date: this.formatDate(new Date()),
      event_day: this.getDayOfWeek(new Date()),
      event_time: this.formatSingaporeTime(new Date()),
      event_location: 'Serangoon',
      event_attendees: 100,
    },
    {
      event_id: 2,
      event_title: 'Test event 1',
      event_date: this.formatDate(new Date('2024-07-17T14:30:00')),
      event_day: this.getDayOfWeek(new Date('2024-07-17T14:30:00')),
      event_time: this.formatSingaporeTime(new Date('2024-07-17T11:30:00')),
      event_location: 'Paya Lebar',
      event_attendees: 99,
    },
    {
      event_id: 3,
      event_title: 'Test event 2',
      event_date: this.formatDate(new Date('2024-07-18T14:30:00')),
      event_day: this.getDayOfWeek(new Date('2024-07-18T14:30:00')),
      event_time: this.formatSingaporeTime(new Date('2024-07-18T23:30:00')),
      event_location: 'Ang Mo Kio',
      event_attendees: 59,
    },
  ];

  getDayOfWeek(date: Date) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[date.getDay()];
  }

  formatDate(date: Date) {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  }

  formatSingaporeTime(date: Date) {
    const timeString = date.toLocaleTimeString('en-SG', {
      timeZone: 'Asia/Singapore',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    let formattedTime = timeString.replace(/am|pm/i, (match) =>
      match.toUpperCase()
    );
    formattedTime = formattedTime.replace(/^0(\d:\d{2} PM)$/, '$1');

    return formattedTime;
  }
}
