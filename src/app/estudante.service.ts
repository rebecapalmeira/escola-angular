import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Student } from './models/estudante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {

  private studentsCollection:AngularFirestoreCollection<Student> = this.afs.collection('students');

  constructor(private afs:AngularFirestore) { }

  getStudents():Observable<Student[]> {
    return this.studentsCollection.valueChanges();
  }

  addStudent(student:Student):any {
    student.id = this.afs.createId();
    return this.studentsCollection.doc(student.id).set(student);
    // this.studentsCollection.add(p);
  }

  deleteStudent(student:Student) {
    return this.studentsCollection.doc(student.id).delete();
  }

  updateStudent(student:Student) {
    return this.studentsCollection.doc(student.id).set(student);
  }
}
