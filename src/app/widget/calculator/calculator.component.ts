import { Component, OnInit } from '@angular/core';
import { MemoryService } from 'src/app/service/memory.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  currentClickValue = '';

  constructor(
    public memory: MemoryService
  ) { }

  ngOnInit(): void {
  }

  receiveClick(value: string): void {
    this.currentClickValue = value;

    if (value === '=') {
      this.equal();
    } else if (value === 'C') {
      this.memory.buffer = '';
    } else if (value === 'Del') {
      this.memory.buffer = this.memory.buffer.substring(0, this.memory.buffer.length - 1);
    } else if (value === '+/-') {
      if (typeof parseFloat(this.memory.buffer) === 'number' && this.memory.buffer.length !== 0) {
        this.memory.buffer = `-${this.memory.buffer}`;
      }
    }
    else {
      const lastChar = this.memory.buffer[this.memory.buffer.length - 1];
      if (!(lastChar === value && (lastChar === '+' || lastChar === '-' || lastChar === '.'))) {
        this.memory.buffer += value;
      }
    }
  }

  equal(): void {
    let result = 0;
    let numbersStr = '';

    if (!this.memory.buffer.startsWith('-')) {
      numbersStr = this.memory.buffer.split('+').join(', ').split('-').join(', ');
    } else {
      numbersStr = this.memory.buffer.split('+').join(', ').split('-').join(', ').replace(', ', '-');
    }

    const numbersArray = numbersStr.split(', ').map((number: string) => parseFloat(number));
    const signsArray = Array.from(this.memory.buffer).filter(char => char === '+' || char === '-');
    this.memory.buffer[0] === '-' ? signsArray.shift() : null;

    numbersArray.map((number, index) => {
      if (signsArray[index] === '+') !index ? result = number + numbersArray[index + 1] : result += numbersArray[index + 1];
      else if (signsArray[index] === '-') !index ? result = number - numbersArray[index + 1] : result -= numbersArray[index + 1];
    });

    this.memory.buffer = result.toString();
  }

}
