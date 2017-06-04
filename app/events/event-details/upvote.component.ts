import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'upvote',
    templateUrl: 'upvote.component.html',
    styleUrls: ['upvote.component.css']
})

export class UpvoteComponent implements OnInit {
    @Input() count: number;
    @Input() voted: boolean;
    @Output() vote =new EventEmitter();
    
    constructor() { }

    ngOnInit() { }

    onClick() {
        this.vote.emit({});
    }
}