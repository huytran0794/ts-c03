function swapArrays4(arr1: number[], arr2: number[]) {
  //   const maxLength = Math.max(arr1.length, arr2.length);
  //   const minLength = Math.min(arr1.length, arr2.length);
  // Swap elements and adjust array lengths simultaneously
  //   for (let i = 0; i < maxLength; i++) {
  //     // Swap elements if both arrays have elements at index i
  //     if (i < arr1.length && i < arr2.length) {
  //       const temp = arr1[i];
  //       arr1[i] = arr2[i];
  //       arr2[i] = temp;
  //     }
  //     // If arr1 has more elements, move excess elements to arr2
  //     else if (i < arr1.length) {
  //       let oldData = arr2[i];
  //       arr2.push(arr1[i]);
  //       arr1[i] = oldData;
  //     }
  //     // If arr2 has more elements, move excess elements to arr1
  //     else if (i < arr2.length) {
  //       let oldData = arr1[i];
  //       arr1.push(arr2[i]);
  //       arr2[i] = oldData;
  //     }
  //   }

  //   console.log("arr1", arr1);
  //   console.log("arr2", arr2);

  let minArray: null | any[] = null;
  let maxArray: null | any[] = null;
  [minArray, maxArray] =
    arr1.length < arr2.length ? [arr1, arr2] : [arr2, arr1];
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

let x: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
let y: number[] = [10, 11, 12];

swapArrays4(x, y);
