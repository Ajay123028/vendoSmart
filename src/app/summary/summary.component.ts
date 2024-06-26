import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  correctRows: number = 0;
  incorrectRows: number = 0;

  ngOnInit(): void {
    const data = localStorage.getItem('csvData');
    if (data) {
      const csvData = JSON.parse(data);
      this.correctRows = csvData.filter((row: any) => !row.error).length;
      this.incorrectRows = csvData.filter((row: any) => row.error).length;
    }
  }
}
