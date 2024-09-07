import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function CubeWithPath() {
  const cubeRef = useRef()
  const lineRef = useRef()

  useFrame((state) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      cubeRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  const cubeSize = 2
  const startPoint = new THREE.Vector3(-cubeSize/2, -cubeSize/2, -cubeSize/2)
  const endPoint = new THREE.Vector3(cubeSize/2, cubeSize/2, cubeSize/2)

  const pathPoints = [
    startPoint,
    new THREE.Vector3(-cubeSize/2, -cubeSize/2, cubeSize/2),
    new THREE.Vector3(cubeSize/2, -cubeSize/2, cubeSize/2),
    endPoint
  ]

  return (
    <group>
      <mesh ref={cubeRef}>
        <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
        <meshStandardMaterial color="skyblue" transparent opacity={0.5} />
      </mesh>
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pathPoints.length}
            array={new Float32Array(pathPoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="red" linewidth={2} />
      </line>
    </group>
  )
}

export default function Component() {
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Shortest Path Around a Cube</h1>
      <div className="w-full max-w-2xl h-96 bg-white rounded-lg shadow-lg overflow-hidden">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <CubeWithPath />
          <OrbitControls />
        </Canvas>
      </div>
      <p className="mt-4 text-center max-w-2xl">
        This visualization shows the shortest path from one corner of a cube to the opposite corner, 
        traveling only along the edges. The red line represents this path, which covers three edges of the cube.
      </p>
    </div>
  )
}