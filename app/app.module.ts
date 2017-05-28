import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { EventsAppComponent } from './events-app.component';
import {
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    EventDetailActivateGuard,
    EventsListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe
} from './events/index'
import { NavBarComponent } from './nav/navbar.component';
import { TOASTR_TOKEN, Toastr } from "./common/toastr.service";
import { CollapsibleWellComponent } from "./common/collapsible-well.component";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { CreateEventComponent } from "./events/create-event.component";
import { Error404Component } from "./errors/404.component";
import { AuthService } from "./user/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

declare let toastr: Toastr;

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe
    ],
    providers: [
        EventService,
        {
            provide: TOASTR_TOKEN,
            useValue: toastr
        },
        EventDetailActivateGuard,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        },
        EventsListResolver,
        AuthService

    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {

}

function checkDirtyState(component: CreateEventComponent){
    if(component.isDirty){
        return window.confirm('You have not saved your work, do you want to cancel?');
    }
    return true;
}