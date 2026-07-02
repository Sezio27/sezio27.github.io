"use client";

import { useEffect, useRef } from "react";

interface AuroraBackgroundProps {
  isDark: boolean;
}

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// ITERATIONS is injected per device — fewer ray iterations on mobile GPUs
const fragmentShader = (iterations: number) => `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;

#define NUM_OCTAVES 3
#define ITERATIONS ${iterations.toFixed(1)}

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
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.4;
  }
  return v;
}

// tanh() is unavailable in GLSL ES 1.00 (WebGL1)
vec4 tanh4(vec4 x) {
  vec4 e = exp(2.0 * x);
  return (e - 1.0) / (e + 1.0);
}

void main() {
  vec2 p = ((gl_FragCoord.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6., -4., 4., 6.);
  vec4 o = vec4(0.);
  float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

  // GLSL ES 1.00 requires constant-form loop bounds
  for (float i = 1.0; i <= ITERATIONS; i += 1.0) {
    vec2 v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13., 11.)) * 3.5;
    float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / ITERATIONS));
    vec4 auroraColors = vec4(
      0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
      0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
      0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
      1.0
    );
    vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
    float thinnessFactor = smoothstep(0., 1., i / ITERATIONS) * 0.6;
    o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
  }

  o = tanh4(pow(o / 100.0, vec4(1.6)));
  gl_FragColor = o * 1.5;
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Aurora shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function AuroraBackground({ isDark }: AuroraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "0";
    canvas.style.pointerEvents = "none";

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    container.appendChild(canvas);

    const isMobile = window.innerWidth < 768;
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader(isMobile ? 12 : 20));
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Aurora program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Full-screen quad (triangle strip)
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "iTime");
    const resolutionLoc = gl.getUniformLocation(program, "iResolution");

    // The aurora sits behind a frosted overlay, so render at half resolution
    // and let CSS upscale — ~4x less fragment work, visually indistinguishable
    const resolutionScale = 0.5 * Math.min(window.devicePixelRatio, 1.5);

    const resize = () => {
      const w = Math.max(1, Math.round(window.innerWidth * resolutionScale));
      const h = Math.max(1, Math.round(window.innerHeight * resolutionScale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(resolutionLoc, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (timeSec: number) => {
      gl.uniform1f(timeLoc, timeSec);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // Animation loop — throttled to 30fps; static single frame for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;

    if (prefersReducedMotion) {
      draw(5);
    } else {
      const startTime = performance.now();
      const frameInterval = 1000 / 30;
      let lastFrameTime = 0;

      const animate = (now: number) => {
        rafId = requestAnimationFrame(animate);
        if (now - lastFrameTime < frameInterval) return;
        lastFrameTime = now;
        draw((now - startTime) * 0.001);
      };
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (container.contains(canvas)) {
        container.removeChild(canvas);
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
            : "rgba(250, 250, 252, 0.78)",
          transition: "background 0.3s ease",
        }}
      />
    </>
  );
}
