import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ConstantService,
  generatedString,
  GlobalConstants,
  idGenerator,
  LocalStorage,
} from '../core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent implements OnInit {
  constructor(
    @Optional() @Inject(ConstantService) public constants: GlobalConstants,
    @Optional() @Inject(generatedString) public randomString: string,
    @Optional() @Inject(idGenerator) public generator: Observable<number>,
    @Optional() @Inject(LocalStorage) public localStorageAPI: Storage
  ) {}

  ngOnInit(): void {
    console.log(this.constants);

    console.log(this.randomString);

    this.generator.pipe(takeUntil(timer(10000))).subscribe(console.log);

    this.localStorageAPI.setItem('a', 'b');
    console.log(this.localStorageAPI.getItem('a'));
  }
}
