import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-individual-conflict',
  templateUrl: './individual-conflict.component.html',
  styleUrls: ['./individual-conflict.component.scss']
})
export class IndividualConflictComponent implements OnInit {


  secondFormGroup: FormGroup;
  firstFormGroup: FormGroup;
  isLinear: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
