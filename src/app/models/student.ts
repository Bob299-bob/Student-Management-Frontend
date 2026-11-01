export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  age: number;
}

export interface StudentCreate {
  name: string;
  email: string;
  course: string;
  age: number;
}
