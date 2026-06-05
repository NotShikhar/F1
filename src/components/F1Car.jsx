import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function F1Car({ scrollProgress }) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const wheelsRef = useRef([])
  
  useFrame((_, delta) => {
    if (!groupRef.current) return
    
    const t = scrollProgress.current
    
    // Smooth scroll-driven movement
    const targetX = Math.sin(t * Math.PI * 2) * 2
    const targetY = Math.sin(t * Math.PI) * 0.5
    const targetZ = t * 3 - 1.5
    const targetRotY = t * Math.PI * 0.5
    const targetRotZ = Math.sin(t * Math.PI * 3) * 0.05
    
    // Smooth interpolation
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * delta * 3
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * delta * 3
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * delta * 3
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * delta * 2
    groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * delta * 3
    
    // Wheel rotation
    wheelsRef.current.forEach(wheel => {
      if (wheel) {
        wheel.rotation.x += delta * 8
      }
    })
    
    // Subtle body vibration at speed
    if (bodyRef.current) {
      bodyRef.current.position.y = Math.sin(performance.now() * 0.001 * 20) * 0.002
    }
  })
  
  // Create wheel geometry
  const wheelGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(0.35, 0.35, 0.25, 24)
    geo.rotateZ(Math.PI / 2)
    return geo
  }, [])
  
  // Create tire geometry
  const tireGeometry = useMemo(() => {
    const geo = new THREE.TorusGeometry(0.35, 0.12, 12, 24)
    geo.rotateY(Math.PI / 2)
    return geo
  }, [])
  
  return (
    <group ref={groupRef}>
      {/* Main body */}
      <group ref={bodyRef}>
        {/* Nose cone */}
        <mesh position={[2.8, 0, 0]} castShadow>
          <coneGeometry args={[0.15, 1.2, 8]} />
          <meshStandardMaterial color="#E8002D" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Main chassis body */}
        <mesh position={[0.5, 0.3, 0]} castShadow>
          <boxGeometry args={[5, 0.35, 1.2]} />
          <meshStandardMaterial color="#E8002D" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Side pods left */}
        <mesh position={[-0.5, 0.2, 0.7]} castShadow>
          <boxGeometry args={[2.5, 0.5, 0.35]} />
          <meshStandardMaterial color="#CC0028" metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Side pods right */}
        <mesh position={[-0.5, 0.2, -0.7]} castShadow>
          <boxGeometry args={[2.5, 0.5, 0.35]} />
          <meshStandardMaterial color="#CC0028" metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Engine cover */}
        <mesh position={[-1.5, 0.55, 0]} castShadow>
          <boxGeometry args={[1.8, 0.5, 0.9]} />
          <meshStandardMaterial color="#D40028" metalness={0.7} roughness={0.25} />
        </mesh>
        
        {/* Airbox */}
        <mesh position={[-1.2, 0.9, 0]} castShadow>
          <boxGeometry args={[0.8, 0.6, 0.7]} />
          <meshStandardMaterial color="#B80020" metalness={0.6} roughness={0.3} />
        </mesh>
        
        {/* Front wing */}
        <mesh position={[3.2, -0.1, 0]} castShadow>
          <boxGeometry args={[0.15, 0.1, 2.2]} />
          <meshStandardMaterial color="#E8002D" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Front wing endplates */}
        <mesh position={[3.2, 0, 1.15]} castShadow>
          <boxGeometry args={[0.15, 0.3, 0.05]} />
          <meshStandardMaterial color="#CC0028" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[3.2, 0, -1.15]} castShadow>
          <boxGeometry args={[0.15, 0.3, 0.05]} />
          <meshStandardMaterial color="#CC0028" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Rear wing */}
        <mesh position={[-2.8, 0.8, 0]} castShadow>
          <boxGeometry args={[0.8, 0.08, 1.8]} />
          <meshStandardMaterial color="#E8002D" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Rear wing support */}
        <mesh position={[-2.8, 0.5, 0]} castShadow>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <meshStandardMaterial color="#B80020" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Rear wing endplates */}
        <mesh position={[-2.4, 0.8, 0.95]} castShadow>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <meshStandardMaterial color="#CC0028" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-2.4, 0.8, -0.95]} castShadow>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <meshStandardMaterial color="#CC0028" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Cockpit */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.8, 0.3, 0.6]} />
          <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Halo safety device */}
        <mesh position={[0.3, 0.75, 0]} castShadow>
          <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1A1A1A" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Rear diffuser */}
        <mesh position={[-3, -0.1, 0]} castShadow>
          <boxGeometry args={[0.8, 0.2, 1.0]} />
          <meshStandardMaterial color="#B80020" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
      
      {/* Wheels */}
      {[
        { x: 2.5, z: 0.9 },
        { x: 2.5, z: -0.9 },
        { x: -2.0, z: 1.0 },
        { x: -2.0, z: -1.0 },
      ].map((pos, i) => (
        <group key={i} ref={(el) => wheelsRef.current[i] = el} position={[pos.x, 0, pos.z]}>
          <mesh geometry={tireGeometry} castShadow>
            <meshStandardMaterial color="#1A1A1A" metalness={0.3} roughness={0.8} />
          </mesh>
          <mesh geometry={wheelGeometry} castShadow>
            <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 0.26, 16]} />
            <meshStandardMaterial color="#E8002D" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}
      
      {/* Ferrari badge */}
      <mesh position={[3.35, 0.1, 0]} castShadow>
        <boxGeometry args={[0.02, 0.2, 0.15]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

export default F1Car
