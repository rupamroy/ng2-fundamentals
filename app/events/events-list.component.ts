import { Component, OnInit } from '@angular/core';
import { EventService } from "./shared/events.service";
import { ToastrService } from "../common/toastr.service";

@Component({
    moduleId: module.id,
    template: `
        <div>
            <h1>Upcomming Angular 2 Events</h1>
            <hr/>
                <div class="row">
                    <div *ngFor="let event of events" class="col-md-5">
                        <event-thumbnail (click)="handleThumbnailClick(event.name)"
                         [event]="event" #thumbnail>
                        </event-thumbnail>
                    </div>
                </div>
        </div>
    `
})

export class EventsListComponent implements OnInit {
    events:Array<Object>;

    constructor(private eventService: EventService,private toastrService: ToastrService) { }

    handleThumbnailClick(eventName) {
        this.toastrService.success(eventName);
    }

    ngOnInit() {
        this.events = this.eventService.getEvents();
    }
}