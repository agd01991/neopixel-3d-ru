import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Model = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1E1F21); // Установка цвета фона сцены
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    rendererRef.current = renderer;
    renderer.shadowMap.enabled = true; // Включение отображения теней
    mountRef.current.appendChild(renderer.domElement);

    const loader = new STLLoader();
    loader.load('/testmodel.stl', geometry => {
      console.log(geometry);
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff }); // Используем MeshPhongMaterial для отображения теней
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.1, 0.1, 0.1);
      mesh.castShadow = true; // Включение отбрасывания теней
      scene.add(mesh);

      // Вывод информации о модели в консоль
      console.log('Модель загружена:', mesh);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    const light = new THREE.DirectionalLight(0xffffff, 1); // Добавление направленного света
    light.position.set(0, 10, 0);
    light.castShadow = true; // Включение отбрасывания теней от источника света
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      rendererRef.current.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      controlsRef.current.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default Model;
