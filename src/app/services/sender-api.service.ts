import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SenderAddress } from '../models/sender.model';

@Injectable({
  providedIn: 'root'
})
export class SenderApiService {

  constructor(
    private angularFirestore: AngularFirestore
  ) { }
  saveSender(data: SenderAddress){
    const post = JSON.parse(JSON.stringify(data));
    return this.angularFirestore.collection('senderAddress').add(post);
  }
  getAllSenderAddress(){
    return this.angularFirestore.collection('senderAddress').get();
  }
}
