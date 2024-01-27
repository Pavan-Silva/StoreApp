import {Component, OnInit} from '@angular/core';
import {item} from "../../../core/models/item.model";
import {AuthorizationService} from "../../../core/services/auth/authorization.service";
import {MatDialog} from "@angular/material/dialog";
import {ItemService} from "../../../core/services/item/item.service";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {ItemFormComponent} from "../item-form/item-form.component";
import {NotificationSnackBarComponent} from "../../../shared/notification-snack-bar/notification-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {PageLoadingComponent} from "../../../shared/page-loading/page-loading.component";
import {ErrorComponent} from "../../../shared/error/error.component";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    PageLoadingComponent,
    ErrorComponent
  ],
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {

  protected hasUpdateAuthority = false;
  protected hasDeleteAuthority = false;

  items:item[] = [];

  isFailed = false;
  isLoading = false;

  currentSearchQuery = '';
  currentSearchParam = '';

  constructor(
    private itemService:ItemService,
    private authorizationService:AuthorizationService,
    private dialog:MatDialog,
    private snackBar:MatSnackBar,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.hasUpdateAuthority = this.authorizationService.hasAuthority('Items-Update');
    this.hasDeleteAuthority = this.authorizationService.hasAuthority('Items-Delete');

    this.route.queryParams.subscribe((params:any) =>{
      if (params.query && params.filter) {
        this.currentSearchParam = params.filter;
        this.currentSearchQuery = params.query;
        this.searchItemsWithCurrentQuery();
      }

      else this.refreshItemList();
    });
  }

  refreshItemList(){
    this.itemService.getAllItems().subscribe({
      next: data => {
        this.items = data;
        this.isFailed = false;
        this.isLoading = false;
      },

      error: () => {
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  searchItemsWithCurrentQuery() {
    this.isLoading = true;

    this.itemService.searchItems(this.currentSearchQuery, this.currentSearchParam).subscribe({
      next: data => {
        this.items = data;
        this.isFailed = false;
        this.isLoading = false;
      },

      error: () => {
        this.isFailed = true;
        this.isLoading = false;
      }
    });
  }

  showFormDialog(item:item) {
    this.dialog.open(ItemFormComponent, {data:item.id})
      .afterClosed().subscribe((refresh:boolean) => {
        if (refresh) this.refreshItemList();
    });
  }

  protected deleteItem(item:item) {
    const operation = "Delete '" + item.name + "'";

    this.dialog.open(ConfirmDialogComponent, {data:operation})
      .afterClosed().subscribe(res => {
      if (res && item.id) {
        this.itemService.deleteById(item.id).subscribe({
          next: () => {
           this.refreshItemList();
            this.handleResult('success');
          },

          error: () => {
            this.handleResult('failed');
          }
        });
      }
    });
  }

  handleResult(status:string) {
    this.snackBar.openFromComponent(NotificationSnackBarComponent, {
      duration: 3000,
      horizontalPosition: "right",
      data: status
    });
  }
}
