import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { TranslatePipe } from '@ngx-translate/core'
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'dqvid-error-404',
    imports: [RouterLink, TranslatePipe, ButtonModule],
    templateUrl: './error-404.component.html',
    styleUrl: './error-404.component.css'
})
export class Error404Component {}
