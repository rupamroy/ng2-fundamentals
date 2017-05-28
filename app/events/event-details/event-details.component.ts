import { Component, OnInit } from '@angular/core';
import { EventService } from "../shared/event.service";
import { ActivatedRoute } from "@angular/router";
import { IEvent } from "../index";

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
    
    constructor(private eventService: EventService,
    private route:ActivatedRoute) { }

    ngOnInit() {
        let id: number = +this.route.snapshot.params['id'];
        this.event = this.eventService.getEvent(id);
    }

    addSession() {
        this.addMode = true;
    }

    saveNewSession(session: any){
        const nextId = Math.max.apply(null,this.event.sessions.map(e => e.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.updateEvent(event);
        this.addMode = false;
    }

    cancelNewSession() {
        this.addMode = false;
    }
}