export class OffsetVector
{
    // Bereken offset vector (loodrecht op segment, lengte = OFFSET)
    public static computeOffsetVector(p0: {x:number, y:number}, p1: {x:number, y:number}, offset: number)
    {
        let nx = -(p1.y - p0.y);
        let ny = p1.x - p0.x;
        const len = Math.sqrt(nx*nx + ny*ny);
        if(len === 0) return {x:0, y:0};
        nx /= len; ny /= len;
        return { x: nx * offset, y: ny * offset };
    }
}