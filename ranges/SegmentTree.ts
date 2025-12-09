import type { Segment } from "./Segment.ts"
import { center } from "./Segment.ts"
//Implement a segment tree for O(log(n)) updates and O(log(n)) location of center of mass
export class SegmentTree {
    #raw: Segment[];
    readonly external_width: number;
    constructor(element_count: number, default_density: number = 0, external_width: number) {
        this.external_width = external_width;
        element_count = Math.abs(Math.round(element_count));
        this.#raw = [{ mass: default_density * element_count,  left: 0, right: element_count}];
        let faux_index = 1;
        while(faux_index <= this.#raw.length) {
            if((this.#raw[faux_index - 1].left + 1) !== this.#raw[faux_index - 1].right) {
                let middle = center(this.#raw[faux_index - 1]);
                this.#raw.push({mass: default_density * (middle - this.#raw[faux_index - 1].left), left: this.#raw[faux_index - 1].left, right: middle});
                this.#raw.push({mass: default_density * (this.#raw[faux_index - 1].right - middle), left: middle, right: this.#raw[faux_index - 1].right});
            }
            faux_index++;
        }
    }
};