var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SegmentTree_raw;
import { center, leftChild, rightChild, isLeaf } from "./segment.js";
import Matter from "matter-js";
//Implement a segment tree for O(log(n)) updates and O(log(n)) location of center of mass
export class SegmentTree {
    constructor(container, element_count, transverse_axis, slide_axis) {
        _SegmentTree_raw.set(this, void 0);
        this.element_count = element_count;
        this.slide_axis = slide_axis;
        this.transverse_axis = transverse_axis;
        element_count = Math.abs(Math.round(element_count));
        let default_density = container.density;
        __classPrivateFieldSet(this, _SegmentTree_raw, [{ mass: default_density * element_count, left: 0, right: element_count, parent: -1 }], "f");
        let index = 0;
        while (index < __classPrivateFieldGet(this, _SegmentTree_raw, "f").length) {
            console.log(index, __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].left, __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].right);
            if (!isLeaf(__classPrivateFieldGet(this, _SegmentTree_raw, "f")[index])) {
                let middle = center(__classPrivateFieldGet(this, _SegmentTree_raw, "f")[index]);
                __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].left_child = __classPrivateFieldGet(this, _SegmentTree_raw, "f").length;
                __classPrivateFieldGet(this, _SegmentTree_raw, "f").push({ mass: default_density * (middle - __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].left), left: __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].left, right: middle, parent: index });
                __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].right_child = __classPrivateFieldGet(this, _SegmentTree_raw, "f").length;
                __classPrivateFieldGet(this, _SegmentTree_raw, "f").push({ mass: default_density * (__classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].right - middle), left: middle, right: __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].right, parent: index });
            }
            index++;
        }
    }
    centerOfMass() {
        let target = __classPrivateFieldGet(this, _SegmentTree_raw, "f")[0].mass / 2;
        let index = 0;
        while (!isLeaf(__classPrivateFieldGet(this, _SegmentTree_raw, "f")[index])) {
            console.log(target, index, leftChild(__classPrivateFieldGet(this, _SegmentTree_raw, "f")[index]), __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].mass);
            if (__classPrivateFieldGet(this, _SegmentTree_raw, "f")[leftChild(__classPrivateFieldGet(this, _SegmentTree_raw, "f")[index])].mass > target) {
                index = leftChild(__classPrivateFieldGet(this, _SegmentTree_raw, "f")[index]);
            }
            else {
                target -= __classPrivateFieldGet(this, _SegmentTree_raw, "f")[leftChild(__classPrivateFieldGet(this, _SegmentTree_raw, "f")[index])].mass;
                index = rightChild(__classPrivateFieldGet(this, _SegmentTree_raw, "f")[index]);
            }
        }
        let center = __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].left;
        if (target > 0 && __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].mass > target) {
            center += (1.0 * target) / __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].mass;
        }
        console.log(target, __classPrivateFieldGet(this, _SegmentTree_raw, "f")[index].left, center, "!");
        let result = Matter.Vector.mult(this.slide_axis, center / this.element_count);
        return Matter.Vector.add(result, this.transverse_axis);
    }
}
_SegmentTree_raw = new WeakMap();
;
