import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="card shadow-sm p-4">
      <h2 class="mb-4">Edit Student</h2>

      <form #studentForm="ngForm" (ngSubmit)="updateStudent()">
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

        <button class="btn btn-primary me-2" type="submit" [disabled]="studentForm.invalid">
          Update Student
        </button>

        <a routerLink="/students" class="btn btn-secondary">Cancel</a>
      </form>

      <p class="text-danger mt-3" *ngIf="errorMessage">
        {{ errorMessage }}
      </p>
    </div>
  `,
})
export class EditStudentComponent implements OnInit {
  student = {
    name: '',
    email: '',
    course: '',
    age: 0,
  };

  studentId = 0;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));

    this.studentService.getStudentById(this.studentId).subscribe({
      next: (data) => {
        this.student = {
          name: data.name,
          email: data.email,
          course: data.course,
          age: data.age,
        };
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to load student.';
      },
    });
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.studentId, this.student).subscribe({
      next: () => this.router.navigate(['/students']),
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Unable to update student.';
      },
    });
  }
}
