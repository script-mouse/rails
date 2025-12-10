import { SegmentTree } from "../ranges/segmenttree.js";
import Matter from "matter-js";
let test = new SegmentTree(Matter.Bodies.circle(20, 20, 90), 27, Matter.Vector.create(50.7, 0), Matter.Vector.create(0, 67));
console.log(test);
console.log(test.centerOfMass());
