import { keyInYN, question, questionInt } from "readline-sync";

class Fraction {
  private _tuso: number;
  private _mauso: number;
  constructor(tuso: number, mauso: number) {
    this._tuso = tuso;
    this._mauso = mauso;
  }

  public scan(): void {
    let isAgain: boolean = true;
    while (isAgain) {
      this._tuso = questionInt("Nhap tu so: ");
      this._mauso = questionInt("Nhap mau so: ");

      if (this._mauso == 0) {
        console.log("Mau so phai khac 0");
        isAgain = keyInYN("Ban muon nhap lai khong?") as boolean;
      } else {
        isAgain = false;
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

  public plus(f: Fraction): void {
    let tuso: number = this._tuso * f._mauso + this._mauso * f._tuso;
    let mauso: number = this._mauso * f._mauso;
    this._tuso = tuso;
    this._mauso = mauso;
    this.reduce();
    console.log(`Phan so tong la: ${this._tuso}/${this._mauso}`);
  }
  public multiply(f: Fraction): void {
    let tuso: number = this._tuso * f._tuso;
    let mauso: number = this._mauso * f._mauso;
    this._tuso = tuso;
    this._mauso = mauso;
    this.reduce();
    console.log(`Phan so tich la: ${this._tuso}/${this._mauso}`);
  }
  public equal(f: Fraction): boolean {
    this.reduce();
    let tempTuSo: number = this._tuso;
    let tempMauSo: number = this._mauso;

    this._tuso = f._tuso;
    this._mauso = f._mauso;

    this.reduce();

    console.log(`Phan so dau tien sau khi rut gon: ${tempTuSo}/${tempMauSo}`);
    console.log(
      `Phan so thu hai sau khi rut gon: ${this._tuso}/${this._mauso}`
    );
    return tempTuSo == this._tuso && tempMauSo == this._mauso;
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

    console.log(`f1: ${this._tuso}/${this._mauso}`);
    console.log(`f2: ${f._tuso}/${f._mauso}`);

    return this._tuso < f._tuso;
  }
}

let f1: Fraction = new Fraction(3, 7);
f1.scan();
f1.print();
