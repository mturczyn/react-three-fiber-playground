import { useInstrumentation } from './useInstrumentation'

function printVector(vec) {
    return `x${vec.x.toFixed(5)} y${vec.y.toFixed(5)} z${vec.z.toFixed(5)}`
}

export default function Instruments() {
    const { force, acceleration, velocity, direction, position } =
        useInstrumentation()
    return (
        <ul>
            <li>{`Force: ${printVector(force)}`}</li>
            <li>{`Acceleration: ${printVector(acceleration)}`}</li>
            <li>{`Velocity: ${printVector(velocity)}`}</li>

            <li>{`Direction: ${printVector(direction)}`}</li>
            <li>{`Position: ${printVector(position)}`}</li>
        </ul>
    )
}
