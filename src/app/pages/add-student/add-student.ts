import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="card shadow-sm p-4">
      <h2 class="mb-4">Add New Student</h2>

      <form #studentForm="ngForm" (ngSubmit)="addStudent()">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input class="form-control" name="name" [(ngModel)]="student.name" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            class="form-control"
            type="email"
            name="email"
            [(ngModel)]="student.email"
            required
            email
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Course</label>
          <input class="form-control" name="course" [(ngModel)]="student.course" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Age</label>
          <input
            class="form-control"
            type="number"
            name="age"
            [(ngModel)]="student.age"
            required
            min="1"
          />
        </div>

        <button class="btn btn-success me-2" type="submit" [disabled]="studentForm.invalid">
          Save Student
        </button>

        <a routerLink="/students" class="btn btn-secondary">Cancel</a>
      </form>

      @if (errorMessage) {
        <p class="text-danger mt-3">
          {{ errorMessage }}
        </p>
      }
    </div>
  `,
})
export class AddStudentComponent {
  student = {
    name: '',
    email: '',
    course: '',
    age: 0,
  };

  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private router: Router,
  ) {}

  addStudent(): void {
    this.studentService.addStudent(this.student).subscribe({
      next: () => this.router.navigate(['/students']),
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to save student.';
      },
    });
  }
}
