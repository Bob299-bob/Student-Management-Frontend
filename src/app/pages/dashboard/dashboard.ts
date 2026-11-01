import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2 class="mb-4">Dashboard</h2>

    <div class="row">
      <div class="col-md-4">
        <div class="card shadow-sm p-4">
          <h6 class="text-muted">Total Students</h6>
          <h2>{{ totalStudents }}</h2>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm p-4">
          <h6 class="text-muted">Manage Students</h6>
          <a routerLink="/students" class="btn btn-primary mt-2"> View Students </a>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm p-4">
          <h6 class="text-muted">New Student</h6>
          <a routerLink="/add-student" class="btn btn-success mt-2"> Add Student </a>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  totalStudents = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudentCount().subscribe({
      next: (response) => (this.totalStudents = response.totalStudents),
      error: (error) => console.error('Dashboard API error:', error),
    });
  }
}
