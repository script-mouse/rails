//A single point in our object or a single node in our segment tree
export type Segment = {
    mass: number;
    left: number;
    right: Segment["left"];
    parent: number;
    left_child?: Segment["parent"];
    right_child?: Segment["parent"];
    waiting_changes: Segment["mass"];
}
//test change
export function centre(segment: Segment) : number {
    return segment.left + ((segment.right - segment.left) >> 1);// + ((segment.right - segment.left) & 1);
}

//Get the index of the left child of the segment passed as an argument
export function leftChild(segment: Segment) : number {
    if (segment.left_child === undefined) {
        //ToDo: Make this a custom error type
        throw new Error("The children of leaf nodes should not be queried");
        return -1;
    } else {
        return segment.left_child;
    }
}

//Get the index of the right child of the segment passed as an argument
export function rightChild(segment: Segment) : number {
    if (segment.right_child === undefined) {
        //ToDo: Make this a custom error type
        throw new Error("The children of leaf nodes should not be queried");
        return -1;
    } else {
        return segment.right_child;
    }
}

//Return true iff this segment is unit width and should be a leaf.
export function isLeaf(segment: Segment) : boolean {
    return (segment.left + 1) === segment.right;
}