import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent implements OnInit {
  top: any = []; // replace with Class defining json view structure
  constructor() { }

  ngOnInit() {
  }

  addProp(obj) {
    obj.push({name: "", type: "", value: ""})
  }
}
