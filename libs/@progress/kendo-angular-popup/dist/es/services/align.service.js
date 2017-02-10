import { Injectable } from '@angular/core';
import { DOMService } from './dom.service';
import { eitherRect } from '../util';
/**
 * @hidden
 */
export var AlignService = (function () {
    function AlignService(_dom) {
        this._dom = _dom;
    }
    AlignService.prototype.alignElement = function (settings) {
        var anchor = settings.anchor, element = settings.element, anchorAlign = settings.anchorAlign, elementAlign = settings.elementAlign, offset = settings.offset;
        var anchorRect = eitherRect(this._dom.normalizedOffset(anchor), offset);
        var elementRect = this._dom.normalizedOffset(element);
        if (!anchor) {
            anchorRect = this._dom.removeScroll(anchorRect, this._dom.scrollPosition(element));
        }
        return this._dom.align({
            anchorAlign: anchorAlign,
            anchorRect: anchorRect,
            elementAlign: elementAlign,
            elementRect: elementRect
        });
    };
    AlignService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AlignService.ctorParameters = [
        { type: DOMService, },
    ];
    return AlignService;
}());
