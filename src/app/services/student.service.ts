import { Injectable, OnInit } from '@angular/core';
import { Ires, IStd } from '../modals/studuent';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit{

  stdarr! :Array<IStd>
  editstudent$ : Subject<IStd> = new Subject<IStd>()
  constructor() { }
  ngOnInit(): void {
    this.getdata()
  }

  getdata(){
    if(localStorage.getItem('stdArr')){
      this.stdarr = JSON.parse(localStorage.getItem('stdArr') || '[]')
    }else{
      this.stdarr = []
    }

    return of(this.stdarr)
  }

  Addstd(std : IStd) : Observable<Ires<IStd>>{
    this.stdarr.push(std)
    localStorage.setItem('stdArr', JSON.stringify(this.stdarr))

    return of({
      msg : `The student with id ${std.stdId} is added successfully!!!`,
      data : std
    })
  }

  RemoveStudent(id : string){
    let getindex = this.stdarr.findIndex(ele => ele.stdId === id)
    let std = this.stdarr.splice(getindex , 1)
    localStorage.setItem('stdArr', JSON.stringify(this.stdarr))

    return of({
      msg : `The student with id ${std[0].stdId} is Remove successfully!!!`,
      data : std
    })
  }

  updatestd(std : IStd){
    let getindex = this.stdarr.findIndex(ele => ele.stdId === std.stdId)
    this.stdarr[getindex] = std
    localStorage.setItem('stdArr', JSON.stringify(this.stdarr))

    return of({
      msg : `The student with id ${std.stdId} is Updated successfully!!!`,
      data : std
    })
  }
}
