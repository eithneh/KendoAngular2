var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ButtonModule } from './../button/button.module';
import { ListModule } from './../listbutton/list.module';
import { SplitButtonComponent } from './splitbutton.component';
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `SplitButtonComponent`&mdash;The SplitButtonComponent component class.
 */
var SplitButtonModule = (function () {
    function SplitButtonModule() {
    }
    return SplitButtonModule;
}());
SplitButtonModule = __decorate([
    NgModule({
        declarations: [SplitButtonComponent],
        exports: [SplitButtonComponent, ListModule],
        imports: [CommonModule, PopupModule, ButtonModule, ListModule]
    })
], SplitButtonModule);
export { SplitButtonModule };
