import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { categoryDB } from '../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { orderDB } from '../../shared/tables/order-list';
import { NgbDateStruct, NgbDate, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-installseal',
  templateUrl: './install-seal.component.html',
  styleUrls: ['./install-seal.component.scss']
})
export class InstallSealComponent implements OnInit {
  public order = [];
  public temp = [];
  public closeResult:string;
  public generalForm: FormGroup;
  public model: NgbDateStruct;
  public date: { year: number, month: number };

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private formBuilder: FormBuilder, private calendar: NgbCalendar, private modalService: NgbModal) {
    this.order = orderDB.list_order;
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

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.order = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  ngOnInit() {}
}
