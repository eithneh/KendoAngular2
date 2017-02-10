import { ButtonDirective } from '../button/button.directive';
import { QueryList, OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterContentInit } from '@angular/core';
import { ButtonGroupSelection } from '../button/selection-settings';
import { KendoButtonService } from '../button/button.service';
import { Direction } from '../direction';
/**
 * Represents the Kendo UI ButtonGroup component for Angular.
 */
export declare class ButtonGroupComponent implements OnInit, OnDestroy, AfterContentChecked, AfterViewChecked, AfterContentInit {
    private service;
    private direction;
    /**
     * By default, the ButtonGroup is enabled.
     * To disable the underlying Buttons, use their own `disabled` attribute.
     *
     * For the API of the Button, refer to its
     * [configuration options article]({% slug api_buttons_buttondirective_kendouiforangular %}).
     */
    disabled: boolean;
    /**
     * By default, the ButtonGroup selection mode is set to `multiple`.
     */
    selection: ButtonGroupSelection;
    buttons: QueryList<ButtonDirective>;
    readonly className: string;
    readonly getRole: string;
    readonly dir: string;
    constructor(service: KendoButtonService, direction: Direction);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    ngAfterContentChecked(): void;
    protected deactivate(buttons: Array<ButtonDirective>): void;
    private subscription;
    private verifySettings();
    private isSelectionSingle();
}
