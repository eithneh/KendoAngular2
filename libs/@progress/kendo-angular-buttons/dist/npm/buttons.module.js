"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var button_module_1 = require("./button/button.module");
var buttongroup_module_1 = require("./buttongroup/buttongroup.module");
var splitbutton_module_1 = require("./splitbutton/splitbutton.module");
var dropdownbutton_module_1 = require("./dropdownbutton/dropdownbutton.module");
/**
 * Represents the [NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
 * definition for the Buttons components.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Buttons module
 * import { ButtonsModule } from '@progress/kendo-angular-buttons';
 *
 * // The browser platform with a compiler
 * import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 *
 * import { NgModule } from '@angular/core';
 *
 * // Import the app component
 * import { AppComponent } from './app.component';
 *
 * // Define the app module
 * @@NgModule({
 *     declarations: [AppComponent], // declare app component
 *     imports:      [BrowserModule, ButtonsModule], // import Buttons module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var ButtonsModule = (function () {
    function ButtonsModule() {
    }
    return ButtonsModule;
}());
ButtonsModule = __decorate([
    core_1.NgModule({
        exports: [buttongroup_module_1.ButtonGroupModule, button_module_1.ButtonModule, splitbutton_module_1.SplitButtonModule, dropdownbutton_module_1.DropDownButtonModule]
    })
], ButtonsModule);
exports.ButtonsModule = ButtonsModule;
