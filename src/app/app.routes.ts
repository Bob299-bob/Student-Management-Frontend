import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard';
import { StudentsComponent } from './pages/students/students';
import { AddStudentComponent } from './pages/add-student/add-student';
import { EditStudentComponent } from './pages/edit-student/edit-student';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'add-student',
    component: AddStudentComponent,
  },
  {
    path: 'edit-student/:id',
    component: EditStudentComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
