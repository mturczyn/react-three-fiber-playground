import { create } from 'zustand'
import { Vector3 } from 'three'

export const useInstrumentation = create((set) => ({
    force: new Vector3(),
    acceleration: new Vector3(),
    velocity: new Vector3(),
    direction: new Vector3(),
    position: new Vector3(),
    setForce: (newVector) => set((state) => ({ force: newVector })),
    setAcceleration: (newVector) =>
        set((state) => ({ acceleration: newVector })),
    setVelocity: (newVector) => set((state) => ({ velocity: newVector })),
    setDirection: (newVector) => set((state) => ({ direction: newVector })),
    setPosition: (newVector) => set((state) => ({ position: newVector })),
}))
