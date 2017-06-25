import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent } from '../index';

@Component({
    moduleId: module.id,
    templateUrl: 'event-details.component.html',
    styles: [`
        .container {padding-left:20px; padding-right:20px;}
        .event-image { height: 100px;}
         a {cursor: pointer;}
    `]
})

export class EventDetailsComponent implements OnInit {
    event: IEvent;
    addMode: boolean;
    filterBy: string = 'all';
    sortBy: string = 'name';

    constructor(private eventService: EventService,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data.forEach((data) => {
            this.event = data.event;
            this.addMode = false;
        });
    }

    addSession() {
        this.addMode = true;
    }

    saveNewSession(session: any) {
        const nextId = Math.max.apply(null, this.event.sessions.map(e => e.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event).subscribe();
        this.addMode = false;
    }

    cancelNewSession() {
        this.addMode = false;
    }
}
