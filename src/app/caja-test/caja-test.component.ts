import { Component, OnInit } from '@angular/core';
import { caja } from '../classes/caja'
import { defer } from 'lodash';
import { NgZone, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-caja-test',
  templateUrl: './caja-test.component.html',
  styleUrls: ['./caja-test.component.css']
})
export class CajaTestComponent implements OnInit {
  cajaResult: any;
  constructor(
    private NgZone: NgZone,
    private ChangeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    caja.initialize({
      forceES5Mode: true,
      cajaServer: "example.com/",
      debug: true
    });

    let self = this;
    function storeResult(contents) {
      console.info("ran");
      self.cajaResult = contents;
      self.ChangeDetectorRef.detectChanges(); //equivalent to $scope.$digest();
    }
    caja.load(document.getElementById("caja-test"), null, (frame) => {
      // frame.code("assets/sample.html", 'text/html')
      //   .run();
      caja.markFunction(storeResult);
      frame.code("assets/sample.html", 'text/html')
        .api({
          storeResult: storeResult,
          log: console.log,
          JSON: {parse: JSON.parse}
        })
        .run();
    }, null);
  }

  help() {
    console.info(this);
  }

}
