import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession, EventService } from '../events/index';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: 'navBar.component.html',
    styles: [`
        .nav.navbar-nav {font-size: 15px;}
        #searchForm {margin-right: 100px;}
        @media (max-width: 1200px) {#searchForm{display: none}}
        li > a.active {color: #F97924}
    `
    ]
})

export class NavBarComponent implements OnInit {
    searchTerm: string;
    foundSessions: ISession;
    constructor(public authService: AuthService, private eventService: EventService) { }

    ngOnInit() { }

    searchSessions(searchTerm) {
        this.eventService.searchSessions(searchTerm).subscribe((sessions) => {
            this.foundSessions = sessions;
        });
    }
}
