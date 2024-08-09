"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
exports.hexStringtoBytesArray = hexStringtoBytesArray;
exports.toObject = toObject;
function sleep(seconds) {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, seconds * 1000);
        });
    });
}
function hexStringtoBytesArray(hexString) {
    if (hexString.substring(0, 2) == '0x') {
        hexString = hexString.substring(2);
    }
    let result = [];
    for (let i = 0; i < hexString.length; i += 2) {
        result.push(parseInt(hexString.substring(i, i + 2), 16));
    }
    return Uint8Array.from(result);
}
function toObject(data, key) {
    if (Array.isArray(data)) {
        return data.map((item) => toObject(item, key));
    }
    else if (typeof data === 'object' && data !== null) {
        const filteredData = {};
        Object.keys(data).forEach((key) => {
            if (isNaN(key) && key !== '__length__') {
                filteredData[key] = toObject(data[key], key);
            }
        });
        return filteredData;
    }
    else if (typeof data === 'bigint') {
        if (key == 'index') {
            return Number(data);
        }
        return data.toString();
    }
    else {
        return data;
    }
}
