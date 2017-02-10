var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ListModule } from '../listbutton/list.module';
import { ButtonModule } from '../button/button.module';
import { DropDownButtonComponent } from './dropdownbutton.component';
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `DropDownButtonComponent`&mdash;The DropDownButtonComponent component class.
 */
var DropDownButtonModule = (function () {
    function DropDownButtonModule() {
    }
    return DropDownButtonModule;
}());
DropDownButtonModule = __decorate([
    NgModule({
        declarations: [DropDownButtonComponent],
        exports: [DropDownButtonComponent, ListModule],
        imports: [CommonModule, PopupModule, ListModule, ButtonModule]
    })
], DropDownButtonModule);
export { DropDownButtonModule };
