export function centre(segment) {
    return segment.left + ((segment.right - segment.left) >> 1); // + ((segment.right - segment.left) & 1);
}
//Get the index of the left child of the segment passed as an argument
export function leftChild(segment) {
    if (segment.left_child === undefined) {
        //ToDo: Make this a custom error type
        throw new Error("The children of leaf nodes should not be queried");
        return -1;
    }
    else {
        return segment.left_child;
    }
}
//Get the index of the right child of the segment passed as an argument
export function rightChild(segment) {
    if (segment.right_child === undefined) {
        //ToDo: Make this a custom error type
        throw new Error("The children of leaf nodes should not be queried");
        return -1;
    }
    else {
        return segment.right_child;
    }
}
//Return true iff this segment is unit width and should be a leaf.
export function isLeaf(segment) {
    return (segment.left + 1) === segment.right;
}
