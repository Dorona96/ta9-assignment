import { Component, OnInit, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ItemsStore } from '../store/items.store';
import { ItemsService } from '../../core/services/items.service';
import { Item } from '../../core/models/item';

import { ItemFormComponent } from '../items-form/item-form.component';
import { ItemsTableComponent } from '../items-table/items-table.component';
import { ItemsTilesComponent } from '../items-tiles/items-tiles.component';

@Component({
  selector: 'management-tool',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ItemFormComponent,
    ItemsTableComponent,
    ItemsTilesComponent,
  ],
  templateUrl: './management-tool.component.html',
  styleUrls: ['./management-tool.component.scss'],
})
export class ManagementToolComponent implements OnInit {
  listView = true;
  drawerOpen = false;
  selectedItem: Item | null = null;
  form: FormGroup;
  pageIndex = 0;
  pageSize = 10;

  readonly displayedColumns = ['color', 'name', 'createDate', 'lastUpdate', 'createdBy'];

  searchText = signal('');
  itemsSignal!: Signal<Item[]>;
  
  readonly filteredItemsSignal = computed(() => {
    const search = this.searchText().toLowerCase();
    return this.itemsSignal().filter(item =>
      item.name.toLowerCase().includes(search)
    );
  });

  readonly paginatedItemsSignal = computed(() => {
    const filtered = this.filteredItemsSignal();
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return filtered.slice(startIndex, endIndex);
  });

  constructor(
    private itemsStore: ItemsStore,
    private itemsService: ItemsService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      color: ['#000000', Validators.required],
    });

    this.itemsSignal = computed(() => this.itemsStore.itemsSignal() ?? []);
  }

  ngOnInit() {
    this.itemsService.getItems().subscribe((items) => {
      this.itemsStore.setItems(items);
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onSearch($event: Event) {
    const value = ($event.target as HTMLInputElement).value;
    this.searchText.set(value);
  }

  setListView(isList: boolean) {
    this.listView = isList;
  }

  openCreateDialog() {
    this.selectedItem = null;
    this.form.reset({
      color: '#000000',
    });
    this.drawerOpen = true;
  }

  editItem(item: Item) {
    this.selectedItem = item;
    this.form.patchValue(item);
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  save() {
    if (this.form.invalid) return;

    const formData = this.form.value;
    const today = new Date().toISOString().substring(0, 10);

    if (this.selectedItem) {
      const updatedItem: Item = {
        ...this.selectedItem,
        ...formData,
        lastUpdate: today,
      };
      this.itemsService.updateItem(updatedItem).subscribe((savedItem) => {
        this.itemsStore.updateItem(savedItem);
        this.closeDrawer();
      });
    } else {
      const newItem: Omit<Item, 'id'> = {
        ...formData,
        createDate: today,
        lastUpdate: today,
        createdBy: 'Or Levi',
      };
      this.itemsService.addItem(newItem).subscribe((savedItem) => {
        this.itemsStore.addItem(savedItem);
        this.closeDrawer();
      });
    }
  }
}
