import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
  styleUrls: ['./eseal-track.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EsealTrackComponent implements OnInit {
  public order = [];
  public temp = [];
  public eSealList: any = [];
  public closeResult:string;
  searchId: string ="";
  searchText: string = '';
  public location: boolean = false;
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
   // this.order = vendorlistDB.list_order;
   this.order= [
      {
        "esealId": 4,
        "sealNo": "1000123",
        "latitude": "17.492390",
        "longitude": "78.602821",
        "scanTime": "2021-07-26T15:53:05.000+00:00",
        "icds": [
          {
            "1": "ICD Tarapur"
          },
          {
            "2": "ICD Banglore"
          }
        ],
        "ports": [
          {
            "1": "JNCH"
          },
          {
            "2": "CH Cochin"
          }
        ],
        "sealTime": "2021-07-18T12:51:08.000+00:00",
        "status": "Installed"
      }
    ]
  }
  

  ngOnInit() {
    this.getGeoLocation()
  }

  selected(event) {
    this.searchId = Object.keys(event.item)[0];   
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
          this.order = response
           
         this.getGeoLocation()
        } else {
          this.order = []
        }
      }, (error: any) => {

      })
    }
  }

  getGeoLocation(){
    this.order.map((ele) => {
      this.service.getReveserCode(ele.latitude, ele.longitude).subscribe((response: any) => {
        if (response) {
          this.location = true;
          ele['location'] = response.locality + ', ' + response.principalSubdivision + ', ' + response.countryName;
          console.log(ele)
        } else {

        }
      })
    })
  }

}
