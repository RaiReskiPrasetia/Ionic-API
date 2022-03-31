import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  public GETSiswa: any;
  public deleteSiswa: any;

  constructor(private http: HttpClient) {}


  ionViewWillEnter() {
    this._Getdata();
  }

  
  _Getdata() {
    let data: Observable<any>;
    data = this.http.get('http://localhost/CodeIgniter_API-master/index.php/api/getdata');
    data.subscribe((result) => {
      this.GETSiswa = result;
    });
  }

  public deleteData(npm){
    let data: Observable<any>;
    data = this.http.get('http://localhost/CodeIgniter_API-master/index.php/api/deletedata/' + npm);
    data.subscribe((result) => {
      this.deleteSiswa = result;
      console.log(result.status);
      if (result.status ==='Ok') {
        alert('Delete Data Successfully!');
        this.ionViewWillEnter();
      }
    });
  }
}




