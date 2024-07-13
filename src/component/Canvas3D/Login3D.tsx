import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bvh, OrbitControls, useHelper } from '@react-three/drei';
// import { MeshBVHVisualizer } from 'three-mesh-bvh';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import * as THREE from 'three';

const pointDist = 25;
const raycaster = new THREE.Raycaster();
const origVec = new THREE.Vector3();
const dirVec = new THREE.Vector3();
const cyl = new THREE.CylinderGeometry(0.02, 0.02);
const sph = new THREE.SphereGeometry(0.25, 20, 20);
const bas = new THREE.MeshBasicMaterial();
const tra = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.25 });

const Rays: any = (props: any) => {
    const ref = useRef<THREE.Group>(null);
    const { count } = useControls({ count: { value: 100, min: 0, max: 500 } });

    return (
        <>
            <group ref={ref} {...props} />
            {Array.from({ length: count }, (_, id) => {
                return <Ray key={id} target={ref} />;
            })}
        </>
    );
};

const Ray: React.FC<{ target: React.RefObject<THREE.Group> }> = ({ target }) => {
    const objRef = useRef<THREE.Group>(null);
    const origMesh = useRef<THREE.Mesh>(null);
    const hitMesh = useRef<THREE.Mesh>(null);
    const cylinderMesh = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (hitMesh.current) hitMesh.current.scale.multiplyScalar(0.5);
        if (origMesh.current) origMesh.current.position.set(pointDist, 0, 0);
        if (objRef.current) {
            objRef.current.rotation.x = Math.random() * 10;
            objRef.current.rotation.y = Math.random() * 10;
        }
    }, []);

    const xDir = Math.random() - 0.5;
    const yDir = Math.random() - 0.5;

    useFrame((state, delta) => {
        if (!objRef.current || !origMesh.current || !hitMesh.current || !cylinderMesh.current) return;

        const obj = objRef.current;
        obj.rotation.x += xDir * delta;
        obj.rotation.y += yDir * delta;
        origMesh.current.updateMatrixWorld();
        origVec.setFromMatrixPosition(origMesh.current.matrixWorld);
        dirVec.copy(origVec).multiplyScalar(-1).normalize();
        raycaster.set(origVec, dirVec);
        raycaster.firstHitOnly = true;
        const res = raycaster.intersectObject(target.current!, true);
        const length = res.length ? res[0].distance : pointDist;
        hitMesh.current.position.set(pointDist - length, 0, 0);
        cylinderMesh.current.position.set(pointDist - length / 2, 0, 0);
        cylinderMesh.current.scale.set(1, length, 1);
        cylinderMesh.current.rotation.z = Math.PI / 2;
    });

    return (
        <group ref={objRef}>
            <mesh ref={origMesh} geometry={sph} material={bas} />
            <mesh ref={hitMesh} geometry={sph} material={bas} />
            <mesh ref={cylinderMesh} geometry={cyl} material={tra} />
        </group>
    );
};

const Torus: React.FC = (props) => {
    const mesh: any = useRef<THREE.Mesh>(null);
    const sphere: any = useRef<THREE.Mesh>(null);

    // useHelper(mesh, MeshBVHVisualizer);

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.x = mesh.current.rotation.y += delta;
        }
    });

    return (
        <mesh
            ref={mesh}
            {...props}
            onPointerMove={(e) => sphere.current?.position.copy(mesh.current!.worldToLocal(e.point))}
            onPointerOver={() => { if (sphere.current) sphere.current.visible = true; }}
            onPointerOut={() => { if (sphere.current) sphere.current.visible = false; }}>
            <torusKnotGeometry args={[1, 0.4, 200, 50]} />
            <meshNormalMaterial />
            <mesh raycast={() => null} ref={sphere} visible={false}>
                <sphereGeometry args={[0.2]} />
                <meshBasicMaterial color="orange" toneMapped={false} />
            </mesh>
        </mesh>
    );
};

const Canvas3D: React.FC = () => {
    const { enabled } = useControls({ enabled: true });

    return (
        <Canvas camera={{ position: [0, 0, 40], far: 100 }}>
            <color attach="background" args={['#202025']} />
            <Perf position="bottom-right" style={{ margin: 10 }} />
            <Bvh firstHitOnly enabled={enabled}>
                <Rays>
                    <Torus />
                </Rays>
            </Bvh>
            <OrbitControls />
        </Canvas>
    );
};

export default Canvas3D;
