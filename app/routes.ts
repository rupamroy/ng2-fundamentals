import { Routes } from '@angular/router';
import { EventsListComponent } from './events/events-list.component';
import { EventDetailsComponent } from './events/event-details/event-details.component';
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './errors/404.component';
import { EventsListResolver } from './events/event-list-resolver.service';
import { CreateSessionComponent, EventResolver } from './events/index';

export const appRoutes: Routes = [
    {
        path: 'events/new', component: CreateEventComponent,
        canDeactivate: ['canDeactivateCreateEvent']
    },
    {
        path: 'events', component: EventsListComponent,
        resolve: {
            events: EventsListResolver
        }
    },
    {
        path: 'events/:id', component: EventDetailsComponent,
        resolve: {
            event: EventResolver
        }
    },
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: '404', component: Error404Component },
    { path: 'user', loadChildren: 'app/user/user.module#UserModule' }
];
