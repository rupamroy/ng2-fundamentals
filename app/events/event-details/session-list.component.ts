import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ISession } from "../index";

@Component({
    moduleId: module.id,
    selector: 'session-list',
    templateUrl: 'session-list.component.html'
})

export class SessionListComponent implements OnInit, OnChanges {

    @Input() sessions: ISession[];
    @Input() filterBy: string;
    visibleSessions: ISession[];

    constructor() { }

    ngOnInit() { }

    ngOnChanges(): void {
        if (this.sessions) {
            this.filterSessions(this.filterBy);
        }
    }

    filterSessions(filterBy) {
        if (filterBy === 'all') {
            this.visibleSessions = this.sessions.slice(0);
        } else {
            this.visibleSessions = this.sessions.filter(session => {
               return session.level.toLocaleLowerCase() === this.filterBy;
            })
        }
    }
}