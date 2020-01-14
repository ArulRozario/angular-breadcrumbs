import { Route } from '@angular/router';

export class Breadcrumb {
    displayName: string;
    terminal: boolean;
    url: string;
    routeData?: any;
    route: Route | null;
}
