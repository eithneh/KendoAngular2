import { ElementRef, NgZone } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/auditTime';
import { DOMService } from './dom.service';
/**
 * @hidden
 */
export declare class ScrollableService {
    private _dom;
    private _zone;
    private element;
    private subscription;
    constructor(_dom: DOMService, _zone: NgZone);
    forElement(element: ElementRef): ScrollableService;
    subscribe(callback: Function): void;
    unsubscribe(): void;
    isVisible(elem: any, container: any): boolean;
}
