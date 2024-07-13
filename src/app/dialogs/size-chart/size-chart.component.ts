import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-size-chart',
  templateUrl: './size-chart.component.html',
  styleUrl: './size-chart.component.scss'
})
export class SizeChartComponent {
  selectedContent: string = 'sizeChart'; 
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  constructor(private dialogRef: MatDialogRef<SizeChartComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  showContent(content: string): void {
    this.selectedContent = content;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
