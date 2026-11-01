import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Students</h2>
      <a routerLink="/add-student" class="btn btn-primary"> + Add Student </a>
    </div>

    <div class="mb-3">
      <input
        class="form-control"
        placeholder="Search by student name"
        [(ngModel)]="searchName"
        (input)="searchStudents()"
      />
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr *ngFor="let student of students">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.course }}</td>
            <td>{{ student.age }}</td>
            <td>
              <a [routerLink]="['/edit-student', student.id]" class="btn btn-sm btn-warning me-2">
                Edit
              </a>

              <button class="btn btn-sm btn-danger" (click)="deleteStudent(student.id)">
                Delete
              </button>
            </td>
          </tr>

          <tr *ngIf="students.length === 0">
            <td colspan="6" class="text-center">No students found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p *ngIf="errorMessage" class="text-danger">{{ errorMessage }}</p>
  `,
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  searchName = '';
  errorMessage = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.errorMessage = '';
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to load students. Check the API connection.';
      },
    });
  }

  searchStudents(): void {
    if (!this.searchName.trim()) {
      this.loadStudents();
      return;
    }

    this.studentService.searchStudents(this.searchName).subscribe({
      next: (data) => (this.students = data),
      error: (error) => console.error(error),
    });
  }

  deleteStudent(id: number): void {
    if (!confirm('Are you sure you want to delete this student?')) {
      return;
    }

    this.studentService.deleteStudent(id).subscribe({
      next: () => this.loadStudents(),
      error: (error) => {
        console.error(error);
        alert('Unable to delete student.');
      },
    });
  }
}
