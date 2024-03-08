import { Component, OnInit, VERSION } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Events: any[] = [];
  // calendarOptions: CalendarOptions = {
  //   plugins: [dayGridPlugin, ],
  //   initialView: 'dayGridMonth',
  //   // headerToolbar: {
  //   //   left: 'prev,next today',
  //   //   center: 'title',
  //   //   right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
  //   // },
  //   weekends: true,
  //   editable: true,
  //   selectable: true,
  //   selectMirror: true,
  //   dayMaxEvents: true,

  name = "Angular " + VERSION.major;
  nothingToshowText: any = "Nothing to show"; // "By default" => There are no events scheduled that day.
  colors: any = {
    red: {
      primary: "#ad2121",
      secondary: "#FAE3E3"
    },
    yellow: {
      primary: "#e3bc08",
      secondary: "#FDF1BA"
    }
  };
  actions: any[] = [
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      name: "delete"
    },
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      name: "edit"
    }
  ];
  events: any = [
    {
      start: new Date(),
      end: new Date(),
      title: "title event 1",
      color: this.colors.red,
      actions: this.actions
    },
    {
      start: new Date(),
      end: new Date(),
      title: "title event 2",
      color: this.colors.yellow,
      actions: this.actions
    }
  ];
  viewDate: Date = new Date();
  themecolor: any = "#0a5ab3";
  constructor() {}

  eventClicked(event) {
    console.log(event);
  }
  actionClicked(event) {
    console.log("action", event.action);
    console.log("event", event.event);
  }
  };
