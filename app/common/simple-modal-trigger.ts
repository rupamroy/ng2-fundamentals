import { Directive, OnInit, Inject, ElementRef } from '@angular/core';
import { JQ_TOKEN } from "./jquery.service";

@Directive({ selector: '[simple-modal-trigger]' })
export class SimpleModalTriggerDirective implements OnInit {
    private el: HTMLElement;

    constructor( @Inject(JQ_TOKEN) private $: any, ref: ElementRef) {
        this.el = ref.nativeElement;
    }

    ngOnInit(): void {
        let that = this;
        this.el.addEventListener('click', (e) => {
            that.$('#simple-modal').modal({});
        });
    }

}