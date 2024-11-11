import { Canvas } from '@react-three/fiber'

const R3FLessonsApp = () => {
    return (
        <div id="canvas-container">
            <Canvas>
                <mesh>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial />
                    <ambientLight intensity={0.1} />
                    <directionalLight color="red" position={[0, 0, 1]} />
                </mesh>
            </Canvas>
        </div>
    )
}

export default R3FLessonsApp
