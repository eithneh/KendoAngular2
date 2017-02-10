///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app';
//comment out this line to build and run solution
//import { ButtonsModule } from '@progress/kendo-angular-buttons';

@NgModule({
    imports: [BrowserModule
        //, ButtonsModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }