import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../assets/canvasjs.min';

@Component({
  selector: 'app-co-agent',
  templateUrl: './co-agent.component.html',
  styleUrls: ['./co-agent.component.scss']
})
export class CoAgentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "dark1",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        //text: ""
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Jan" },
          { y: 55, label: "Fab" },
          { y: 50, label: "Mar" },
          { y: 65, label: "Apr" },
          { y: 95, label: "May" },
          { y: 68, label: "Jun" },
          { y: 28, label: "Jul" },
          { y: 34, label: "Aug" },
        ]
      }]
    });
      
    chart.render();
      }
  }


