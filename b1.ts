import { keyInYNStrict, questionInt } from "readline-sync";

class Fraction {
  private _tuso: number;
  private _mauso: number;
  constructor(tuso: number, mauso: number) {
    this._tuso = tuso;
    this._mauso = mauso;
  }

  public scan(): void {
    let isAgain: boolean = true;
    while (true) {
      this._tuso = questionInt("Nhap tu so: ");
      this._mauso = questionInt("Nhap mau so: ");

      if (this._mauso == 0) {
        console.log("Mau so phai khac 0");
        isAgain = keyInYNStrict("Ban muon nhap lai khong?") as boolean;
      } else {
        isAgain = false;
      }

      if (!isAgain) {
        break;
      }
    }
  }

  public print(): void {
    console.log(`Phan so = ${this._tuso}/${this._mauso}`);
  }

  private findGCD(a: number, b: number): number {
    let c: number = a;
    if (a > b) {
      c = b;
    }

    for (let i = c; i >= 1; i--) {
      if (a % i === 0 && b % i === 0) {
        return i;
      }
    }

    return 1;
  }

  public reduce(): void {
    let gcd: number = this.findGCD(this._tuso, this._mauso);
    if (gcd > 1) {
      this._tuso /= gcd;
      this._mauso /= gcd;
    }
  }

  public normalize(): void {
    this._mauso = Math.abs(this._mauso);
    if (this._tuso * this._mauso > 0) {
      this._tuso = Math.abs(this._tuso);
    } else if (this._tuso * this._mauso === 0) {
      this._tuso = 0;
      this._mauso = 1;
    } else {
      this._tuso = -Math.abs(this._tuso);
    }
  }

  public plus(f: Fraction): Fraction {
    let tuso2: number = this._tuso * f._mauso + this._mauso * f._tuso;
    let mauso2: number = this._mauso * f._mauso;
    let newFraction: Fraction = new Fraction(tuso2, mauso2);
    newFraction.reduce();
    return newFraction;
  }

  public multiply(f: Fraction): Fraction {
    let tuso2: number = this._tuso * f._tuso;
    let mauso2: number = this._mauso * f._mauso;

    let newFraction: Fraction = new Fraction(tuso2, mauso2);
    newFraction.reduce();
    return newFraction;
  }

  public equal(f: Fraction): boolean {
    this.reduce();
    f.reduce();

    return this._tuso === f._tuso && this._mauso === f._mauso;
  }

  public lessThan(f: Fraction): boolean {
    if (
      (this._tuso === f._tuso && this._mauso > f._mauso) ||
      (this._mauso === f._mauso && this._tuso < f._tuso)
    ) {
      return true;
    }

    let tempMauSo: number = this._mauso;

    this._tuso *= f._mauso;
    this._mauso *= f._mauso;

    f._tuso *= tempMauSo;
    f._mauso *= tempMauSo;

    return this._tuso < f._tuso;
  }
}

let fraction: Fraction = new Fraction(1, 2);

// test scan
console.log("test scan");
fraction.scan();

// print
console.log("fraction 1");
fraction.print();

// reduce fraction 1
fraction.reduce();

console.log("fraction 1 after reduce");
fraction.print();

let fraction2: Fraction = new Fraction(1, 2);
// test scan & print
console.log("fraction 2");
fraction2.scan();
fraction2.print();

// reduce fraction 2
fraction2.reduce();
console.log("fraction 2 after reduce");
fraction2.print();

// test plus
let plusResult: Fraction = fraction.plus(fraction2);
console.log("Sum result =");
plusResult.print();

// test multiply
let multiplyResult: Fraction = fraction.multiply(fraction2);
console.log(`multiply result = `);
multiplyResult.print()

// compare
let isEqual: boolean = fraction.equal(fraction2);

console.log(
  isEqual
    ? "fraction 1 is equal to fraction 2"
    : "fraction 1 is not equal to fraction 2"
);

// less than

let isLessthan: boolean = fraction.lessThan(fraction2);
console.log(
  isLessthan
    ? "fraction 1 is less than fraction 2"
    : "fraction 1 is greater than fraction 2"
);

export { Fraction };
