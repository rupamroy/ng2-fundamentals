import { Injectable } from '@angular/core';
import { ISession } from '../index';
import { Http, Headers, Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class VoterService {
    constructor(private http: Http) { }

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName);

        const url = `api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;

        return this.http.delete(url).catch(this.handleError).subscribe();
    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName);

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new ResponseOptions({ headers });
        const url = `api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;

        return this.http.post(url, JSON.stringify({}), options).map((response: Response) => {
            return response.json();
        }).catch(this.handleError).subscribe();
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName);
    }

    handleError(err: Response) {
        return Observable.throw(err.statusText);
    }
}
