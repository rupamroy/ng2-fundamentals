import { Routes } from "@angular/router";
import { EventsListComponent } from "./events/events-list.component";
import { EventDetailsComponent } from "./events/event-details/event-details.component";
import { CreateEventComponent } from "./events/create-event.component";
import { Error404Component } from "./errors/404.component";
import { EventDetailActivateGuard } from "./events/event-details/event-detail-activate.guard";
import { EventsListResolver } from "./events/event-list-resolver.service";
import { CreateSessionComponent } from "./events/index";

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
        canActivate: [EventDetailActivateGuard]
    },
    { path: 'events/session/new', component: CreateSessionComponent },
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: '404', component: Error404Component },
    { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
]
