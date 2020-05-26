import { Component, OnInit, AfterViewInit, ViewEncapsulation, Inject, ViewChild } from "@angular/core";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { IterationService } from '../services/iteration.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CacheService } from '../services/cache.service';
import { FormControl } from '@angular/forms';
import { BarHorizontalComponent, BaseChartComponent } from '@swimlane/ngx-charts';
import * as _ from 'lodash';

export class Project {
  Name: string;
}

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit {
  
  ////////////// ---------old code-------------////////////////
  iframeLiveLogSourceUrl: SafeResourceUrl;
  iframeLogSourceUrl: SafeResourceUrl;
  @ViewChild('chart1') chart1: BaseChartComponent;
  @ViewChild('chart2') chart2: BaseChartComponent;
  @ViewChild('chart3') chart3: BaseChartComponent;

  respBugApi: any[];
  bugsActResCnt: any;
  bugGrpCnt: ({ name: string, value: number}[]);
  seriesData: ({ name: string, value: number}[]);
  bugStackCnt: ({ name: string, series: ({ name: string, value: number}[])}[]);
  bugSeverityCnt: ({ name: string, series: ({ name: string, value: number }[]) }[]);

  view: any[] = [700, 400];

  //chart options
  
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Count';
  showYAxisLabel = true;
  showGridLines = true;
  yAxisLabel = '';
  selectedTabIndex = new FormControl(0);
  ///////////// ---------old code-------------//////////////////////

  filteredBugDetails:any;
  selectedSeverity:any = 'all';


  donutData : any;
  totalBugs = {
    total:0,
    resolved:0,
    active:0
  }
  criticalBugs = {
    total:0,
    resolved:0,
    active:0
  }
  highBugs = {
    total:0,
    resolved:0,
    active:0
  }
  mediumBugs = {
    total:0,
    resolved:0,
    active:0
  }
  lowBugs = {
    total:0,
    resolved:0,
    active:0
  }

  donutColorScheme = {
    domain: ['#66a3ff','#40E0D0', '#98FB98', '#4dff4d', '#C71585', '#DB7093', '#FFC0CB' , '#ffd11a', '#ffe680', '#944dff', '#cc66ff','#4B0082','#FFA500']
  };

  stackColorScheme = {
    domain: ['#ff1a1a', '#ffaa00', '#eff623', '#4da6ff']
  };

  displayedColumns: string[] = ['id', 'title', 'severity', 'createdBy', 'createdDate'];
  donutChartLevel:number = 0;

  constructor(private sanitizer: DomSanitizer,
    private iterationService: IterationService,
    private cacheService: CacheService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.selectedTabIndex.setValue(this.cacheService.selectHomeTabIndex);

    this.iframeLiveLogSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getLiveDashboardSrcUrl());
    this.iframeLogSourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getLogDashboardSrcUrl());

    this.cacheService.getBugsDashboardData().subscribe(
      resp => {
        this.respBugApi = resp;
        // for(var i=0;i<this.respBugApi.length;i++){
        //   if(this.respBugApi[i].se)
        //   this.respBugApi[i].severityCode
        // }
        //prepare data for chart
        this.calculateBugsAppCnt(this.respBugApi);
        this.calculateBugsActResCnt(this.respBugApi);
        this.calculateBugsSeverityCnt(this.respBugApi);
        console.log("result",resp);
        this.calculateCardData();
        this.getDonutChartData();
        this.calculateStackData();
      });

  }

  selectedAreaPath:any;
  reloadBugDetails(event){
    let self = this;
    self.selectedAreaPath = event.name;
    if(this.selectedSeverity!=='all')
      this.filteredBugDetails = _.filter(self.respBugApi,function(o) { return o.areaPath == event.name && o.severity==self.selectedSeverity});
    else
    this.filteredBugDetails = _.filter(self.respBugApi,function(o) { return o.areaPath == event.name});
  }
  
  getDonutChartData(){
    this.donutChartLevel = 0;
    this.donutData = [];
    for(let i=0;i<this.respBugApi.length;i++){
      let areaPath = this.respBugApi[i].areaPath;
      let pathData = _.find(this.donutData,function(o) { return o.name == areaPath})
      if(pathData==undefined){
        this.donutData.push({
          "name": areaPath,
          "value": _.filter(this.respBugApi,function(o) { return o.areaPath == areaPath && o.state== "Active"}).length
        });
      }
      
    }
  }

  calculateCardData(){
    this.filteredBugDetails = this.respBugApi;
    this.totalBugs.total = this.respBugApi.length;
    this.totalBugs.resolved = _.filter(this.respBugApi,function(o) { return o.state == "Resolved"}).length;
    this.totalBugs.active = _.filter(this.respBugApi,function(o) { return o.state == "Active"}).length;
    this.criticalBugs.total =  _.filter(this.respBugApi,function(o) { return o.severity == "1 - Critical" }).length;
    this.criticalBugs.resolved = _.filter(this.respBugApi,function(o) { return o.severity == "1 - Critical" && o.state == "Resolved"}).length;
    this.criticalBugs.active = _.filter(this.respBugApi,function(o) { return o.severity == "1 - Critical" && o.state == "Active"}).length;
    this.highBugs.total =  _.filter(this.respBugApi,function(o) { return o.severity == "2 - High" }).length;
    this.highBugs.resolved = _.filter(this.respBugApi,function(o) { return o.severity == "2 - High" && o.state == "Resolved"}).length;
    this.highBugs.active = _.filter(this.respBugApi,function(o) { return o.severity == "2 - High" && o.state == "Active"}).length;this.criticalBugs.total =  _.filter(this.respBugApi,function(o) { return o.severity == "1 - Critical" }).length;
    this.mediumBugs.total =  _.filter(this.respBugApi,function(o) { return o.severity == "3 - Medium" }).length;
    this.mediumBugs.resolved = _.filter(this.respBugApi,function(o) { return o.severity == "3 - Medium" && o.state == "Resolved"}).length;
    this.mediumBugs.active = _.filter(this.respBugApi,function(o) { return o.severity == "3 - Medium" && o.state == "Active"}).length;this.criticalBugs.total =  _.filter(this.respBugApi,function(o) { return o.severity == "1 - Critical" }).length;
    this.lowBugs.total =  _.filter(this.respBugApi,function(o) { return o.severity == "4 - Low" }).length;
    this.lowBugs.resolved = _.filter(this.respBugApi,function(o) { return o.severity == "4 - Low" && o.state == "Resolved"}).length;
    this.lowBugs.active = _.filter(this.respBugApi,function(o) { return o.severity == "4 - Low" && o.state == "Active"}).length;this.criticalBugs.total =  _.filter(this.respBugApi,function(o) { return o.severity == "1 - Critical" }).length;
 
  }

  calculateStackData(){
    this.bugStackCnt = [];
    for(let i=0;i<this.respBugApi.length;i++){
      let areaSplit = this.respBugApi[i].areaPath.split('\\');
        let areaName = areaSplit[areaSplit.length - 1];
      let areaPath = this.respBugApi[i].areaPath;
      let pathData = _.find(this.bugStackCnt,function(o) { return o.name == areaName})
      if(pathData==undefined){
        let seriesData = [];
        let seriesDataList = _.filter(this.respBugApi,function(o) { return o.areaPath == areaPath && o.state== "Active"});
        let criticalDataList = _.filter(seriesDataList,function(o) { return o.severity == "1 - Critical"});
        let highDataList = _.filter(seriesDataList,function(o) { return o.severity == "2 - High"});
        let mediumDataList = _.filter(seriesDataList,function(o) { return o.severity == "3 - Medium"});
        let lowDataList = _.filter(seriesDataList,function(o) { return o.severity == "4 - Low"});
        seriesData.push({
          "name":"1 - Critical",
          "value":criticalDataList.length
        });
        seriesData.push({
          "name":"2 - High",
          "value":highDataList.length
        });
        seriesData.push({
          "name":"3 - Medium",
          "value":mediumDataList.length
        });
        seriesData.push({
          "name":"4 - Low",
          "value":lowDataList.length
        });
        // for(let j=0;j<seriesDataList.length;j++){
        //   let severityLevel = seriesDataList[j].severity;
        //   let severityData = _.find(seriesData,function(o) { return o.severity == severityLevel})
        //   if(severityData==undefined){
        //     seriesData.push({
        //       "name":severityLevel,
        //       "value": _.filter(seriesData,function(o) { o.severity==severityLevel}).length
        //     })
        //   }
        // } 
        
        this.bugStackCnt.push({
          "name": areaName,
          "series": seriesData
        });
      }
      
    }
  }

  onBugDropdownChange(event){
    let self = this;
    self.selectedSeverity = event.value;
    
    if(self.selectedSeverity!=='all' && self.selectedAreaPath!==undefined)
      self.filteredBugDetails = _.filter(self.respBugApi,function(o) { return o.areaPath == self.selectedAreaPath && o.severity==self.selectedSeverity});
    else if(self.selectedSeverity!=='all')
      self.filteredBugDetails = _.filter(self.respBugApi,function(o) { return o.severity==self.selectedSeverity});
    else
    self.filteredBugDetails = self.respBugApi;
  }















































































  openDialogBugsApp(e): void {
    var apps = this.respBugApi.filter(resp => {
      let appNames = resp.areaPath.split('\\');
      return (appNames[appNames.length - 1] == (e.name))
    });

    this.dialog.open(BugDetailsDialog, {
      width: '700px',
      height: 'auto',
      data: {
        apps: apps, title: e.name
      }
    });
  }

  openDialogBugsActRes(e) {
    var apps = this.respBugApi.filter(resp =>
      resp.state === e.name
    );

    this.dialog.open(BugDetailsDialog, {
      width: '700px',
      height: 'auto',
      data: {
        apps: apps, title: e.name
      }
    });
  }

  openDialogBugsSev(e) {
    var apps = this.respBugApi.filter(resp =>
      resp.state === e.name && resp.severity === e.series
    );

    this.dialog.open(BugDetailsDialog, {
      width: '700px',
      height: 'auto',
      data: {
        apps: apps, title: e.name + ' | ' + e.series
      }
    });
  }

  calculateBugsAppCnt(bugsActRes: any[]) {
    let bugsActResGrp = bugsActRes.reduce((ubc, u) => ({
      ...ubc,
      [u.areaPath]: [...(ubc[u.areaPath] || []), u],
    }), {});

    this.bugGrpCnt = [];

    for (const area in bugsActResGrp) {
      let areaSplit = area.split('\\');
      let areaName = areaSplit[areaSplit.length - 1];
      this.bugGrpCnt.push({ name: areaName, value: bugsActResGrp[area].length });
    }
    this.bugGrpCnt = this.bugGrpCnt.sort((a, b) => a.value - b.value);

    //this.chart2.update();
  }

  calculateBugsActResCnt(bugsActRes: any[]) {
    let bugsActResGrp = bugsActRes.reduce((ubc, u) => ({
      ...ubc,
      [u.state]: [...(ubc[u.state] || []), u],
    }), {});

    this.bugsActResCnt = [];

    for (const state in bugsActResGrp) {
      this.bugsActResCnt.push({ name: state, value: bugsActResGrp[state].length });
    }
    console.log("bugs", this.bugsActResCnt);
  }

  calculateBugsSeverityCnt(bugsActRes: any[]) {

    let bugsSeverityGrp = bugsActRes.reduce((ubc, u) => ({
      ...ubc,
      [u.severity]: [...(ubc[u.severity] || []), u],
    }), {});

    this.bugSeverityCnt = [];

    let bugsActGrp2 = [];

    let seriesTmp: ({ name: string, value: number })[] = [];

    for (const key in bugsSeverityGrp) {
      const element = bugsSeverityGrp[key];

      let bugsActGrpTmp = element.reduce((ubc, u) => ({
        ...ubc,
        [u.state]: [...(ubc[u.state] || []), u],
      }), {});


      for (const state in bugsActGrpTmp) {
        const element = bugsActGrpTmp[state];
        seriesTmp.push({ name: state, value: bugsActGrpTmp[state].length })
      }

      bugsActGrp2.push({ severity: key, seriesTmp });
      seriesTmp = [];
    };

    bugsActGrp2.forEach(element => {
      this.bugSeverityCnt.push({ name: element.severity, series: element.seriesTmp });//
    });


  }

  getLiveDashboardSrcUrl(): string {

    return `${environment.kibanaUrl}/app/kibana#/visualize/edit/fd0984e0-6885-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!f,value:3000),time:(from:'${(new Date()).toISOString()}',to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!(),params:(expression:'.es(index%3D*filebeat*,%20timefield%3D!'@timestamp!',%20metric%3D!'cardinality:CORRELATIONID.keyword!')%0D%0A.label(!'Error%20count!')',interval:auto),title:'Timelion%20-%20Errors',type:timelion))`;
  }

  getLogDashboardSrcUrl(): string {

    return `${environment.kibanaUrl}/app/kibana#/visualize/edit/fd0984e0-6885-11ea-b305-a30961cbafb1?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:'${(new Date(Date.now() - 86400000)).toISOString()}',to:now))&_a=(filters:!(),linked:!f,query:(language:kuery,query:''),uiState:(),vis:(aggs:!(),params:(expression:'.es(index%3D*filebeat*,%20timefield%3D!'@timestamp!',%20metric%3D!'cardinality:CORRELATIONID.keyword!')%0D%0A.label(!'Error%20count!')',interval:auto),title:'Timelion%20-%20Errors',type:timelion))`;
  }

  onTabChange(index: number) {
    this.cacheService.selectHomeTabIndex = index;
    this.chart1.update();
    this.chart2.update();
    // this.chart3.update();
  }

  clearBugsDashboard() {
    this.cacheService.clearBugsCache();
    this.cacheService.getBugsDashboardData().subscribe(
      resp => {
        this.respBugApi = resp;
        //prepare data for chart
        this.calculateBugsAppCnt(this.respBugApi);
        this.calculateBugsActResCnt(this.respBugApi);
        this.calculateBugsSeverityCnt(this.respBugApi);
      });
  }
}

@Component({
  selector: 'bug-details-dialog',
  templateUrl: 'bug-details-dialog.html',
})

export class BugDetailsDialog {

  constructor(
    public dialogRef: MatDialogRef<BugDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}