import { Cone, OrbitControls, Plane, Sphere } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import Instruments from './Instruments'

const Mover = () => {
    const moverRef = useRef(null)
    useFrame(() => {
        if (!moverRef.current) return

        const position = moverRef.current.position

        position.x += 0.001
        position.y += 0.001
    })

    return (
        <group ref={moverRef}>
            <Cone args={[1, 2, 100, 100]}>
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
