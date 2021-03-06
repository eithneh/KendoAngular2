import { DOMService } from './dom.service';
import { OffsetPosition as Offset } from '@progress/kendo-popup-common';
import { AlignElementSettings } from '../models/align-element-settings.interface';
/**
 * @hidden
 */
export declare class AlignService {
    private _dom;
    constructor(_dom: DOMService);
    alignElement(settings: AlignElementSettings): Offset;
}
