import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IStd } from 'src/app/modals/studuent';
import { SnakbarService } from 'src/app/services/snakbar.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {

  editstd!: IStd
  isineditmode: boolean = false
  @ViewChild('stdform') stdform !: NgForm
  constructor(
    private stdservice: StudentService,
    private snakbar: SnakbarService
  ) { }

  ngOnInit(): void {
    this.onPatchonForm()
  }

  stdAdd() {
    if (this.stdform.valid) {
      let newobj: IStd = {
        ...this.stdform.value, stdId: Date.now().toString()
      }
      this.stdservice.Addstd(newobj)
        .subscribe({
          next: res => {
            this.snakbar.OpenSnakbar(res.msg)
            this.stdform.reset()
          }
        })
    }
  }

  onPatchonForm() {
    this.stdservice.editstudent$.subscribe(res => {
      this.isineditmode = true
      this.editstd = res
      this.stdform.form.patchValue(res)
    })
  }

  onUpdatestd() {
    if (this.stdform.valid) {
      let update_obj: IStd = {
        ...this.stdform.value, stdId: this.editstd.stdId
      }
      this.stdservice.updatestd(update_obj)
        .subscribe({
          next: res => {
            this.snakbar.OpenSnakbar(res.msg)
            this.stdform.reset()
            this.isineditmode = false
          }
        })
    }
  }
}
