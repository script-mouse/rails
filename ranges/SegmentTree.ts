import type { Segment } from "./segment.js"
import { centre, leftChild, rightChild, isLeaf} from "./segment.js"
import Matter from "matter-js";
//Implement a segment tree for O(log(n)) updates and O(log(n)) location of center of mass
export class SegmentTree {
    #raw: Segment[];
    //Stores the number of unit sized segments used to simulate the object. NOT equal to #raw.length
    readonly element_count: number;
    //The "forward" axis along which the block or other massive object slides
    slide_axis: Matter.Vector;

    transverse_axis: Matter.Vector;

    constructor(container: Matter.Body, element_count: number, transverse_axis: Matter.Vector, slide_axis: Matter.Vector) {
        this.element_count = element_count;
        this.slide_axis = slide_axis;
        this.transverse_axis = transverse_axis;
        element_count = Math.abs(Math.round(element_count));
        let default_density = container.density;
        this.#raw = [{ mass: default_density * element_count,  left: 0, right: element_count, parent: -1, waiting_changes: 0}];
        let index = 0;
        while(index < this.#raw.length) {
            if(!isLeaf(this.#raw[index])) {
                let middle = centre(this.#raw[index]);
                this.#raw[index].left_child = this.#raw.length;
                this.#raw.push({mass: default_density * (middle - this.#raw[index].left), left: this.#raw[index].left, right: middle, parent: index, waiting_changes: 0});                
                this.#raw[index].right_child = this.#raw.length;
                this.#raw.push({mass: default_density * (this.#raw[index].right - middle), left: middle, right: this.#raw[index].right, parent: index, waiting_changes: 0});

            }
            index++;
        }
    }

    centreOfMass(): Matter.Vector {
        let target = this.#raw[0].mass / 2;
        let index = 0;
        while(!isLeaf(this.#raw[index])) {
            if(this.#raw[leftChild(this.#raw[index])].mass > target) {
                index = leftChild(this.#raw[index]);
            } else {
                target -= this.#raw[leftChild(this.#raw[index])].mass;
                index = rightChild(this.#raw[index]);
            }
        }
        let center = this.#raw[index].left;
        if(target > 0 && this.#raw[index].mass > target) {
            center += (1.0 * target) / this.#raw[index].mass;
        }
        let result = Matter.Vector.mult(this.slide_axis, center / this.element_count);
        return Matter.Vector.add(result, this.transverse_axis);
    }


};
