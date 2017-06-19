import { SessionListComponent } from "./session-list.component";
import { ISession } from "../shared/event.model";
import { VoterService } from "./voter.service";
import { AuthService } from "../../user/auth.service";

describe('Session list component', () => {
    let component:SessionListComponent;
    let mockVoterService: VoterService, mockAuthService: AuthService;
    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService);
    });
    describe('ngOnChanges', () => {
        it('should filter the sessions correctly', () => {
            component.sessions = <ISession[]>[
                {name: 'session1', level: 'intermediate'},
                {name: 'session2', level: 'intermediate'},
                {name: 'session3', level: 'beginner'}
            ];
            component.filterBy = 'intermediate';
            component.sortBy = 'name';
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(2);

        });

        it('should sort the sessions correctly', () => {
            component.sessions = <ISession[]>[
                {name: 'session1', level: 'intermediate'},
                {name: 'session3', level: 'intermediate'},
                {name: 'session2', level: 'beginner'}
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions[2].name).toBe('session3');

        });
    });
});