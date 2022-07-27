import { Component, Input, OnInit } from '@angular/core';
import { Intern } from '../Intern_Fromat';
import { InternDetailsComponent } from '../intern-details/intern-details.component';

import { InternService } from '../intern.service';

@Component({
  selector: 'app-interns-table',
  templateUrl: './interns-table.component.html',
  styleUrls: ['./interns-table.component.scss']
})
export class InternsTableComponent implements OnInit {

  Interns : Intern[] = [];
  selectedintern? : Intern;
  private static interndetail :InternDetailsComponent;
  ShowUpdate = false;

  constructor(private internService : InternService) { }

  ngOnInit(): void {
    this.getIntern();
  }

  getIntern(): void{
    this.internService.getIntern().subscribe(Interns =>{
      this.Interns = Interns;
    });
  }
  
  onSelect(intern: Intern): void {
    this.ShowUpdate = true;
    this.selectedintern = intern;
  }

  Update(display : boolean): void{
    this.ShowUpdate = display;
  }

}
