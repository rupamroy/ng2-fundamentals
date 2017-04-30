import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { EventService } from "../shared/events.service";

@Injectable()
export class EventDetailActivateGuard implements CanActivate {
    constructor(private eventService:EventService, private router:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let eventExists = !!this.eventService.getEvent(+route.params['id']);

        if(!eventExists)
            this.router.navigate(['/404']);

        return eventExists;
    }
}