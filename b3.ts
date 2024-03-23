import { keyInYNStrict } from "readline-sync";
import { Fraction } from "./b1";

class FractionList {
  public _fractions: Fraction[];
  constructor() {
    this._fractions = [];
  }

  scan(): void {
    let fraction = new Fraction(1, 1);
    fraction.scan();
    this._fractions.push(fraction);

    const isContinue = keyInYNStrict("Do you want to enter more?");
    if (isContinue) {
      this.scan();
    } else {
      return;
    }
  }

  print(): void {
    this._fractions.forEach((fraction) => {
      fraction.print();
    });
  }

  size(): number {
    return this._fractions.length;
  }

  resize(oldSize: number): void {
    if (this.size() < oldSize) {
      this._fractions.length = this.size();
    }

    if (this.size() > oldSize) {
      let dif = this.size() - oldSize;
      for (let i = 0; i < dif; i++) {
        this._fractions.push(new Fraction(0, 1));
      }
    }
  }

  isEmpty(): boolean {
    return this._fractions.length === 0;
  }

  at(i: number): Fraction {
    return this._fractions[i];
  }

  front(): Fraction {
    return this._fractions[0];
  }

  back(): Fraction {
    return this._fractions[this._fractions.length - 1];
  }

  data() {
    return this._fractions;
  }

  push_back(fraction: Fraction): void {
    this._fractions[this._fractions.length] = fraction;
  }

  pop_back() {
    this._fractions.length = this._fractions.length - 1;
  }

  // private shiftRightEl(shiftLength: number): void {
  //   for (
  //     let i = this._fractions.length - 1 + shiftLength;
  //     i >= shiftLength;
  //     i--
  //   ) {
  //     this._fractions[i] = this._fractions[i - shiftLength];
  //   }
  // }

  // insert(idx: number, fraction: Fraction): void {
  //   // shift element start from the idx to the right
  //   for (let i = this._fractions.length; i > idx; i--) {
  //     this._fractions[i] = this._fractions[i - 1];
  //   }
  //   this._fractions[idx] = fraction;
  // }
  //   insert(idx: number, fraction: Fraction[]): void {
  //     for(let i = 0; i < fraction.length; i++) {
  //       this._fractions[idx + i] = fraction[i];
  //     }
  //   }

  // overloading insert function

  insert(idx: number, fraction: Fraction): void;
  insert(idx: number, fraction: Fraction[]): void;
  insert(idx: number, fraction: any): void {
    // check if idx valid
    if (idx > this._fractions.length || idx < 0) {
      console.log("Invalid index");
      return;
    }

    let newLength = this._fractions.length + 1;
    let insertItemLength = 1;
    if (Object.prototype.toString.call(fraction) === "[object Array]") {
      newLength = this._fractions.length + fraction.length;
      insertItemLength = fraction.length;

      for (
        let i = newLength - 1, k = this._fractions.length - 1;
        k >= idx;
        i--, k--
      ) {
        this._fractions[i] = this._fractions[k];
        console.log(`i = ${i}`);
        this._fractions[i].print();
        console.log(`k = ${k}`);
        this._fractions[k].print();
      }

      // replace
      for (let i = 0; i < insertItemLength; i++) {
        this._fractions[idx + i] = fraction[i];
      }

      return;
    }

    for (
      let i = newLength - 1, k = this._fractions.length - 1;
      k >= idx;
      i--, k--
    ) {
      this._fractions[i] = this._fractions[k];
      console.log(`i = ${i}`);
      this._fractions[i].print();
      console.log(`k = ${k}`);
      this._fractions[k].print();
    }

    this._fractions[idx] = fraction;
  }

  // overloading erase function
  erase(): void;
  erase(start: number): void;
  erase(start: number, end: number): void;
  erase(start?: number, end?: number): void {
    console.log(`Fraction length = ${this._fractions.length}`);
    console.log(`BEFORE: start = ${start}, end = ${end}`);
    // check if index is valid
    if (start === undefined || start < this._fractions.length * -1) {
      start = 0;
    }

    if (start >= this._fractions.length) {
      return;
    }

    if (this._fractions.length * -1 <= start && start < 0) {
      start = start + this._fractions.length;
    }

    if (end === undefined || end >= this._fractions.length) {
      end = this._fractions.length;
    }

    if (end < this._fractions.length * -1) {
      end = 0;
    }

    if (this._fractions.length * -1 <= end && end < 0) {
      end = end + this._fractions.length;
    }

    if (end <= start) {
      return;
    }

    console.log(`END: start = ${start}, end = ${end}`);

    // erase action

    // erase everything
    if (start === 0 && end === this._fractions.length) {
      this._fractions.length = 0;
      this._fractions = [];
    }

    // erase from one certain index to the end of array
    if (end === this._fractions.length) {
      this._fractions.length = start + 1;
    }

    // erase within range of indices
    let remainingEndLength: number = this._fractions.length - end;

    for (let i = start; i <= remainingEndLength; i++) {
      this._fractions[i] = this._fractions[i + (end - start)];
    }

    this._fractions.length = this._fractions.length - (end - start);
  }

  // clear
  clear() {
    this._fractions.length = 0;
    this._fractions = [];
  }

  swap(newFractionList: Fraction[]) {
    let minArray: null | any[] = null;
    let maxArray: null | any[] = null;
    [minArray, maxArray] =
      this._fractions.length < newFractionList.length
        ? [this._fractions, newFractionList]
        : [newFractionList, this._fractions];
    let minLength = minArray.length;
    for (let i = 0; i < maxArray.length; i++) {
      if (i < minArray.length) {
        let temp = minArray[i];
        minArray[i] = maxArray[i];
        maxArray[i] = temp;
      } else {
        minArray[i] = maxArray[i];
      }
    }

    maxArray.length = minLength;
  }
}

let newFractionList: FractionList = new FractionList();
newFractionList.scan();
console.log("fract list");
console.log(newFractionList.print());
console.log(`\n###############\n`);
newFractionList.insert(3, new Fraction(2, 3));
console.log(`\n###############\n`);
newFractionList.insert(2, [new Fraction(2, 3), new Fraction(5, 17)]);

console.log("fract list after modified");
console.log(newFractionList.print());


// test erase
// newFractionList.erase();
// newFractionList.erase(1);
// newFractionList.erase(-1);
// newFractionList.erase(-1, -5);
// newFractionList.erase(1, -5);
newFractionList.erase(2, 4);

console.log('fract list after removed items')
console.log(newFractionList.print());

// test swap

let newFractionList2: FractionList = new FractionList();
newFractionList2.scan();

newFractionList.swap(newFractionList2._fractions);

console.log("newFractionList", newFractionList);
console.log("newFractionList2", newFractionList2);
