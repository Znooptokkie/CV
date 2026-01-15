import { FourSides, FourSidesInner } from "../../types/svg/path.properties.type"
import { DeconstructPath } from "./DeconstructPath.js"
import { CreateSides } from "./CreateSides.js"

export class InnerPath 
{
    // Maak nieuwe Offset PATH string van de gegeven PATH en padding
    // Zie het als een border om het gegeven PATH heen
    public static buildOffsetPath(path: string, padding: number): string
    {
        const eachSideObjects = CreateSides.getEachSide(path)
        const mutateOffsetPath =  CreateSides.mutateOffsetPath(eachSideObjects!, padding)
        const mergeArrayOfObjects = CreateSides.mergePathArray(mutateOffsetPath)
        const createStringPath = DeconstructPath.createNewSVGPathString(mergeArrayOfObjects)

        return createStringPath
    }

    public static buildOffsetPathHexagon(path: string, padding: number): string {
        const eachSideObjects = DeconstructPath.getPathParts(path)
    
        // Verwijder laatste punt als het dubbel is
        if (
            eachSideObjects[0].x === eachSideObjects[eachSideObjects.length - 1].x &&
            eachSideObjects[0].y === eachSideObjects[eachSideObjects.length - 1].y
        ) {
            eachSideObjects.pop()
        }
    
        const n = eachSideObjects.length
        const newInnerValues = []
    
        // Hulpfuncties
        function normalize(v: { x: number; y: number }) 
        {
            const len = Math.hypot(v.x, v.y)
            return { x: v.x / len, y: v.y / len }
        }
    
        function intersect(a: any, b: any, c: any, d: any) 
        {
            const det = (a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x)
            if (det === 0) return null
            const t =((a.x - c.x) * (c.y - d.y) - (a.y - c.y) * (c.x - d.x)) / det
            return { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) }
        }
    
        for (let i = 0; i < n; i++) 
        {
            const prev = eachSideObjects[(i - 1 + n) % n]
            const curr = eachSideObjects[i]
            const next = eachSideObjects[(i + 1) % n]
        
            // Vorige zijde vector
            const dx1 = curr.x - prev.x
            const dy1 = curr.y - prev.y
            // const normal1 = normalize({ x: dy1, y: -dx1 }) // naar binnen loodrecht
        
            // Volgende zijde vector
            const dx2 = next.x - curr.x
            const dy2 = next.y - curr.y
            // const normal2 = normalize({ x: dy2, y: -dx2 }) // naar binnen loodrecht

            const normal1 = normalize({ x: dy1, y: -dx1 }) // altijd naar binnen
            const normal2 = normalize({ x: dy2, y: -dx2 }) // altijd naar binnen

            // inner padding naar binnen toepassen
            const a1 = { x: prev.x - normal1.x * padding, y: prev.y - normal1.y * padding }
            const b1 = { x: curr.x - normal1.x * padding, y: curr.y - normal1.y * padding }
            const a2 = { x: curr.x - normal2.x * padding, y: curr.y - normal2.y * padding }
            const b2 = { x: next.x - normal2.x * padding, y: next.y - normal2.y * padding }
        
            const p = intersect(a1, b1, a2, b2)
            if (p) newInnerValues.push(p)
        }
    
        const newPath = DeconstructPath.createNewSVGPathString(newInnerValues)
        // console.log(`OUD PATH: ${path}`)
        // console.log(`NEW PATH: ${newPath}`)
        return newPath
    }


}
