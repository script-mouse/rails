//A single point in our object or a single node in our segment tree
export type Segment = {
    mass: number;
    left: number;
    right: Segment["left"]
}

export function center(segment: Segment) : number {
    return segment.left + ((segment.right - segment.left) >> 1) + (segment.right - segment.left) & 1;
}