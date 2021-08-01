import { Component, OnInit, ViewChild } from '@angular/core';
import { categoryDB } from '../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { vendorlistDB } from '../../shared/tables/vendor-list';
import { Router } from '@angular/router';
import { PinwheelService } from 'src/app/shared/service/pinwheel.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-eseal-track',
  templateUrl: './eseal-track.component.html',
  styleUrls: ['./eseal-track.component.scss']
})
export class EsealTrackComponent implements OnInit {
  public order = [];
  public temp = [];
  public eSealList: any = [];
  public closeResult:string;
  searchId: string ="";
  searchText: string = '';
  @ViewChild('instance') instance: NgbTypeahead;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.eSealList.filter(v => v["3"].toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  formatter = (x: { 3: string }) => x['3']

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  constructor(private modalService: NgbModal, private router: Router, private service:PinwheelService) {
    //this.order = vendorlistDB.list_order;
  }
  

  ngOnInit() {
    this.getVendorList()
  }

  selected(event) {
    this.searchId = Object.keys(event.item)[0];   
  }


  getVendorList() {
    this.service.vendorList().subscribe((res) => {
      if (res) {
       this.order = res.data;
      } else {
        alert(res.statusText);
      }
    },
      (err) => {
        console.log(err)
      })
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

  openDetails(event) {
    this.service.updateSearchResults.next(event);
    this.router.navigate(['/vendor-registration/vendorregistration']);
  }

  onChange(val) {
    this.service.searchEseal(this.searchText).subscribe((response: any) => {
      if (response) {
        this.eSealList = response;
      } else {
       this.eSealList = []
      }
    }, (error: any) => {
      
    })
  }

  onTrack() {
    if(this.searchId !== "") {
      this.service.trackEseal(this.searchId).subscribe((response: any) => {
        if (response) {
          this.order = response;
        } else {
          this.order = []
        }
      }, (error: any) => {

      })
    }
  }

}
