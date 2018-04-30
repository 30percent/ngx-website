import { Component, OnInit, ElementRef, NgZone } from '@angular/core';

import * as ace from 'brace';
import { Editor } from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import * as JSONEditor from 'jsoneditor';

import * as $ from 'jquery';

import * as fp from 'lodash/fp';

@Component({
  selector: 'app-safe-eval',
  templateUrl: './safe-eval.component.html',
  styleUrls: ['./safe-eval.component.css']
})
export class SafeEvalComponent implements OnInit {
  editor: Editor;
  results: string;
  worker: Worker;
  params: {}[] = [];

  constructor(
    private element: ElementRef,
    private zone: NgZone,
  ) { 
    let a = new JSONEditor();
    console.log(a);

  }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {

      var editorElement = this.element.nativeElement.querySelector("[my-ace-editor]");
      this.editor = ace.edit(editorElement);
      this.editor.getSession().setMode('ace/mode/javascript');
      $(editorElement).removeClass("ace-tm");
    });
  }

  runAttempt() {
    let self = this;
    if(this.worker) this.worker.terminate();
    var someJavascript = this.editor.getValue();
    var blob = new Blob([`
    importScripts('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.5/lodash.core.js');
    onmessage = function (e) { if(e.data.params){
    var result = (function (${fp.map('name', this.params)}) { ${someJavascript} ;}).apply(null, e.data.params);
      postMessage(result);
    }};`], { type: "text/javascript" })
      
    this.worker = new Worker(URL.createObjectURL(blob));
    this.worker.onmessage = (e) => {
      self.results = e.data;
    }
    this.worker.postMessage({params: fp.map('value', this.params)})
  }

  addParam() {
    this.params.push({});
  }

}
