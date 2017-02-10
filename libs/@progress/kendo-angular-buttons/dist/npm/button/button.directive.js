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
var button_service_1 = require("./button.service");
var util_1 = require("../util");
/**
 * Represents the Kendo UI Button component for Angular.
 */
var ButtonDirective = (function () {
    function ButtonDirective(element, renderer, service, direction) {
        this.service = service;
        this.direction = direction;
        /**
         * Provides visual styling indicating if the Button is active.
         * By default, `togglable` is set to `false`.
         */
        this.togglable = false;
        /**
         * Adds visual weight to the Button and makes it primary.
         */
        this.primary = false;
        this.isDisabled = false;
        this.isIcon = false;
        this.isIconClass = false;
        /**
         * Sets the selected state of the Button.
         */
        this.selected = false;
        /**
         * Sets the tabIndex of the Button.
         */
        this.tabIndex = 0;
        this.element = element.nativeElement;
        this.renderer = renderer;
    }
    Object.defineProperty(ButtonDirective.prototype, "icon", {
        /**
         * Defines a name of an existing icon in the Kendo UI theme.
         * The icon is rendered by a `span.k-icon` element inside the Button.
         */
        set: function (icon) {
            var _this = this;
            if (icon) {
                this.iconSetter(icon, function () {
                    _this.isIcon = true;
                    var classes = 'k-icon k-i-' + icon;
                    _this.addIcon(classes);
                });
            }
            else {
                this.isIcon = false;
                this.updateIconNode();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "iconClass", {
        /**
         * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
         * which are applied to a `span` element inside the Button. Allows the use of custom icons.
         */
        set: function (iconClassName) {
            var _this = this;
            if (iconClassName) {
                this.iconSetter(iconClassName, function () {
                    _this.isIconClass = true;
                    _this.addIcon(iconClassName);
                });
            }
            else {
                this.isIconClass = false;
                this.updateIconNode();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "imageUrl", {
        /**
         * Defines a URL, which is used for an `img` element inside the Button.
         * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
         */
        set: function (imageUrl) {
            if (imageUrl) {
                this.iconSetter(imageUrl, this.addImgIcon.bind(this));
            }
            else {
                this.removeImageNode();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "disabled", {
        /**
         * Disables the Button if set to `true`.
         */
        set: function (disabled) {
            this.isDisabled = disabled;
            this.renderer.setElementProperty(this.element, 'disabled', disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "classButton", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "classDisabled", {
        get: function () {
            return this.isDisabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "classPrimary", {
        get: function () {
            return this.primary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "classActive", {
        get: function () {
            return this.selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "classIconText", {
        get: function () {
            return this.isIcon && this.hasText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtonDirective.prototype, "classIcon", {
        get: function () {
            return this.isIcon && !this.hasText();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    ButtonDirective.prototype.onClick = function () {
        if (!this.togglable) {
            return;
        }
        if (!this.disabled && this.service) {
            this.service.click(this);
        }
        if (!this.service) {
            this.selected = !this.selected;
        }
    };
    Object.defineProperty(ButtonDirective.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    ButtonDirective.prototype.ngOnDestroy = function () {
        this.removeNodes();
    };
    /**
     * @hidden
     */
    ButtonDirective.prototype.setAttribute = function (attribute, value) {
        this.renderer.setElementAttribute(this.element, attribute, value);
    };
    ButtonDirective.prototype.hasText = function () {
        var textContent = 0;
        if (util_1.isDocumentAvailable()) {
            textContent = this.element.innerText.length;
        }
        return textContent > 0;
    };
    ButtonDirective.prototype.addImgIcon = function (imageUrl) {
        var renderer = this.renderer;
        if (this.imageNode) {
            renderer.setElementProperty(this.imageNode, 'src', imageUrl);
        }
        else if (util_1.isDocumentAvailable()) {
            this.imageNode = this.createFirstChildElement('img');
            renderer.setElementProperty(this.imageNode, 'src', imageUrl);
            renderer.setElementProperty(this.imageNode, 'className', 'k-image');
            renderer.setElementAttribute(this.imageNode, 'role', 'presentation');
        }
    };
    ButtonDirective.prototype.addIcon = function (classNames) {
        var renderer = this.renderer;
        if (this.iconNode) {
            renderer.setElementProperty(this.iconNode, 'className', classNames);
        }
        else if (util_1.isDocumentAvailable()) {
            this.iconNode = this.createFirstChildElement('span');
            renderer.setElementProperty(this.iconNode, 'className', classNames);
            renderer.setElementAttribute(this.iconNode, 'role', 'presentation');
        }
    };
    ButtonDirective.prototype.createFirstChildElement = function (tagName) {
        var node = this.renderer.createElement(this.element, tagName);
        if (node !== this.element.firstChild) {
            this.renderer.invokeElementMethod(this.element, 'insertBefore', [node, this.element.firstChild]);
        }
        return node;
    };
    ButtonDirective.prototype.iconSetter = function (icon, insertIcon) {
        if (icon) {
            insertIcon(icon);
        }
    };
    ButtonDirective.prototype.removeNodes = function () {
        this.removeImageNode();
        this.removeIconNode();
    };
    ButtonDirective.prototype.removeImageNode = function () {
        if (this.imageNode) {
            this.renderer.invokeElementMethod(this.element, 'removeChild', [this.imageNode]);
            this.imageNode = undefined;
        }
    };
    ButtonDirective.prototype.removeIconNode = function () {
        if (this.iconNode) {
            this.renderer.invokeElementMethod(this.element, 'removeChild', [this.iconNode]);
            this.iconNode = undefined;
        }
    };
    ButtonDirective.prototype.updateIconNode = function () {
        if (!this.isIcon && !this.isIconClass) {
            this.removeIconNode();
        }
    };
    return ButtonDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonDirective.prototype, "togglable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonDirective.prototype, "primary", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ButtonDirective.prototype, "icon", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonDirective.prototype, "selected", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ButtonDirective.prototype, "tabIndex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ButtonDirective.prototype, "iconClass", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ButtonDirective.prototype, "imageUrl", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ButtonDirective.prototype, "disabled", null);
__decorate([
    core_1.HostBinding('class.k-button'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ButtonDirective.prototype, "classButton", null);
__decorate([
    core_1.HostBinding('class.k-state-disabled'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ButtonDirective.prototype, "classDisabled", null);
__decorate([
    core_1.HostBinding('class.k-primary'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ButtonDirective.prototype, "classPrimary", null);
__decorate([
    core_1.HostBinding('class.k-state-active'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ButtonDirective.prototype, "classActive", null);
__decorate([
    core_1.HostBinding('class.k-button-icontext'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ButtonDirective.prototype, "classIconText", null);
__decorate([
    core_1.HostBinding('class.k-button-icon'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ButtonDirective.prototype, "classIcon", null);
__decorate([
    core_1.HostListener('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ButtonDirective.prototype, "onClick", null);
__decorate([
    core_1.HostBinding('attr.dir'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ButtonDirective.prototype, "dir", null);
ButtonDirective = __decorate([
    core_1.Directive({
        selector: 'button[kendoButton]' // tslint:disable-line
    }),
    __param(2, core_1.Optional()),
    __param(3, core_1.Optional()), __param(3, core_1.Inject('kendo-direction')),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer,
        button_service_1.KendoButtonService, String])
], ButtonDirective);
exports.ButtonDirective = ButtonDirective;
