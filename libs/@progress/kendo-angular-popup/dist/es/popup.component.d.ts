import { AfterViewChecked, ChangeDetectorRef, ElementRef, EventEmitter, OnInit, OnDestroy, Renderer } from '@angular/core';
import { AlignService } from './services/align.service';
import { PositionService } from './services/position.service';
import { ResizeService } from './services/resize.service';
import { ScrollableService } from './services/scrollable.service';
import { AlignStrategy, CollisionStrategy, OffsetPosition } from '@progress/kendo-popup-common';
/**
 * Represents the Kendo UI Popup component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <button #anchor (click)="show=!show">Toggle</button>
 *  <kendo-popup *ngIf="show" [anchor]="anchor">
 *      <strong>Popup content!</strong>
 *  </kendo-popup>
 * `
 * })
 * class AppComponent {
 *   public show: boolean = false;
 * }
 * ```
 */
export declare class PopupComponent implements AfterViewChecked, OnInit, OnDestroy {
    private _alignService;
    private container;
    private _cdr;
    private _positionService;
    private _resizeService;
    private _scrollableService;
    private _renderer;
    /**
     * Controls the Popup animation. By default, the open and close animation are enabled.
     *
     * For more information, refer to the section on
     * [`Animation Control`]({% slug overview_popup_kendouiforangular %}#toc-animation-control).
     */
    animate: boolean;
    /**
     * Specifies the element that will be used as an anchor. The Popup opens next to that element.
     *
     * For more information, refer to the section on
     * [`Anchor`]({% slug overview_popup_kendouiforangular %}#toc-anchor).
     */
    anchor: ElementRef;
    /**
     * Specifies the anchor pivot point.
     *
     * **anchorAlign.horizontal** - String(default: "left")
     *
     * Specifies the horizontal alignment point of the anchor.
     *
     * The available options are:
     *
     * - `left` — Uses the leftmost point of the anchor element.
     * - `center` — Uses the center point of the anchor element.
     * - `right` — Uses the rightmost point of the anchor element.
     *
     * **anchorAlign.vertival** - String(default: "bottom")
     *
     * Specifies the vertical alignment point of the anchor.
     *
     * The available options are:
     *
     * - `top` — Uses the top point of the anchor element.
     * - `center` — Uses the center point of the anchor element.
     * - `bottom` — Uses the bottom point of the anchor element.
     *
     * For more information, refer to the section on
     * [`Positioning`]({% slug overview_popup_kendouiforangular %}#toc-positioning).
     */
    anchorAlign: AlignStrategy;
    /**
     * Configures the collision behavior of the Popup.
     *
     * **collision.horizontal** - String(default: "fit")
     *
     * Defines the horizontal position of the Popup when it is not fully visible.
     *
     * The available options are:
     *
     * - `fit` — Moves the Popup horizontally until it is fully displayed in the view port.
     * - `flip` — Flips the Popup position based on the origin and position properties.
     *
     * **collision.vertical** - String(default: "flip")
     *
     * Defines the vertical position of the Popup when it is not fully visible.
     *
     * The available options are:
     *
     * - `fit` — Moves the Popup vertically until it is fully displayed in the view port.
     * - `flip` — Flips the Popup position based on the origin and position properties.
     *
     * For more information, refer to the section on
     * [`Collisions`]({% slug overview_popup_kendouiforangular %}#toc-collisions).
     */
    collision: CollisionStrategy;
    /**
     * Specifies the popup pivot point.
     *
     * **popupAlign.horizontal** - String(default: "left")
     *
     * Specifies the horizontal alignment point of the Popup.
     *
     * The available options are:
     *
     * - `left` — Uses the leftmost point of the Popup element.
     * - `center` — Uses the center point of the Popup element.
     * - `right` — Uses the rightmost point of the Popup element.
     *
     * **popupAlign.vertival** - String(default: "top")
     *
     * Specifies the vertical alignment point of the Popup.
     *
     * The available options are:
     *
     * - `top` — Uses the top point of the Popup element.
     * - `center` — Uses the center point of the Popup element.
     * - `bottom` — Uses the bottom point of the Popup element.
     *
     * For more information, refer to the section on
     * [`Positioning`]({% slug overview_popup_kendouiforangular %}#toc-positioning).
     */
    popupAlign: AlignStrategy;
    /**
     * Specifies a list of CSS classes to be added to the internal animated element.
     *
     * > If the content of the Popup needs to be styled, use this property binding.
     *
     * For more information, refer to the section on
     * [`Appearance Control`]({% slug overview_popup_kendouiforangular %}#toc-appearance-control).
     */
    popupClass: string;
    /**
     * Specifies the element absolute position. The Popup will open next to that point.
     *
     * The Popup pivot point is defined by the `popupAlign` configuration option.
     * The boundary detection is applied by using the Window view port.
     *
     * The `Offset` type includes:
     *
     * - `offset.left` - Defines the left position of the Popup.
     * - `offset.top` - Defines the top position of the Popup.
     *
     * For more information, refer to the section on
     * [`Static Alignment`]({% slug overview_popup_kendouiforangular %}#toc-static-alignment).
     */
    offset: OffsetPosition;
    /**
     * The `anchorViewportLeave` event is triggered when the anchor
     * is scrolled outside the screen boundaries.
     *
     * For more information, refer to the section on
     * [`On Scrolling outside the Viewport`]({% slug overview_popup_kendouiforangular %}#toc-on-scrolling-outside-the-viewport).
     */
    anchorViewportLeave: EventEmitter<any>;
    /**
     * @hidden
     */
    readonly offsetLeft: number;
    /**
     * @hidden
     */
    readonly offsetTop: number;
    /**
     * @hidden
     */
    direction: string;
    private currentOffset;
    private resolvedPromised;
    constructor(_alignService: AlignService, container: ElementRef, _cdr: ChangeDetectorRef, _positionService: PositionService, _resizeService: ResizeService, _scrollableService: ScrollableService, _renderer: Renderer);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    private reposition();
    private position();
    private getDirection(flipped);
    private onScroll(isInViewPort);
}
