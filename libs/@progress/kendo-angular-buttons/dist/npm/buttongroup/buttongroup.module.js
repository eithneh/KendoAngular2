"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var button_module_1 = require("../button/button.module");
var buttongroup_component_1 = require("./buttongroup.component");
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `ButtonGroupComponent`&mdash;The ButtonGroupComponent component class.
 */
var ButtonGroupModule = (function () {
    function ButtonGroupModule() {
    }
    return ButtonGroupModule;
}());
ButtonGroupModule = __decorate([
    core_1.NgModule({
        declarations: [buttongroup_component_1.ButtonGroupComponent],
        exports: [buttongroup_component_1.ButtonGroupComponent],
        imports: [common_1.CommonModule, button_module_1.ButtonModule]
    })
], ButtonGroupModule);
exports.ButtonGroupModule = ButtonGroupModule;
