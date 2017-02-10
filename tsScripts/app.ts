import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: `    
    <h2>Uncomment the following in boot.ts to see build errors related to kendo-angular-buttons for Angular2.</h2>
    <br/>
    <h3>import ButtonsModule from '@progress/kendo-angular-buttons';</h3>
    <br/>
    <p>(Similar issues for any other Kendo UI Angular 2 components that I've tried to import...)</p>
  `
})
export class AppComponent {
    title = 'ASP.NET MVC 5 with Angular 2';
}