import { CustomSocketService } from './../custom-socket.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-chart-section',
  templateUrl: './chart-section.component.html',
  styleUrls: ['./chart-section.component.scss']
})
export class ChartSectionComponent implements OnInit {

  multi: any[];

  //Configuracion de grafica
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#FFD23F', '#6320EE']
  };

  constructor(private customSocket: CustomSocketService) {
    this.multi =

      [
        {
          "name": "BTC",
          "series": [

          ]
        },
        {
          "name": "ETH",
          "series": [

          ]
        }
      ]

    // Object.assign(this, { multi });
  }
  ngOnInit(): void {

    this.customSocket.getPrices$().subscribe(({ data }) => {

      //TODO Capturamos los datos de servidor
      console.log("Captura de datos " + data)
      const [BTC, ETH] = data;

      //Aqui convertimos a un objecto fecha para poder activar el timeline

      const pricesBTC = this.parseDate(BTC.prices);

      const pricesETH = this.parseDate(ETH.prices);

      //Todo Revisamos la data actual del grafico antes de actualizar

      const [currentBTC, currentETH] = this.multi;

      this.multi[0].series = currentBTC.series.concat(pricesBTC)

      this.multi[1].series = currentETH.series.concat(pricesETH)

      //Actualizamos la grafica con operador rest

      this.multi = [...this.multi]

    })

  }

  parseDate(dataRaw: Array<any>): Array<any> {
    const result = dataRaw.map(([name, value], index) => {
      return {
        name: moment(name, 'x').toDate(),
        value
      }
    });

    return result
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
