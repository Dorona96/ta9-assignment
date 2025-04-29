import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Item } from '../../core/models/item';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-items-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatTableModule, DateFormatPipe],
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
