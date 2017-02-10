import { ElementRef, OnDestroy, Renderer } from '@angular/core';
import { FocusService } from './focus.service';
/**
 * @hidden
 */
export declare class FocusableDirective implements OnDestroy {
    private focusService;
    private renderer;
    index: number;
    constructor(focusService: FocusService, elementRef: ElementRef, renderer: Renderer);
    readonly focusedClassName: boolean;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    private element;
    private focusSubscription;
    private subscribeEvents();
    private unsubscribeEvents();
}
