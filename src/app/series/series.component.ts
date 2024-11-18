import { Component, OnInit } from '@angular/core';
import { Serie } from '../model/serie.model';
import { SerieService } from '../service/serie.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {


  series! : Serie[]; //un tableau de Produit
     
  constructor(private serieService: SerieService ) {
   
   }


   ngOnInit(): void {

     this.chargerSeries();
   }
 
   chargerSeries(){
     this.serieService.listeSeries().subscribe(sers => {
       console.log(sers);
       this.series = sers;
       });
   }
}
