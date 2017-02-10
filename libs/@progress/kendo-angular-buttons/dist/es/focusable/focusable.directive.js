var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, HostBinding, ElementRef, Renderer } from '@angular/core';
import { FocusService } from './focus.service';
import { isDocumentAvailable } from './../util';
/**
 * @hidden
 */
var FocusableDirective = (function () {
    function FocusableDirective(focusService, elementRef, renderer) {
        this.focusService = focusService;
        this.renderer = renderer;
        this.element = elementRef.nativeElement;
        this.subscribeEvents();
    }
    Object.defineProperty(FocusableDirective.prototype, "focusedClassName", {
        get: function () {
            return this.focusService.isFocused(this.index);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    FocusableDirective.prototype.ngOnDestroy = function () {
        this.unsubscribeEvents();
    };
    FocusableDirective.prototype.subscribeEvents = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.focusSubscription = this.focusService.onFocus.subscribe(function (index) {
            if (_this.index === index) {
                _this.renderer.invokeElementMethod(_this.element, 'focus');
            }
        });
    };
    FocusableDirective.prototype.unsubscribeEvents = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        if (this.focusSubscription) {
            this.focusSubscription.unsubscribe();
        }
    };
    return FocusableDirective;
}());
__decorate([
    Input(),
    __metadata("design:type", Number)
], FocusableDirective.prototype, "index", void 0);
__decorate([
    HostBinding('class.k-state-focused'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], FocusableDirective.prototype, "focusedClassName", null);
FocusableDirective = __decorate([
    Directive({
        selector: '[kendoButtonFocusable]'
    }),
    __metadata("design:paramtypes", [FocusService, ElementRef, Renderer])
], FocusableDirective);
export { FocusableDirective };
