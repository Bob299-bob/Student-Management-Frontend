import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, StudentCreate } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://student-management-1-3eum.onrender.com/api/Student';
  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}`);
  }

  addStudent(student: StudentCreate): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: StudentCreate): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStudentCount(): Observable<{ totalStudents: number }> {
    return this.http.get<{ totalStudents: number }>(`${this.apiUrl}/count`);
  }

  searchStudents(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/search?name=${encodeURIComponent(name)}`);
  }
}
