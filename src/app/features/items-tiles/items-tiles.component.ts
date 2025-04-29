import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../core/models/item';

@Component({
  selector: 'app-items-tiles',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './items-tiles.component.html',
  styleUrls: ['./items-tiles.component.scss'],
})
export class ItemsTilesComponent {
  @Input() items: Item[] = [];
  @Output() edit = new EventEmitter<Item>();

  onEdit(item: Item) {
    this.edit.emit(item);
  }
}
