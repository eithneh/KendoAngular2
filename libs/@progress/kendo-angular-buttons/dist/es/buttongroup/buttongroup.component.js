var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ButtonDirective } from '../button/button.directive';
import { Component, Input, ContentChildren, QueryList, HostBinding, isDevMode, Optional, Inject } from '@angular/core';
import { KendoButtonService } from '../button/button.service';
/**
 * @hidden
 */
var ariaChecked = 'aria-checked';
/**
 * @hidden
 */
var role = 'role';
/**
 * @hidden
 */
var tabindex = 'tabindex';
/**
 * Represents the Kendo UI ButtonGroup component for Angular.
 */
var ButtonGroupComponent = (function () {
    function ButtonGroupComponent(service, direction) {
        this.service = service;
        this.direction = direction;
        /**
         * By default, the ButtonGroup selection mode is set to `multiple`.
         */
        this.selection = 'multiple';
    }
    Object.defineProperty(ButtonGroupComponent.prototype, "className", {
        get: function () {
            return 'k-button-group';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "getRole", {
        get: function () {
            return this.isSelectionSingle() ? 'radiogroup' : 'group';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonGroupComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    ButtonGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.service.buttonClicked$.subscribe(function (button) {
            if (_this.isSelectionSingle()) {
                _this.deactivate(_this.buttons.filter(function (current) { return current !== button; }));
                button.selected = true;
            }
            else {
                button.selected = !button.selected;
            }
            button.setAttribute(ariaChecked, button.selected.toString());
            button.setAttribute(tabindex, button.tabIndex.toString());
        });
    };
    ButtonGroupComponent.prototype.ngAfterContentInit = function () {
        var isRadioGroup = this.isSelectionSingle();
        var buttonsRole = isRadioGroup ? 'radio' : 'checkbox';
        var anyChecked = false;
        this.buttons.forEach(function (button) {
            button.setAttribute(ariaChecked, button.selected.toString());
            button.setAttribute(role, buttonsRole);
            if (!isRadioGroup || button.selected) {
                button.setAttribute(tabindex, button.tabIndex.toString());
            }
            else if (isRadioGroup && !button.selected) {
                button.setAttribute(tabindex, "-1");
            }
            anyChecked = anyChecked || button.selected;
        });
        if (isRadioGroup && !anyChecked) {
            this.buttons.first.setAttribute(tabindex, this.buttons.first.tabIndex.toString());
            this.buttons.last.setAttribute(tabindex, this.buttons.last.tabIndex.toString());
        }
    };
    ButtonGroupComponent.prototype.ngAfterViewChecked = function () {
        if (this.buttons.length) {
            this.buttons.first.renderer.setElementClass(this.buttons.first.element, 'k-group-start', true);
            this.buttons.last.renderer.setElementClass(this.buttons.last.element, 'k-group-end', true);
        }
    };
    ButtonGroupComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    ButtonGroupComponent.prototype.ngAfterContentChecked = function () {
        this.verifySettings();
    };
    ButtonGroupComponent.prototype.deactivate = function (buttons) {
        buttons.forEach(function (button) {
            button.selected = false;
            button.setAttribute(ariaChecked, button.selected.toString());
            button.setAttribute(tabindex, "-1");
        });
    };
    ButtonGroupComponent.prototype.verifySettings = function () {
        if (isDevMode()) {
            if (this.isSelectionSingle() && this.buttons.filter(function (button) { return button.selected; }).length > 1) {
                throw new Error('Having multiple selected buttons with single selection mode is not supported');
            }
        }
    };
    ButtonGroupComponent.prototype.isSelectionSingle = function () {
        return this.selection === 'single';
    };
    return ButtonGroupComponent;
}());
__decorate([
    Input('disabled'),
    __metadata("design:type", Boolean)
], ButtonGroupComponent.prototype, "disabled", void 0);
__decorate([
    Input('selection'),
    __metadata("design:type", String)
], ButtonGroupComponent.prototype, "selection", void 0);
__decorate([
    ContentChildren(ButtonDirective),
    __metadata("design:type", QueryList)
], ButtonGroupComponent.prototype, "buttons", void 0);
__decorate([
    HostBinding('class'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ButtonGroupComponent.prototype, "className", null);
__decorate([
    HostBinding('attr.role'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ButtonGroupComponent.prototype, "getRole", null);
__decorate([
    HostBinding('attr.dir'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ButtonGroupComponent.prototype, "dir", null);
ButtonGroupComponent = __decorate([
    Component({
        providers: [KendoButtonService],
        selector: 'kendo-buttongroup',
        template: "\n        <ng-content select=\"[kendoButton]\"></ng-content>\n    "
    }),
    __param(1, Optional()), __param(1, Inject('kendo-direction')),
    __metadata("design:paramtypes", [KendoButtonService, String])
], ButtonGroupComponent);
export { ButtonGroupComponent };
