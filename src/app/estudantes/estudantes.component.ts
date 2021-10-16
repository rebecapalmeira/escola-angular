import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { EstudanteService } from '../estudante.service';
import { Student } from '../models/estudante.model';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent implements OnInit {

  students$:Observable<Student[]>;
  displayedColumns = ['nome', 'idade', 'email', 'operations'];

  @ViewChild('nome')studentName:ElementRef;

  studentForm = this.fb.group({
    id: [undefined],
    nome: ['', [Validators.required]],
    idade: [0, [Validators.required]],
    email: ['', [Validators.required]]
  });

  constructor(
    private fb:FormBuilder,
    private studentService:EstudanteService,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    this.students$ = this.studentService.getStudents();
  }

  onSubmit() {
    let student:Student = this.studentForm.value;
    if (!student.id) {
      this.addStudent(student);
    }
    else {
      this.updateStudent(student);
    }
  }

  addStudent(student:Student) {
    this.studentService.addStudent(student)
      // .then(() => {
      //   this.snackBar.open('Student added', 'OK', {duration: 2000});
      //   this.studentForm.reset({nome: '', idade: 0, email: '', id: undefined});
      //   this.studentName.nativeElement.focus();
      // })
      // .catch(() => {
      //   this.snackBar.open('Error on submiting the student registry', 'OK', {duration: 2000});
      // })
  }

  updateStudent (student:Student) {
    this.studentService.updateStudent(student)
    // .then(() => {
    //   this.snackBar.open('Student updated.', 'OK', {duration:2000});
    //   this.studentForm.reset({nome: '', idade: 0, email: '', id: undefined});
    //   this.studentName.nativeElement.focus();
    // })
    // .catch((e) => {
    //   console.log(e);
    //   this.snackBar.open('Error updating the student registry.', 'OK', {duration:2000});
    // })
  }

  edit(student:Student) {
    this.studentForm.setValue(student);
  }

  del(student:Student) {
    this.studentService.deleteStudent(student)
      // .then(() => {
      //   this.snackBar.open('Student has been removed.', 'OK', {duration:2000});
      // })
      // .catch((e) => {
      //   console.log(e);
      //   this.snackBar.open('Error when trying to remove student registry.', 'OK', {duration:2000});
      // })
  }

}
