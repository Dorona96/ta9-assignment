import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Item } from '../../core/models/item';

export interface ItemsState {
  items: Item[];
}

@Injectable({ providedIn: 'root' })
export class ItemsStore extends ComponentStore<ItemsState> {
  constructor() {
    super({ items: [] });
  }

  readonly items$ = this.select(state => state.items);
  
  readonly itemsSignal = toSignal(this.items$);

  readonly setItems = this.updater((state, items: Item[]) => ({
    ...state,
    items,
  }));

  readonly addItem = this.updater((state, item: Item) => ({
    ...state,
    items: [...state.items, item],
  }));

  readonly updateItem = this.updater((state, updatedItem: Item) => ({
    ...state,
    items: state.items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    ),
  }));
}
