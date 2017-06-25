import { VoterService } from './voter.service';
import { ISession } from '../shared/event.model';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

describe('VoterService', () => {
    let voterService: VoterService;
    let mockHttp: Http;
    let response: Response;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
        response = jasmine.createSpyObj('response', ['json']);
        voterService = new VoterService(mockHttp);
    });
    describe('deleteVoter', () => {
        it('should remove the voter from the list of voters', () => {
            const session = { id: 6, voters: ['joe', 'rupam'] };
            (mockHttp.delete as jasmine.Spy).and.returnValue(Observable.of(false));
            voterService.deleteVoter(3, session as ISession, 'joe');

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('rupam');
        });
        it('should call http delete with the right URL', () => {
            const session = { id: 6, voters: ['joe', 'rupam'] };
            (mockHttp.delete as jasmine.Spy).and.returnValue(Observable.of(false));
            voterService.deleteVoter(3, session as ISession, 'joe');

            expect(mockHttp.delete).toHaveBeenCalledWith('api/events/3/sessions/6/voters/joe');
        });
    });

    describe('add voter', () => {
        it('should call http post with the right URL', () => {
            const session = { id: 6, voters: ['rupam'] };
            (mockHttp.post as jasmine.Spy).and.returnValue(Observable.of(response));
            voterService.addVoter(3, session as ISession, 'joe');

            expect(mockHttp.post).toHaveBeenCalledWith('api/events/3/sessions/6/voters/joe', '{}', jasmine.any(Object));
        });
    });
});
