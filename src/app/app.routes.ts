import { Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { TableComponent } from './table/table.component';
import { SummaryComponent } from './summary/summary.component';

export const routes: Routes = [
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'table', component: TableComponent },
  { path: 'summary', component: SummaryComponent }
];
