const stringConstructor = 'test'.constructor;
const arrayConstructor = [].constructor;
const objectConstructor = {}.constructor;

export function whatIsIt(object) {
    if (object === null) {
        return 'null';
    }
    if (object === undefined) {
        return 'undefined';
    }
    if (object.constructor === stringConstructor) {
        return 'String';
    }
    if (object.constructor === arrayConstructor) {
        return 'Array';
    }
    if (object.constructor === objectConstructor) {
        return 'Object';
    }
    return null;
}

export const getCourierStatus = (status) => {
    switch (status) {
        case 0:
            return 'Kuryer üçün hazırlanır';
        case 1:
            return 'Kuryerdədir';
        case 2:
            return 'Təhvil verilib';
        case 3:
        case 4:
            return 'Ləğv edilib';
        default:
            return 'Bilinməyən';
    }
};

export function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
}

export default function debounce(callback, wait, context = this) {
    let timeout = null;
    let callbackArgs = null;

    const later = () => {
        callback.apply(context, callbackArgs);
        timeout = null;
    };

    return function () {
        if (timeout) {
            clearTimeout(timeout);
        }
        callbackArgs = arguments;
        timeout = setTimeout(later, wait);
    };
}
