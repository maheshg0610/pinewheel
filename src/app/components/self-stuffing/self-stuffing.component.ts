import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { categoryDB } from '../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-selfstuffing',
  templateUrl: './self-stuffing.component.html',
  styleUrls: ['./self-stuffing.component.scss']
})
export class SelfStuffingComponent implements OnInit {
  public closeResult: string;
  public generalForm: FormGroup;
  public restrictionForm: FormGroup;
  public usageForm: FormGroup;
  public model: NgbDateStruct;
  public date: { year: number, month: number };
  public modelFooter: NgbDateStruct;

  constructor(private formBuilder: FormBuilder, private calendar: NgbCalendar, private modalService: NgbModal) {
    this.createGeneralForm();
    this.createRestrictionForm();
    this.createUsageForm();
  }
  

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  createGeneralForm() {
    this.generalForm = this.formBuilder.group({
      name: [''],
      code: [''],
      start_date: [''],
      end_date: [''],
      free_shipping: [''],
      quantity: [''],
      discount_type: [''],
      status: [''],
    });
  }

  createRestrictionForm() {
    this.restrictionForm = this.formBuilder.group({
      products: [''],
      category: [''],
      min: [''],
      max: ['']
    })
  }

  createUsageForm() {
    this.usageForm = this.formBuilder.group({
      limit: [''],
      customer: ['']
    })
  }

  ngOnInit() {}
}
