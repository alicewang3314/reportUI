import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostFrequentExceptionsComponent } from './most-frequent-exceptions/most-frequent-exceptions.component';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MostFrequentDetailsDialogComponent } from './most-frequent-details-dialog/most-frequent-details-dialog.component';
import { ExceptionSearchComponent } from './exception-search/exception-search.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import  {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
// import { LogDashboardComponent } from './log-dashboard/log-dashboard.component';
import { MostFrequentErrorsDashbComponent } from './most-frequent-errors-dashb/most-frequent-errors-dashb.component';
import { LiveErrorLogsComponent } from './live-error-logs/live-error-logs.component';


@NgModule({
  entryComponents: [MostFrequentDetailsDialogComponent],
  declarations: [MostFrequentExceptionsComponent, MostFrequentDetailsDialogComponent, ExceptionSearchComponent, MostFrequentErrorsDashbComponent, LiveErrorLogsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatPaginatorModule
  ]
})
export class LogReportModule {

}
