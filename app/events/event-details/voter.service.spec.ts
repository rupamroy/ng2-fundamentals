import { VoterService } from "./voter.service";
import { ISession } from "../shared/event.model";
import { Observable } from "rxjs/Rx";
import { Http, Response } from "@angular/http";

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
            var session = { id: 6, voters: ["joe", "rupam"] };
            (<jasmine.Spy>mockHttp.delete).and.returnValue(Observable.of(false));
            voterService.deleteVoter(3, <ISession>session, "joe");

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("rupam");
        });
        it('should call http delete with the right URL', () => {
            var session = { id: 6, voters: ["joe", "rupam"] };
            (<jasmine.Spy>mockHttp.delete).and.returnValue(Observable.of(false));
            voterService.deleteVoter(3, <ISession>session, "joe");

            expect(mockHttp.delete).toHaveBeenCalledWith('api/events/3/sessions/6/voters/joe')
        });
    });

    describe('add voter', () => {
        it('should call http post with the right URL', () => {
            var session = { id: 6, voters: ["rupam"] };
            (<jasmine.Spy>mockHttp.post).and.returnValue(Observable.of(response));
            voterService.addVoter(3, <ISession>session, "joe");

            expect(mockHttp.post).toHaveBeenCalledWith('api/events/3/sessions/6/voters/joe', "{}", jasmine.any(Object));
        });
    });
});