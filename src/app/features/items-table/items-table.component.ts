import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Item } from '../../core/models/item';

@Component({
  selector: 'app-items-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTableModule],
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss'],
})
export class ItemsTableComponent {
  @Input() items: Item[] = [];
  @Input() displayedColumns: string[] = [];
  @Output() edit = new EventEmitter<Item>();

  onEdit(item: Item) {
    this.edit.emit(item);
  }
}
