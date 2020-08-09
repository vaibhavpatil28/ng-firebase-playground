import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { of, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  shipmentData: any;
  stateList$: Observable<string[]>;

  constructor(private http: HttpClient) {}
  // getShipment() {
  //   const requestHeaders = new HttpHeaders();
  //   const httpOptions = {
  //     headers: requestHeaders
  //   };
  //   return this.http.get(
  //     environment.apiEndpoint + "shipment/services",
  //     httpOptions
  //   );
  // }

  // shipmentQuote(data) {
  //   const requestheaders = new HttpHeaders();
  //   const httpOptions = {
  //     headers: requestheaders
  //   };
  //   return this.http.post(
  //     environment.apiEndpoint + "shipment/quote",
  //     data,
  //     httpOptions
  //   );
  // }
  // bookShipment(data) {
  //   const requestheaders = new HttpHeaders();
  //   const httpOptions = {
  //     headers: requestheaders
  //   };
  //   return this.http.post(
  //     environment.apiEndpoint1 + "shipment/book",
  //     data,
  //     httpOptions
  //   );
  // }
  
  getCountryList() {
    return this.http.get("assets/api/country.json");
  }
  getStateByCountry(countryIndex) {
    console.log("countryIndex: ", countryIndex);
    return this.http
      .get("assets/api/state.json")
      .pipe(map(res => res["data"][countryIndex].split("|")));
  }
  getStateList(countryIndex) {
    if (this.stateList$) {
      return this.stateList$.pipe(
        map(val => {
          return val[countryIndex].split("|");
        })
      );
    }
  }
}
