import { ElementRef, Renderer, OnDestroy } from '@angular/core';
import { KendoButtonService } from './button.service';
import { Direction } from '../direction';
/**
 * Represents the Kendo UI Button component for Angular.
 */
export declare class ButtonDirective implements OnDestroy {
    private service;
    private direction;
    /**
     * Provides visual styling indicating if the Button is active.
     * By default, `togglable` is set to `false`.
     */
    togglable: boolean;
    /**
     * Adds visual weight to the Button and makes it primary.
     */
    primary: boolean;
    element: HTMLElement;
    renderer: Renderer;
    isDisabled: boolean;
    isIcon: boolean;
    isIconClass: boolean;
    imageNode: HTMLImageElement;
    iconNode: HTMLElement;
    /**
     * Defines a name of an existing icon in the Kendo UI theme.
     * The icon is rendered by a `span.k-icon` element inside the Button.
     */
    icon: string;
    /**
     * Sets the selected state of the Button.
     */
    selected: boolean;
    /**
     * Sets the tabIndex of the Button.
     */
    tabIndex: number;
    /**
     * Defines a CSS class&mdash;or multiple classes separated by spaces&mdash;
     * which are applied to a `span` element inside the Button. Allows the use of custom icons.
     */
    iconClass: string;
    /**
     * Defines a URL, which is used for an `img` element inside the Button.
     * The URL can be relative or absolute. If relative, it is evaluated with relation to the web page URL.
     */
    imageUrl: string;
    /**
     * Disables the Button if set to `true`.
     */
    disabled: boolean;
    readonly classButton: boolean;
    readonly classDisabled: boolean;
    readonly classPrimary: boolean;
    readonly classActive: boolean;
    readonly classIconText: boolean;
    readonly classIcon: boolean;
    /**
     * @hidden
     */
    onClick(): void;
    readonly dir: string;
    constructor(element: ElementRef, renderer: Renderer, service: KendoButtonService, direction: Direction);
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    setAttribute(attribute: string, value: string): void;
    private hasText();
    private addImgIcon(imageUrl);
    private addIcon(classNames);
    private createFirstChildElement(tagName);
    private iconSetter(icon, insertIcon);
    private removeNodes();
    private removeImageNode();
    private removeIconNode();
    private updateIconNode();
}
