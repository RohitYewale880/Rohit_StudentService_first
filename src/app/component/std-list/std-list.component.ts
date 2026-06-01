import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IStd } from 'src/app/modals/studuent';
import { SnakbarService } from 'src/app/services/snakbar.service';
import { StudentService } from 'src/app/services/student.service';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';

@Component({
  selector: 'app-std-list',
  templateUrl: './std-list.component.html',
  styleUrls: ['./std-list.component.scss']
})
export class StdListComponent implements OnInit {

  stddata!: IStd[]
  constructor(
    private stdservice: StudentService,
    private matdilog : MatDialog,
    private snakbar : SnakbarService
  ) { }

  ngOnInit(): void {
    this.stdservice.getdata().subscribe({
      next : res => {
        this.stddata = res
      }
    })
  }

  trackbufun(index : number, std : IStd){
    return std.stdId
  }

  onRemove(id : string){
    this.matdilog.open(GetconfirmComponent, {
      width : '500px',
      disableClose : true,
      data : `Are you sure do you want to remve this student whos id is ${id}`
    }).afterClosed().subscribe({
      next : res => {
        if(res){
          this.stdservice.RemoveStudent(id).subscribe({
            next: res => {
              this.snakbar.OpenSnakbar(res.msg)
            },
            error : err => {
              console.log(err);
            }
          })
        }
      }
    })
  }

  onEdit(std : IStd){
    this.stdservice.editstudent$.next(std)
  }
}
