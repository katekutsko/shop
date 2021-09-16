import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle') header: ElementRef<HTMLHeadingElement>;

  title = 'shop';

  ngAfterViewInit(): void {
    this.header.nativeElement.textContent = this.title;
  }
}
