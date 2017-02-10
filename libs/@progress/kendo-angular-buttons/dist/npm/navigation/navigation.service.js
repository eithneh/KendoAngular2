"use strict";
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
var core_1 = require("@angular/core");
var util_1 = require("./../util");
var key_events_1 = require("./key-events");
var keys_1 = require("./keys");
var navigation_action_1 = require("./navigation-action");
var navigation_config_1 = require("./navigation-config");
/**
 * @hidden
 */
var NavigationService = (function () {
    function NavigationService(config) {
        this.navigate = new core_1.EventEmitter();
        this.open = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.enter = new core_1.EventEmitter();
        this.enterpress = new core_1.EventEmitter();
        this.enterup = new core_1.EventEmitter();
        this.tab = new core_1.EventEmitter();
        this.esc = new core_1.EventEmitter();
        this.useLeftRightArrows = config.useLeftRightArrows;
    }
    NavigationService.prototype.process = function (args) {
        var keyCode = args.keyCode;
        var keyEvent = args.keyEvent;
        var index;
        var action = navigation_action_1.NavigationAction.Undefined;
        if (keyEvent === key_events_1.KeyEvents.keypress) {
            if (this.isEnter(keyCode)) {
                action = navigation_action_1.NavigationAction.EnterPress;
            }
        }
        else if (keyEvent === key_events_1.KeyEvents.keyup) {
            if (this.isEnter(keyCode)) {
                action = navigation_action_1.NavigationAction.EnterUp;
            }
        }
        else {
            if (args.altKey && keyCode === keys_1.Keys.down) {
                action = navigation_action_1.NavigationAction.Open;
            }
            else if (args.altKey && keyCode === keys_1.Keys.up) {
                action = navigation_action_1.NavigationAction.Close;
            }
            else if (this.isEnter(keyCode)) {
                action = navigation_action_1.NavigationAction.Enter;
            }
            else if (keyCode === keys_1.Keys.esc) {
                action = navigation_action_1.NavigationAction.Esc;
            }
            else if (keyCode === keys_1.Keys.tab) {
                action = navigation_action_1.NavigationAction.Tab;
            }
            else if (keyCode === keys_1.Keys.up || (this.useLeftRightArrows && keyCode === keys_1.Keys.left)) {
                index = this.next({
                    current: args.current,
                    start: args.max,
                    end: args.min,
                    step: -1
                });
                action = navigation_action_1.NavigationAction.Navigate;
            }
            else if (keyCode === keys_1.Keys.down || (this.useLeftRightArrows && keyCode === keys_1.Keys.right)) {
                index = this.next({
                    current: args.current,
                    start: args.min,
                    end: args.max,
                    step: 1
                });
                action = navigation_action_1.NavigationAction.Navigate;
            }
        }
        if (action !== navigation_action_1.NavigationAction.Undefined) {
            this[navigation_action_1.NavigationAction[action].toLowerCase()].emit(index);
        }
        return action;
    };
    NavigationService.prototype.isEnter = function (keyCode) {
        return keyCode === keys_1.Keys.enter || keyCode === keys_1.Keys.space;
    };
    NavigationService.prototype.next = function (args) {
        if (!util_1.isPresent(args.current)) {
            return args.start;
        }
        else {
            return args.current !== args.end ? args.current + args.step : args.end;
        }
    };
    return NavigationService;
}());
NavigationService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(navigation_config_1.NAVIGATION_CONFIG)),
    __metadata("design:paramtypes", [Object])
], NavigationService);
exports.NavigationService = NavigationService;
