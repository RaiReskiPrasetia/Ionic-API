import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage  {
  npm: string;
  nama: string;
  jurusan: string;
  prodi: string;
  kelas: string;

  public getSiswa: any;
  public EditSiswa: any;


  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.params.subscribe((param: any) => {
      this.npm = param.npm;
      this.getDataWhere(this.npm);
    });
   }
    getDataWhere(npm){
      let data: Observable<any>;
      data = this.http.get('http://localhost/CodeIgniter_API-master/index.php/api/getDataWhereid/' + npm);
      data.subscribe((result) => {
        this.getSiswa = result;
        this.npm = this.getSiswa[0].npm;
        this.nama = this.getSiswa[0].nama;
        this.jurusan = this.getSiswa[0].jurusan;  
        this.prodi = this.getSiswa[0].prodi;
        this.kelas = this.getSiswa[0].kelas;
      });
    }

    submit() {

      if(this.npm!=null && this.nama!=null && this.jurusan!=null && this.prodi!=null && this.kelas!=null){
          this.updateData('npm');
          console.log(this.npm, this.nama, this.jurusan, this.prodi, this.kelas);
          this.npm="";
          this.nama="";
          this.jurusan = "";
          this.prodi = "";
          this.kelas="";
          alert("Update Data Successfully");
      }else{
          alert("Data harus lengkap !");
      }
  
  
  
    }

    updateData(npm) {
      let data: Observable<any>;
      this.npm
      data = this.http.get('http://localhost/CodeIgniter_API-master/index.php/api/PutData/' + this.npm + '/' + this.nama + '/' + this.jurusan + '/' + this.prodi + '/' + this.kelas + '/' );
      data.subscribe(result => {
        this.EditSiswa = result;
        console.log(result);
        if (result.status === 'Berhasil') {
          alert("Update Data Successfully");
        }
      });
    }

}