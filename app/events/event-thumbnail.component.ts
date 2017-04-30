import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'event-thumbnail',
    templateUrl: 'event-thumbnail.component.html',
    styles: [`
        .thumbnail {min-height: 210px;}
        .pad-left {margin-left: 10px;}
        .well div {color: #bbb;}
        .green {color: #003300 !important; }
        .bold {font-weight:bold; }
    `]
})

export class EventThumbnailComponent implements OnInit {
    ngOnInit(): void {
        
    }

    @Input() event: any;

    getStartTimeClass() {
        if(this.event && this.event.time === '8:00 am'){
            return ['green','bold'];
        }
        return [];
    }


}