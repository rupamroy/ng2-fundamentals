import { Component, OnInit } from '@angular/core';
import { EventService } from "../shared/events.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: 'event-details.component.html',
    styles: [`
        .container {padding-left:20px; padding-right:20px;}
        .event-image { height: 100px;}
    `]
})

export class EventDetailsComponent implements OnInit {
    event: any;
    constructor(private eventService: EventService,
    private route:ActivatedRoute) { }

    ngOnInit() {
        let id: number = +this.route.snapshot.params['id'];
        this.event = this.eventService.getEvent(id);
    }
}