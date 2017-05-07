import { Injectable } from '@angular/core';
import { Resolve } from "@angular/router";
import { EventService } from "./shared/event.service";

@Injectable()
export class EventsListResolver {

    constructor(private eventService: EventService) { }

    resolve() {
        return this.eventService.getEvents().map(events => events);
    }
}

