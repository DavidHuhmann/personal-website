import { Component } from "@angular/core";
import {RouterLink} from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'dqvid-footer',
    imports: [RouterLink, RouterLink, TranslatePipe],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {}
