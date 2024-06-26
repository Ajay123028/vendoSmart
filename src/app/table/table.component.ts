import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  csvData: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = localStorage.getItem('csvData');
    if (data) {
      this.csvData = JSON.parse(data);
    } else {
      this.router.navigate(['/upload']);
    }
  }

  goToSummary() {
    this.router.navigate(['/summary']);
  }
}
