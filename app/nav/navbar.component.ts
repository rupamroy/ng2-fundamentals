import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: 'navBar.component.html',
    styles: [`
        .nav.navbar-nav {font-size: 15px;}
        #searchForm {margin-right: 100px;}
        @media (max-width: 1200px) {#searchForm{display: none}}
    `
    ]
})

export class NavBarComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}