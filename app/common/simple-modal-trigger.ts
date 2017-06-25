import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQ_TOKEN } from './jquery.service';

@Directive({ selector: '[simple-modal-trigger]' })
export class SimpleModalTriggerDirective implements OnInit {
    @Input('simple-modal-trigger') modalId: string;
    private el: HTMLElement;

    constructor( @Inject(JQ_TOKEN) private $: any, ref: ElementRef) {
        this.el = ref.nativeElement;
    }

    ngOnInit(): void {
        const that = this;
        this.el.addEventListener('click', (e) => {
            that.$(`#${this.modalId}`).modal({});
        });
    }

}
