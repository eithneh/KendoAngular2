"use strict";
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/fromEvent");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/merge");
var key_events_1 = require("./../navigation/key-events");
var navigation_action_1 = require("./../navigation/navigation-action");
var util_1 = require("./../util");
/**
 * @hidden
 */
var ListButton = (function () {
    function ListButton(focusService, navigationService, wrapperRef, renderer) {
        this.focusService = focusService;
        this.navigationService = navigationService;
        this.wrapperRef = wrapperRef;
        this.renderer = renderer;
        this._open = false;
        this._disabled = false;
        this._active = false;
        this._popupSettings = { animate: true, popupClass: '' };
        this.listId = util_1.guid();
        this._isFocused = false;
        this.wrapperBlurred = new core_1.EventEmitter();
        this.focusService = focusService;
        this.navigationService = navigationService;
        this.wrapper = wrapperRef.nativeElement;
        this.renderer = renderer;
        this.subscribeEvents();
    }
    Object.defineProperty(ListButton.prototype, "popupClasses", {
        get: function () {
            var popupClasses = [
                'k-list-container',
                'k-reset',
                'k-group'
            ];
            if (this._popupSettings.popupClass) {
                popupClasses.push(this._popupSettings.popupClass);
            }
            return popupClasses.join(' ');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ListButton.prototype.togglePopupVisibility = function () {
        if (this._disabled) {
            return;
        }
        this._open = !this._open;
        if (!this._open) {
            this.focusService.focus(-1);
        }
    };
    ListButton.prototype.onItemClick = function (index) {
        var _this = this;
        this.emitItemClickHandler(index);
        setTimeout(function () { _this.focusWrapper(); }, 1);
    };
    ListButton.prototype.ngOnDestroy = function () {
        this.unsubscribeEvents();
    };
    ListButton.prototype.subscribeEvents = function () {
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        this.subscribeListItemFocusEvent();
        this.subscribeComponentBlurredEvent();
        this.subscribeNavigationEvents();
    };
    ListButton.prototype.subscribeListItemFocusEvent = function () {
        var _this = this;
        this.focusSubscription = this.focusService.onFocus.subscribe(function () {
            _this._isFocused = true;
        });
    };
    ListButton.prototype.subscribeComponentBlurredEvent = function () {
        var _this = this;
        this.documentClick = Observable_1.Observable
            .fromEvent(document, 'click')
            .filter(function (event) {
            return !_this.wrapperContains(event.target);
        });
        this.componentBlurredSubscription = this.wrapperBlurred
            .merge(this.navigationService.tab, this.documentClick)
            .subscribe(function () {
            _this.blurWrapper();
        });
    };
    ListButton.prototype.subscribeNavigationEvents = function () {
        var _this = this;
        this.navigationSubscription = this.navigationService.navigate
            .subscribe(this.focusService.focus.bind(this.focusService));
        this.enterPressSubscription = this.navigationService.enterpress.subscribe(function () {
            if (!_this._disabled && !_this._open) {
                _this._active = true;
            }
        });
        this.enterUpSubscription = this.navigationService.enterup.subscribe(function () {
            if (!_this._open) {
                _this._active = false;
            }
            _this.enterHanlder();
            _this.focusWrapper();
        });
        this.openSubscription = this.navigationService.open.subscribe(function () {
            if (!_this._open) {
                _this.togglePopupVisibility();
                _this.focusFirstItem();
            }
            else {
                _this.focusWrapper();
            }
        });
        this.closeSubscription = this.navigationService.close
            .merge(this.navigationService.esc)
            .subscribe(function () {
            _this.focusWrapper();
        });
    };
    ListButton.prototype.enterHanlder = function () { }; // tslint:disable-line
    ListButton.prototype.unsubscribeEvents = function () {
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        this.unsubscribe(this.componentBlurredSubscription);
        this.unsubscribe(this.focusSubscription);
        this.unsubscribe(this.navigationSubscription);
        this.unsubscribe(this.enterPressSubscription);
        this.unsubscribe(this.enterUpSubscription);
        this.unsubscribe(this.openSubscription);
        this.unsubscribe(this.closeSubscription);
    };
    ListButton.prototype.unsubscribe = function (subscription) {
        if (subscription) {
            subscription.unsubscribe();
        }
    };
    ListButton.prototype.keyDownHandler = function (event) {
        this.keyHandler(event);
    };
    ListButton.prototype.keyPressHandler = function (event) {
        this.keyHandler(event, key_events_1.KeyEvents.keypress);
    };
    ListButton.prototype.keyUpHandler = function (event) {
        this.keyHandler(event, key_events_1.KeyEvents.keyup);
    };
    /**
     * @hidden
     */
    ListButton.prototype.keyHandler = function (event, keyEvent) {
        if (this._disabled) {
            return;
        }
        var focused = this.focusService.focused || 0;
        var eventData = event;
        var action = this.navigationService.process({
            altKey: eventData.altKey,
            current: focused,
            keyCode: eventData.keyCode,
            keyEvent: keyEvent,
            max: this._data ? this._data.length - 1 : 0,
            min: 0
        });
        if (action !== navigation_action_1.NavigationAction.Undefined &&
            action !== navigation_action_1.NavigationAction.Tab &&
            (action !== navigation_action_1.NavigationAction.Enter || (action === navigation_action_1.NavigationAction.Enter && this._open))) {
            eventData.preventDefault();
        }
    };
    ListButton.prototype.emitItemClickHandler = function (index) {
        var dataItem = this._data[index];
        if (this._itemClick) {
            this._itemClick.emit(dataItem);
        }
        if (dataItem && dataItem.click && !dataItem.disabled) {
            dataItem.click(dataItem);
        }
    };
    ListButton.prototype.focusFirstItem = function () {
        var _this = this;
        if (this._data && util_1.isPresent(this._data[0])) {
            setTimeout(function () { _this.focusService.focus(0); }, 1);
        }
    };
    ListButton.prototype.focusWrapper = function () {
        if (this._open) {
            this.togglePopupVisibility();
            this.renderer.invokeElementMethod(this.wrapper, 'focus');
        }
    };
    ListButton.prototype.blurHandler = function () {
        var _this = this;
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        setTimeout(function () {
            if (!_this.wrapperContains(document.activeElement)) {
                _this.blurWrapper();
            }
        });
    };
    ListButton.prototype.wrapperContains = function (element) {
        return this.wrapper === element || this.wrapper.contains(element);
    };
    ListButton.prototype.blurWrapper = function () {
        if (this._open) {
            this.togglePopupVisibility();
        }
        this._isFocused = false;
    };
    return ListButton;
}());
exports.ListButton = ListButton;
