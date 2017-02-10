var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonItemTemplateDirective } from './button-item-template.directive';
/**
 * @hidden
 */
var ListComponent = (function () {
    function ListComponent() {
        this.onItemClick = new EventEmitter();
        this.onItemBlur = new EventEmitter();
    }
    ListComponent.prototype.getText = function (dataItem) {
        if (dataItem) {
            return this.textField ? dataItem[this.textField] : dataItem.text || dataItem;
        }
        return undefined;
    };
    ListComponent.prototype.getIconClasses = function (dataItem) {
        var icon = dataItem.icon ? 'k-icon k-i-' + dataItem.icon : undefined;
        return _a = {},
            _a[icon || dataItem.iconClass] = true,
            _a;
        var _a;
    };
    ListComponent.prototype.onClick = function (index) {
        this.onItemClick.emit(index);
    };
    ListComponent.prototype.onBlur = function () {
        this.onItemBlur.emit();
    };
    return ListComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Array)
], ListComponent.prototype, "data", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], ListComponent.prototype, "textField", void 0);
__decorate([
    Input(),
    __metadata("design:type", ButtonItemTemplateDirective)
], ListComponent.prototype, "itemTemplate", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ListComponent.prototype, "onItemClick", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], ListComponent.prototype, "onItemBlur", void 0);
ListComponent = __decorate([
    Component({
        selector: 'kendo-button-list',
        template: "\n        <ul class=\"k-list k-reset\" unselectable=\"on\">\n            <li role=\"menuItem\" unselectable=\"on\" tabindex=\"-1\"\n                kendoButtonFocusable\n                *ngFor=\"let dataItem of data; let index = index;\"\n                [index]=\"index\"\n                [ngClass]=\"{'k-item': true, 'k-state-disabled': dataItem.disabled}\"\n                (click)=\"onClick(index)\"\n                (blur)=\"onBlur()\"\n                [attr.aria-disabled]=\"dataItem.disabled ? true : false\">\n                <template *ngIf=\"itemTemplate?.templateRef\"\n                    [templateContext]=\"{\n                        templateRef: itemTemplate?.templateRef,\n                        $implicit: dataItem\n                    }\">\n                </template>\n                <template [ngIf]=\"!itemTemplate?.templateRef\">\n                    <span\n                        *ngIf=\"dataItem.icon || dataItem.iconClass\"\n                        [ngClass]=\"getIconClasses(dataItem)\"\n                    ></span>\n                    <img\n                        *ngIf=\"dataItem.imageUrl\"\n                        class=\"k-image\"\n                        [src]=\"dataItem.imageUrl\"\n                        alt=\"\"\n                    >\n                    {{ getText(dataItem) }}\n                </template>\n            </li>\n        </ul>\n      "
    })
], ListComponent);
export { ListComponent };
