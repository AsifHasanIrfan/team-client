export function reverseArray(newArray: Array<any>) {
    var ret = new Array;

    if (newArray?.length > 0) {
        for (var i = newArray?.length - 1; i >= 0; i--) {
          ret.push(newArray[i]);
        }
    }

    return ret;
}