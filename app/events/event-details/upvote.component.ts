import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'upvote',
    templateUrl: 'upvote.component.html',
    styleUrls: ['upvote.component.css']
})

export class UpvoteComponent implements OnInit {
    iconColor: string;
    @Input() count: number;
    @Input() set voted(val) {
        this.iconColor = val ? 'red' : 'white';
    }
    @Output() vote = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    onClick() {
        this.vote.emit({});
    }
}
