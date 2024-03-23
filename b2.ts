import { questionInt } from "readline-sync";

class IntArray {
  private _name: string;
  private _intArr: number[];
  constructor(name: string, ...elements: number[]) {
    this._name = name;
    this._intArr = [...elements];
  }

  public input(): void {
    let n: number = questionInt("Enter array size: ");
    for (let i = 0; i < n; i++) {
      let element: number = questionInt(`Enter element ${i}: `);
      this._intArr.push(element);
    }
  }

  public print(): void {
    console.log("Printing the array");
    this._intArr.forEach((item, idx) => {
      console.log(`Element at index ${idx}: ${item}`);
    });
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get intArr(): number[] {
    return this._intArr;
  }

  set intArr(intArr: number[]) {
    for (let i = 0; i < intArr.length; i++) {
      this._intArr[i] = intArr[i];
    }
  }

  public getElement(idx: number): number {
    if (idx < 0 || idx > this._intArr.length - 1)
      throw new Error("Invalid index");
    return this._intArr[idx];
  }

  public getSize(): number {
    return this._intArr.length;
  }

  public getSum(): number {
    return this._intArr.reduce((a, b) => a + b, 0);
  }

  private getMaxIdx(): number {
    let maxIdx = 0;
    this._intArr.forEach((item, idx) => {
      if (item > this._intArr[maxIdx]) {
        maxIdx = idx;
      }
    });

    return maxIdx;
  }

  public getMax(): number {
    let maxIdx: number = this.getMaxIdx();
    return this._intArr[maxIdx];
  }

  public getEven(): number[] {
    let tempArr: number[] = this._intArr;
    let result: number[] = [];
    tempArr.forEach((item, idx) => {
      if (item % 2 === 0) {
        result.push(item);
      }
    });

    return result;
  }

  public addHead(val: number): void {
    // shift all item to the right one index
    this._intArr[this._intArr.length] = this._intArr[this._intArr.length - 1];
    for (let i = this._intArr.length - 1; i > 0; i--) {
      this._intArr[i] = this._intArr[i - 1];
    }

    // replace the first element with new data
    this._intArr[0] = val;
  }

  public insert(idx: number, val: number): void {
    if (idx === 0) {
      this.addHead(val);
      return;
    }

    if (idx === this._intArr.length) {
      this._intArr[this._intArr.length] = val;
      return;
    }

    // shift all element starts from the index right one index
    for (let i = this._intArr.length; i > idx; i--) {
      this._intArr[i] = this._intArr[i - 1];
    }

    // replace the element at index with new data
    this._intArr[idx] = val;
  }

  public addElements(p: IntArray): void {
    for (let i = 0; i < p.intArr.length; i++) {
      console.log("leng of first array: ", this._intArr.length);
      this._intArr[this._intArr.length] = p.intArr[i];
    }
  }

  public erase(idx: number): number {
    if (idx === undefined) {
      this._intArr = [];
      return -1;
    }
    if (idx < 0 || idx > this._intArr.length - 1) {
      throw new Error("Invalid index");
    }

    for (let i = idx; i < this._intArr.length; i++) {
      this._intArr[i] = this._intArr[i + 1];
    }

    this._intArr.length = this._intArr.length - 1;

    return this._intArr[idx];
  }

  public clone(start: number, end: number): IntArray {
    let newArray: number[] = [];
    if (
      start < 0 ||
      start > this._intArr.length - 1 ||
      end < 0 ||
      end > this._intArr.length - 1
    ) {
      throw new Error("Invalid start or end index");
    }
    let i: number, j: number;
    for (i = start, j = 0; i <= end; i++, j++) {
      newArray[j] = this._intArr[i];
    }

    let newIntArrayObj: IntArray = new IntArray("newArray", ...newArray);

    return newIntArrayObj;
  }
}

let newArray: IntArray = new IntArray("newArray 1", 1, 2, 3, 4, 5, 6, 7);
let clonedArray: IntArray = newArray.clone(1, 6);
clonedArray.print();
// let newArray2: IntArray = new IntArray("newArray 2", -1, -7, 10, 20, 22);
// let newArray3: IntArray = new IntArray(
//   "newArray 2",
//   1000,
//   9000,
//   9001,
//   9002,
//   9003,
//   -100002
// );
// newArray.addElements(newArray2);
// console.log("new array");
// newArray.print();
// newArray.addElements(newArray3);
// console.log("new array");
// newArray.print();

// newArray.insert(7, 202);
// newArray.print();

// newArray.erase(1);
// console.log(newArray.intArr);
