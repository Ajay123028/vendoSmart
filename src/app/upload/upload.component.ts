import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as Papa from 'papaparse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  file: File | null = null;

  constructor(private router: Router) {}

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = Papa.parse(reader.result as string, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            this.validateData(result.data);
            this.router.navigate(['/table']);
          }
        });
      };
      reader.readAsText(this.file);
    } else {
      alert('Please select a file.');
    }
  }

  validateData(data: any[]) {
    // Add validation logic here
    data.forEach(row => {
      if (!row.Name) row.error = 'Name is required';
      if (!row.Email || !this.validateEmail(row.Email)) row.error = 'Invalid email';
      if (!row['Phone number'] || !this.validatePhoneNumber(row['Phone number'])) row.error = 'Invalid phone number';
      if (!row.City) row.error = 'City is required';
      if (!row.Address) row.error = 'Address is required';
      if (!row.GPA || isNaN(parseFloat(row.GPA))) row.error = 'GPA must be a number';
    });
    localStorage.setItem('csvData', JSON.stringify(data));
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  validatePhoneNumber(phone: string): boolean {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  }
}
