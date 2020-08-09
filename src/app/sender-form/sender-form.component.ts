import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ApiService } from '../api.service';
import { SenderApiService } from '../services/sender-api.service';
@Component({
  selector: "app-sender-form",
  templateUrl: "./sender-form.component.html",
  styleUrls: ["./sender-form.component.scss"]
})
export class SenderFormComponent implements OnInit {
  senderForm: FormGroup;
  @Input() cardTitle: String;
  @Input() countryList: any[] = [{
    name:'USA',
    id:239
  }];
  private alphabetsRegex = /^[A-Za-z]+([\ A-Za-z]+)*/;
  private emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private numberRegex = /^[0-9]*$/;
  stateList$: Observable<any[]>;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private senderApiService: SenderApiService
  ) {}
  ngOnInit() {
    this.createForm();
    this.getAllSenderAddress();
  }

  createForm() {
    this.senderForm = this.formBuilder.group({
      senderCountry: ["", Validators.required],
      senderName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.alphabetsRegex)
        ])
      ],
      senderCompany: ["", Validators.required],
      senderZip: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.numberRegex)
        ])
      ],
      senderState: ["", Validators.required],
      senderCity: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.alphabetsRegex)
        ])
      ],
      senderAddress1: ["", Validators.required],
      senderAddress2: [""],
      senderAddress3: [""],
      senderPhone: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
          Validators.pattern(this.numberRegex)
        ])
      ],
      senderEmail: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.emailRegex)
        ])
      ]
    });
    this.senderCountryValueChanges();
    this.senderForm.get("senderCountry").patchValue(239);
  }
  private senderCountryValueChanges() {
    this.senderForm.get("senderCountry").valueChanges.subscribe(val => {
      this.senderForm.get("senderState").patchValue("");
      if (val) {
        this.stateList$ = this.apiService
          .getStateByCountry(val)
          .pipe(map(res => res));
      }
    });
  }
  async submitForm(){
    const data = await this.senderApiService.saveSender(this.senderForm.getRawValue())
    console.log('data: ', data);
  }
  private async getAllSenderAddress(){
    const senderAddress = this.senderApiService.getAllSenderAddress();
    senderAddress.subscribe(addressRes=>{
      console.log('addressRes: ', addressRes.size);
      addressRes.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    });
  }
}
