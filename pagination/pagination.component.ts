import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.css']
})
export class PaginationComponent {

    @Input('count')  private pageCount: number;
    @Input('active') private activePageIndex: number;

    @Output() public pageChange = new EventEmitter <number> ();

    private makeActive(newIndex: number): void {
        if (newIndex >= 1 && newIndex <= this.pageCount && newIndex != this.activePageIndex) {
            this.activePageIndex = newIndex;
            this.pageChange.emit(newIndex);
        }
    }

    private get pageIndexesList(): number[] {
        let indexes = [];

        for (let i = 1; i <= this.pageCount; i++) {
            indexes.push(i);
        }

        return indexes;
    }

    /**
     @param pageIndex: number - an index for each list item of numbers(page ids) to show a number or ellipsis in pagination component
     @return  Object {
               index: boolean - show a number
               ellipsis: boolean - show ellipsis
            }

     1. A number is shown for the first, last, active, previous before active, next after active
     2. An ellipsis is shown only once or two times(it is a second or a previous before last)

     @example 1(active), 2, ..., last
     @example 1, 2(active), 3, ..., last
     @example 1, 2, 3(active), 4, ..., last
     @example 1, ..., 6, 7(active), 8, ..., last
     @example 1, ..., last-2 last-1 (active), last
     @example 1, ..., last-1, last(active)
     */
    private show(pageIndex: number): {index: boolean, ellipsis: boolean} {

        let showIndex = false;
        let showEllipsis = false;

        let active = this.activePageIndex;
        let last = this.pageCount;

        if (pageIndex == 1 || pageIndex == active -1 || pageIndex == active || pageIndex == active + 1 || pageIndex == last) {
            showIndex = true;
        }

        if (1 <= active && (active <= last - 3)) {
            if (pageIndex == last - 1) {
                showEllipsis = true;
            }
        }
        if (4 <= active && active <= last) {
            if (pageIndex == 2) {
                showEllipsis = true;
            }
        }

        return {
            index: showIndex,
            ellipsis: showEllipsis
        };
    }
}
