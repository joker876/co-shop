import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-register',
    imports: [
        RouterModule
    ],
    templateUrl: './register.page.html',
    styleUrl: './register.page.scss',
    encapsulation: ViewEncapsulation.None
})
export class RegisterPage {}
