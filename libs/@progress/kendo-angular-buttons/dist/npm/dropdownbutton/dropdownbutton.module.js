"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var kendo_angular_popup_1 = require("@progress/kendo-angular-popup");
var list_module_1 = require("../listbutton/list.module");
var button_module_1 = require("../button/button.module");
var dropdownbutton_component_1 = require("./dropdownbutton.component");
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
    core_1.NgModule({
        declarations: [dropdownbutton_component_1.DropDownButtonComponent],
        exports: [dropdownbutton_component_1.DropDownButtonComponent, list_module_1.ListModule],
        imports: [common_1.CommonModule, kendo_angular_popup_1.PopupModule, list_module_1.ListModule, button_module_1.ButtonModule]
    })
], DropDownButtonModule);
exports.DropDownButtonModule = DropDownButtonModule;
