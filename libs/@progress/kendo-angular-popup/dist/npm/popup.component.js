"use strict";
var core_1 = require('@angular/core');
var align_service_1 = require('./services/align.service');
var dom_service_1 = require('./services/dom.service');
var position_service_1 = require('./services/position.service');
var resize_service_1 = require('./services/resize.service');
var scrollable_service_1 = require('./services/scrollable.service');
var util_1 = require('./util');
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
var PopupComponent = (function () {
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
        this.anchorViewportLeave = new core_1.EventEmitter();
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
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        var _a = this.position(), flipped = _a.flipped, offset = _a.offset;
        var newDirection = this.getDirection(flipped);
        if (this.direction === newDirection && !util_1.isDifferentOffset(this.currentOffset, offset)) {
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
        if (!util_1.isDocumentAvailable()) {
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
        { type: core_1.Component, args: [{
                    animations: [
                        core_1.trigger('toggle', [
                            core_1.transition('void => down, up => down', [
                                core_1.style({ transform: 'translateY(-100%)' }),
                                core_1.animate('0.2s ease-in', core_1.style({ transform: 'translateY(0)' }))
                            ]),
                            core_1.transition('down => void', [
                                core_1.style({ transform: 'translateY(0)' }),
                                core_1.animate('0.2s ease-in', core_1.style({ transform: 'translateY(-100%)' }))
                            ]),
                            core_1.transition('void => up, down => up', [
                                core_1.style({ transform: 'translateY(100%)' }),
                                core_1.animate('0.2s ease-in', core_1.style({ transform: 'translateY(0)' }))
                            ]),
                            core_1.transition('up => void', [
                                core_1.style({ transform: 'translateY(0)' }),
                                core_1.animate('0.2s ease-in', core_1.style({ transform: 'translateY(100%)' }))
                            ])
                        ])
                    ],
                    exportAs: 'kendo-popup',
                    providers: [align_service_1.AlignService, dom_service_1.DOMService, position_service_1.PositionService, resize_service_1.ResizeService, scrollable_service_1.ScrollableService],
                    selector: 'kendo-popup',
                    template: "\n        <div class=\"k-popup\" [ngClass]=\"popupClass\" [@toggle]=\"direction\">\n            <ng-content></ng-content>\n        </div>\n     "
                },] },
    ];
    /** @nocollapse */
    PopupComponent.ctorParameters = [
        { type: align_service_1.AlignService, },
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: position_service_1.PositionService, },
        { type: resize_service_1.ResizeService, },
        { type: scrollable_service_1.ScrollableService, },
        { type: core_1.Renderer, },
    ];
    PopupComponent.propDecorators = {
        'animate': [{ type: core_1.Input },],
        'anchor': [{ type: core_1.Input },],
        'anchorAlign': [{ type: core_1.Input },],
        'collision': [{ type: core_1.Input },],
        'popupAlign': [{ type: core_1.Input },],
        'popupClass': [{ type: core_1.Input },],
        'offset': [{ type: core_1.Input },],
        'anchorViewportLeave': [{ type: core_1.Output },],
        'offsetLeft': [{ type: core_1.HostBinding, args: ['style.left.px',] },],
        'offsetTop': [{ type: core_1.HostBinding, args: ['style.top.px',] },],
    };
    return PopupComponent;
}());
exports.PopupComponent = PopupComponent;
