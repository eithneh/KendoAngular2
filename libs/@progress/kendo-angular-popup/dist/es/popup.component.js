import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer, trigger, style, transition, animate } from '@angular/core';
import { AlignService } from './services/align.service';
import { DOMService } from './services/dom.service';
import { PositionService } from './services/position.service';
import { ResizeService } from './services/resize.service';
import { ScrollableService } from './services/scrollable.service';
import { isDifferentOffset, isDocumentAvailable } from './util';
var DEFAULT_OFFSET = { left: 0, top: 0 };
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
export var PopupComponent = (function () {
    function PopupComponent(_alignService, container, _cdr, _positionService, _resizeService, _scrollableService, _renderer) {
        this._alignService = _alignService;
        this.container = container;
        this._cdr = _cdr;
        this._positionService = _positionService;
        this._resizeService = _resizeService;
        this._scrollableService = _scrollableService;
        this._renderer = _renderer;
        /**
         * Controls the Popup animation. By default, the open and close animation are enabled.
         *
         * For more information, refer to the section on
         * [`Animation Control`]({% slug overview_popup_kendouiforangular %}#toc-animation-control).
         */
        this.animate = true;
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
        this.anchorAlign = { horizontal: 'left', vertical: 'bottom' };
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
        this.collision = { horizontal: 'fit', vertical: 'flip' };
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
        this.popupAlign = { horizontal: 'left', vertical: 'top' };
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
        this.offset = DEFAULT_OFFSET;
        /**
         * The `anchorViewportLeave` event is triggered when the anchor
         * is scrolled outside the screen boundaries.
         *
         * For more information, refer to the section on
         * [`On Scrolling outside the Viewport`]({% slug overview_popup_kendouiforangular %}#toc-on-scrolling-outside-the-viewport).
         */
        this.anchorViewportLeave = new EventEmitter();
        /**
         * @hidden
         */
        this.direction = 'down';
        this.currentOffset = DEFAULT_OFFSET;
        this.resolvedPromised = Promise.resolve(null);
        _renderer.setElementClass(container.nativeElement, 'k-animation-container', true);
        _renderer.setElementClass(container.nativeElement, 'k-animation-container-fixed', true);
    }
    Object.defineProperty(PopupComponent.prototype, "offsetLeft", {
        /**
         * @hidden
         */
        get: function () {
            return this.currentOffset.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupComponent.prototype, "offsetTop", {
        /**
         * @hidden
         */
        get: function () {
            return this.currentOffset.top;
        },
        enumerable: true,
        configurable: true
    });
    PopupComponent.prototype.ngOnInit = function () {
        var repositionCallback = this.reposition.bind(this);
        this._resizeService.subscribe(repositionCallback);
        this._scrollableService.forElement(this.anchor || this.container).subscribe(this.onScroll.bind(this));
    };
    PopupComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        var _a = this.position(), flipped = _a.flipped, offset = _a.offset;
        var newDirection = this.getDirection(flipped);
        if (this.direction === newDirection && !isDifferentOffset(this.currentOffset, offset)) {
            return;
        }
        this.resolvedPromised.then(function () {
            _this.currentOffset = offset;
            _this.direction = newDirection;
            _this._cdr.markForCheck();
        });
    };
    PopupComponent.prototype.ngOnDestroy = function () {
        this._resizeService.unsubscribe();
        this._scrollableService.unsubscribe();
    };
    PopupComponent.prototype.reposition = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        var _a = this.position(), flipped = _a.flipped, offset = _a.offset;
        this.direction = this.getDirection(flipped);
        this.currentOffset = offset;
    };
    PopupComponent.prototype.position = function () {
        var alignedOffset = this._alignService.alignElement({
            anchor: this.anchor,
            anchorAlign: this.anchorAlign,
            element: this.container,
            elementAlign: this.popupAlign,
            offset: this.offset
        });
        return this._positionService.positionElement({
            anchor: this.anchor,
            anchorAlign: this.anchorAlign,
            collisions: this.collision,
            currentLocation: alignedOffset,
            element: this.container,
            elementAlign: this.popupAlign
        });
    };
    PopupComponent.prototype.getDirection = function (flipped) {
        return this.animate ? (flipped ? 'up' : 'down') : 'none';
    };
    PopupComponent.prototype.onScroll = function (isInViewPort) {
        if (isInViewPort) {
            this.reposition();
        }
        else {
            this.anchorViewportLeave.emit();
        }
    };
    PopupComponent.decorators = [
        { type: Component, args: [{
                    animations: [
                        trigger('toggle', [
                            transition('void => down, up => down', [
                                style({ transform: 'translateY(-100%)' }),
                                animate('0.2s ease-in', style({ transform: 'translateY(0)' }))
                            ]),
                            transition('down => void', [
                                style({ transform: 'translateY(0)' }),
                                animate('0.2s ease-in', style({ transform: 'translateY(-100%)' }))
                            ]),
                            transition('void => up, down => up', [
                                style({ transform: 'translateY(100%)' }),
                                animate('0.2s ease-in', style({ transform: 'translateY(0)' }))
                            ]),
                            transition('up => void', [
                                style({ transform: 'translateY(0)' }),
                                animate('0.2s ease-in', style({ transform: 'translateY(100%)' }))
                            ])
                        ])
                    ],
                    exportAs: 'kendo-popup',
                    providers: [AlignService, DOMService, PositionService, ResizeService, ScrollableService],
                    selector: 'kendo-popup',
                    template: "\n        <div class=\"k-popup\" [ngClass]=\"popupClass\" [@toggle]=\"direction\">\n            <ng-content></ng-content>\n        </div>\n     "
                },] },
    ];
    /** @nocollapse */
    PopupComponent.ctorParameters = [
        { type: AlignService, },
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
        { type: PositionService, },
        { type: ResizeService, },
        { type: ScrollableService, },
        { type: Renderer, },
    ];
    PopupComponent.propDecorators = {
        'animate': [{ type: Input },],
        'anchor': [{ type: Input },],
        'anchorAlign': [{ type: Input },],
        'collision': [{ type: Input },],
        'popupAlign': [{ type: Input },],
        'popupClass': [{ type: Input },],
        'offset': [{ type: Input },],
        'anchorViewportLeave': [{ type: Output },],
        'offsetLeft': [{ type: HostBinding, args: ['style.left.px',] },],
        'offsetTop': [{ type: HostBinding, args: ['style.top.px',] },],
    };
    return PopupComponent;
}());
