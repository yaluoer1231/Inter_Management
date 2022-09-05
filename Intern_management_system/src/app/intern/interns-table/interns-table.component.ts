import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Intern } from '../Intern_Fromat';
import { InternDetailsComponent } from '../intern-details/intern-details.component';

import { InternService } from '../intern.service';

@Component({
  selector: 'app-interns-table',
  templateUrl: './interns-table.component.html',
  styleUrls: ['./interns-table.component.scss','./button-table.scss','./intern-layouts.scss']
})
export class InternsTableComponent implements OnInit {

  interns : Intern[] = [];

  emptyIntern : Intern= { //Post傳輸用
    id : 0,
    name : '',
    sexCode : 1,
    borndate : new Date(),
    lineId: '',
    phonenumber: '',
    eMail: '',
  }

  showInterns : Intern[] = [];

  isUser : boolean = true;

  selectedintern? : Intern;
  internLength = 0;
  showCode = 0; //以代號顯示功能，0:關閉，1:PUT，2:DELETE，3:POST，4：SELECT
  idShow = 0;


  constructor(private internService : InternService) { }

  ngOnInit(): void {
    this.getIntern();
  }

  getIntern(): void{
    this.isUser = false;
    this.idShow = 0;
    this.internService.getIntern()
      .subscribe(Interns => {
        for (var i = 0;i <= Interns.length-1;i++){ //迴圈找陣列，Interns.length-1為陣列長度，檢索從0開始
          this.sexChange(Interns[i]);
          this.idChange(Interns[i]);
          Interns[i].borndate = new Date(Interns[i].borndate);
          this.phoneNumberChange(Interns[i])
        }
        this.interns = Interns;
        this.showInterns = Interns;
      })
  }

  getUnLockIntern(): void{
    this.isUser = true;
    this.showInterns = this.interns.filter(h => h.lock != true);
  }

  onSelect(intern: Intern,ShowCode : number): void {
    if (this.showCode == ShowCode && this.selectedintern == intern)
      this.showCode = 0;
    else {
      this.selectedintern = intern;
      this.internLength = this.interns.length;
      this.showCode = ShowCode;
    }
  }

  //將資料庫的性別代號轉換成文字
  sexChange(intern: Intern): void{
    if (intern.sexCode == 1)
      intern.sex = "男";
    else if (intern.sexCode == 2)
      intern.sex = "女";
    else
      intern.sex = "錯誤";
    return ;
  }

  idChange(intern: Intern){
    this.idShow = this.idShow+1
    intern.sort = this.idShow;
  }

  phoneNumberChange(intern: Intern){
    if (intern.phonenumber.slice(0,2)=="09")
      intern.phonenumber = intern.phonenumber.slice(0,4)
                            +"-"+intern.phonenumber.slice(4,7)+"-"+intern.phonenumber.slice(7,10);
    else
      intern.phonenumber = "("+intern.phonenumber.slice(0,2) +")"
                            +intern.phonenumber.slice(2,6)+"-"+intern.phonenumber.slice(6,10);
  }

  delete(intern: Intern): void{
    this.interns = this.interns.filter(h => h !== intern);
    this.internService.deleteIntern(intern.id)
        .subscribe(Note => this.getIntern());
  }

  isLock(intern: Intern): void{
    if (intern.lock == true)
      intern.lock = false;
    else
      intern.lock = true;
    this.internService.putIntern(intern)
        .subscribe();
  }

  back(): void{
    this.showCode = 0;
    this.emptyIntern = { //Post傳輸用
      id : 0,
      name : '',
      sexCode : 1,
      borndate : new Date(),
      lineId: '',
      phonenumber: '',
      eMail: '',
    }
  }

  setShowCode(num : number): void{
    this.showCode = num;
  }
}
