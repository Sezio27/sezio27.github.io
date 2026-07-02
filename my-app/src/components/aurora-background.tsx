"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface AuroraBackgroundProps {
  isDark: boolean;
}

const VERTEX_SHADER = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
uniform float iTime;
uniform vec2 iResolution;

#define NUM_OCTAVES 3

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);
  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
    u.y
  );
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.3;
  vec2 shift = vec2(100);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.4;
  }
  return v;
}

void main() {
  vec2 p = ((gl_FragCoord.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6., -4., 4., 6.);
  vec4 o = vec4(0.);
  float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

  for (float i = 0.; i++ < 20.;) {
    vec2 v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13., 11.)) * 3.5;
    float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 20.0));
    vec4 auroraColors = vec4(
      0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
      0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
      0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
      1.0
    );
    vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
    float thinnessFactor = smoothstep(0., 1., i / 20.) * 0.6;
    o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
  }

  o = tanh(pow(o / 100.0, vec4(1.6)));
  gl_FragColor = o * 1.5;
}
`;

export function AuroraBackground({ isDark }: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = "0";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Uniforms
    const uniforms: { iTime: THREE.IUniform<number>; iResolution: THREE.IUniform<THREE.Vector2> } = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    // Full-screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
    });
    scene.add(new THREE.Mesh(geometry, material));

    // Resize handler
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation loop — throttled to 30fps
    let rafId: number;
    const startTime = performance.now();
    const frameInterval = 1000 / 30;
    let lastFrameTime = 0;

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate);
      if (now - lastFrameTime < frameInterval) return;
      lastFrameTime = now;
      uniforms.iTime.value = (now - startTime) * 0.001;
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* Canvas mount point */}
      <div ref={containerRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Overlay to tone down the aurora — light: frosted white, dark: deep tint */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: isDark
            ? "rgba(0, 0, 10, 0.55)"
            : "rgba(245, 245, 247, 0.45)",
          transition: "background 0.3s ease",
        }}
      />
    </>
  );
}
