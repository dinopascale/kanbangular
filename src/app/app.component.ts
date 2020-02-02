import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kanbangular';

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {

    // console.log(this.baseUrl);

    this._http.get('/api/greet').subscribe()
  }

}
