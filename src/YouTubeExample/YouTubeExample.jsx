import { Cone, OrbitControls, Plane, Sphere } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import Instruments from './Instruments'
import { Vector3 } from 'three'
import { useInstrumentation } from './useInstrumentation'
import './YouTubeExample.css'

const FORCE_DAMPENING = 0.01
const ACCEL_DAMPENING = 0.01
const VELOCITY_DAMPENING = 0.01
const MIN_ACCEL = 0
const MAX_ACCEL = 1
const MIN_SPEED = 10
const MAX_SPEED = 30

const min = new Vector3(4, 2, 2)
const max = new Vector3(-4, -2, -1)

const Mover = () => {
    const moverRef = useRef(null)
    const velocityRef = useRef(new Vector3(0, 0, 0))
    const accelerationRef = useRef(new Vector3(0.01, 0, 0.05))
    const reportPosition = useInstrumentation((state) => state.setPosition)
    const reportVelocity = useInstrumentation((state) => state.setVelocity)
    const reportDirection = useInstrumentation((state) => state.setDirection)
    const reportAcceleration = useInstrumentation(
        (state) => state.setAcceleration
    )
    const reportForce = useInstrumentation((state) => state.setForce)

    useFrame(({ raycaster }) => {
        const mover = moverRef.current
        if (!mover) return

        const velocity = velocityRef.current
        if (!velocity) return

        const position = mover.position
        const acceleration = accelerationRef.current

        const pointerWorldPosition = new Vector3()
        raycaster.ray.at(5, pointerWorldPosition)
        const force = pointerWorldPosition.sub(position)
        reportForce(force)
        acceleration
            .add(force.clone().multiplyScalar(FORCE_DAMPENING))
            .clampLength(MIN_ACCEL, MAX_ACCEL)
        reportAcceleration(acceleration)
        velocity
            .add(acceleration.clone().multiplyScalar(ACCEL_DAMPENING))
            .clampLength(MIN_SPEED, MAX_SPEED)
        reportVelocity(velocity)
        position
            .add(velocity.clone().multiplyScalar(VELOCITY_DAMPENING))
            .min(min)
            .max(max)
        reportPosition(position)

        const direction = new Vector3()
        direction.copy(velocity).normalize()
        mover.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction)
        reportDirection(direction)
    })

    return (
        <group ref={moverRef}>
            <Cone args={[0.1, 0.2, 6]}>
                <meshLambertMaterial color="blue" />
            </Cone>
        </group>
    )
}

const Attractor = () => {
    const ref = useRef(null)
    useFrame(({ raycaster }) => {
        if (ref.current) {
            raycaster.ray.at(5, ref.current.position)
        }
    })

    return (
        <group ref={ref}>
            <Sphere args={[0.05, 32, 32]}>
                <meshLambertMaterial color="red" />
            </Sphere>
        </group>
    )
}

const Background = () => {
    return (
        <Plane args={[4, 4, 4, 4]} position={[0, 0, 0]}>
            <meshLambertMaterial color="white" opacity={0.5} wireframe />
        </Plane>
    )
}

const Scene = () => {
    const { advance } = useThree()
    const intervalId = useRef(undefined)

    useEffect(() => {
        intervalId.current = setInterval(() => advance(1), 1000)

        return () => {
            intervalId.current && clearInterval(intervalId.current)
        }
    }, [intervalId, advance])

    return (
        <>
            <OrbitControls />
            <ambientLight />
            {/* <pointLight intensity={2} position={[1, 1, -8]} />
            <pointLight intensity={2} position={[1, 1, 8]} /> */}
            <Attractor />
            <Mover />
            <Background />
        </>
    )
}

const YoutubeExample = () => {
    return (
        <>
            <Instruments />
            <Canvas>
                <Scene />
            </Canvas>
        </>
    )
}

export default YoutubeExample
