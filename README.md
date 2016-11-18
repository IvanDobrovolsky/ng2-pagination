# ng2-pagination

Simple angular2 pagination component implementation

## Usage:

```html
<pagination [count]="pageCount" [active]="pageIndexActive" (pageChange)="renderNewPage($event)"></pagination>
```
1. Bind `count` and `active` props with `pageCount` and `pageIndexActive` variables respectively. 
2. Register the callback function `renderNewPage()` that takes a number which is `currentPageIndex`
