# Angular Breadcrumb

## Installation

```shell
npm install ng8-breadcrumbs --save
```

#### 1. Import the `BreadcrumbModule`

Import `BreadcrumbModule` in the NgModule of your application.

```typescript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BreadcrumbModule } from "angular8-breadcrumbs";

@NgModule({
  imports: [BrowserModule, BreadcrumbModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

#### 2. Set breadcumbs in `app.routes`

```javascript
export const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', ..., data: { breadcrumb: 'Home'}},
    {path: 'about', ..., data: { breadcrumb: 'About'}},
    {path: 'github', ..., data: { breadcrumb: 'GitHub'},
        children: [
            {path: '', ...},
            {path: ':org', ..., data: { breadcrumb: 'Repo List'},
                children: [
                    {path: '', ...},
                    {path: ':repo', ..., data: { breadcrumb: 'Repo',navigable:true}}
                ]
        }]
    }
];
```

#### 3. Update the markup

- Import the `style.css` into your web page
- Add `<breadcrumb></breadcrumb>` tag in template of your application component.

## Customization

### Template Customization

You can BYO template using the breadcrumb's ng-content transclude.

#### bootstrap breadcrumb:

```html
<breadcrumb #parent>
  <ol class="breadcrumb">
    <ng-container *ngFor="let breadcrumb of parent.breadcrumbs">
      <li *ngIf="!breadcrumb.terminal" class="breadcrumb-item">
        <a
          href=""
          *ngIf="breadcrumb.routeData?.navigable"
          [routerLink]="[breadcrumb.url]"
          >{{ breadcrumb.displayName }}</a
        >
        <a href="" *ngIf="!breadcrumb.routeData?.navigable"
          >{{ breadcrumb.displayName }}</a
        >
      </li>
      <li
        *ngIf="breadcrumb.terminal"
        class="breadcrumb-item active"
        aria-current="page"
      >
        {{ breadcrumb.displayName }}
      </li>
    </ng-container>
  </ol>
</breadcrumb>
```

#### @angular/material breadcrumb

```html
<breadcrumb #parent>
  <span class="breadcrumb" *ngFor="let breadcrumb of parent.breadcrumbs">
    <a
      mat-button
      *ngIf="!breadcrumb.terminal"
      href=""
      [routerLink]="[breadcrumb.url]"
      >{{ breadcrumb.displayName }}</a
    >
    <a mat-button *ngIf="breadcrumb.terminal">{{ breadcrumb.displayName }}</a>
  </span>
</breadcrumb>
```

#### primeng breadcrumb

```html
<p-breadcrumb [model]="breadcrumbs"></p-breadcrumb>
```

```typescript
export class AppComponent {
  breadcrumbs: MenuItem[];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.breadcrumbService.breadcrumbChanged.subscribe(crumbs => {
      this.breadcrumbs = crumbs.map(c => this.toPrimeNgMenuItem(c));
    });
  }

  private toPrimeNgMenuItem(crumb: Breadcrumb) {
    return <MenuItem>{ label: crumb.displayName, url: `#${crumb.url}` };
  }
}
```

### Dynamic breadcrumbs

Use `BreadcrumbService` to set the breadcrumb description dynamically.

```typescript
ngOnInit() {
  ...
  this.github
    .getRepoForOrg(this.org, this.repo)
    .subscribe(repoDetails => {
        ...
        this.breadcrumbService.changeBreadcrumb(this.breadcrumb.snapshot, repoDetails.name);

  });
  ...
}
```

### Dynamic page titles

Use `BreadcrumbService` to subscribe to breadcrumb changes.

```typescript
ngOnInit() {
  this.breadcrumbService.breadcrumbChanged.subscribe((crumbs) => {
    this.titleService.setTitle(this.createTitle(crumbs));
  });
}
```

# License

[MIT](/LICENSE)
