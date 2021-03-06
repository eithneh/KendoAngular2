"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var popup_component_1 = require('./popup.component');
var POPUP_DIRECTIVES = [popup_component_1.PopupComponent];
/**
 * Represents the [NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html)
 * definition for the Popup component.
 *
 * @example
 *
 * ```ts-no-run
 * // Import the Popup module
 * import { PopupModule } from '@progress/kendo-angular-popup';
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
 *     imports:      [BrowserModule, PopupModule], // import Popup module
 *     bootstrap:    [AppComponent]
 * })
 * export class AppModule {}
 *
 * // Compile and launch the module
 * platformBrowserDynamic().bootstrapModule(AppModule);
 *
 * ```
 */
var PopupModule = (function () {
    function PopupModule() {
    }
    PopupModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [POPUP_DIRECTIVES],
                    exports: [POPUP_DIRECTIVES],
                    imports: [common_1.CommonModule]
                },] },
    ];
    /** @nocollapse */
    PopupModule.ctorParameters = [];
    return PopupModule;
}());
exports.PopupModule = PopupModule;
