"use client"

// WaterRippleImage — ambient WebGL water-refraction effect over an image
// or a looping video (src is sniffed by extension). Sized to its parent
// container via ResizeObserver, matching the sibling ShaderBackground
// component in this folder. Optionally (colorOnHover) tracks the pointer
// to reveal color through the grayscale grade in a soft area around the
// cursor, its edge warped by the same noise field driving the ripple.

import { useEffect, useRef } from "react"

type Params = {
  blueish: number
  scale: number
  illumination: number
  surfaceDistortion: number
  waterDistortion: number
  /** 1 = full color, 0 = grayscale */
  saturation: number
  /** Contrast pivot around mid-gray; 1 = unchanged */
  contrast: number
  /** Screen-space vignette strength, 0 = off */
  vignette: number
  /** Radius (in aspect-corrected UV units) of the pointer color-reveal area */
  revealRadius: number
  /** Image or video URL (.mp4/.webm/.mov/.m4v plays as a looping video texture) */
  src: string
}

export type WaterRippleImageProps = Partial<Params> & {
  className?: string
  /** Reveal full color under the cursor over an otherwise desaturated video */
  colorOnHover?: boolean
}

const VERT = `
precision mediump float;
varying vec2 vUv;
attribute vec2 a_position;
void main() {
  vUv = .5 * (a_position + 1.);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;

varying vec2 vUv;
uniform sampler2D u_image_texture;
uniform float u_time;
uniform float u_ratio;
uniform float u_img_ratio;
uniform float u_blueish;
uniform float u_scale;
uniform float u_illumination;
uniform float u_surface_distortion;
uniform float u_water_distortion;
uniform float u_saturation;
uniform float u_contrast;
uniform float u_vignette;
uniform vec2 u_pointer;
uniform float u_cursor_presence;
uniform float u_reveal_radius;

vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
  m = m*m;
  m = m*m;
  vec3 x = 2. * fract(p * C.www) - 1.;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130. * dot(m, g);
}

mat2 rotate2D(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

float surface_noise(vec2 uv, float t, float scale) {
  vec2 n = vec2(.1);
  vec2 N = vec2(.1);
  mat2 m = rotate2D(.5);
  for (int j = 0; j < 10; j++) {
    uv *= m;
    n *= m;
    vec2 q = uv * scale + float(j) + n + (.5 + .5 * float(j)) * (mod(float(j), 2.) - 1.) * t;
    n += sin(q);
    N += cos(q) / scale;
    scale *= 1.2;
  }
  return (N.x + N.y + .1);
}

void main() {
  vec2 uv = vUv;
  uv.y = 1. - uv.y;
  uv.x *= u_ratio;

  // Slower pace and a much smaller sin() sway — the original oscillated
  // its noise frequency quickly enough to read as back-and-forth pulsing
  // rather than a steady current.
  float t = .0014 * u_time;
  vec3 color = vec3(0.);
  float opacity = 0.;

  float outer_noise = snoise((.3 + .04 * sin(t)) * uv + vec2(0., .2 * t));
  vec2 surface_noise_uv = 2. * uv + (outer_noise * .2);

  float surf = surface_noise(surface_noise_uv, t, u_scale);
  surf *= pow(uv.y, .3);
  surf = pow(surf, 2.);

  // Pointer color-reveal mask: built from the same uv space and the same
  // surf noise field as the ripple distortion above, so its edge undulates
  // with the water instead of reading as a hard circle.
  float reveal = 0.;
  if (u_cursor_presence > 0.001) {
    vec2 cursor = u_pointer;
    cursor.y = 1. - cursor.y;
    cursor.x *= u_ratio;
    float cursorDist = length(uv - cursor) - surf * 0.16;
    reveal = u_cursor_presence
      * (1. - smoothstep(u_reveal_radius * 0.55, u_reveal_radius, cursorDist));
  }

  // Cover-fit the image to the canvas: crop the axis where the image is
  // relatively wider/taller than the canvas rather than squashing it into
  // a smaller centered box (the naive version of this crops the wrong axis).
  vec2 cover = (u_ratio > u_img_ratio)
    ? vec2(1., u_img_ratio / u_ratio)
    : vec2(u_ratio / u_img_ratio, 1.);
  // cover fits screen edges to texture edges exactly at scale 1.0, so a
  // small inward margin (<1) is needed to keep the ripple's distortion
  // from pushing samples past the texture edge into the clamp/fade band.
  vec2 img_uv = (vUv - .5) * cover * .92 + .5;
  img_uv.y = 1. - img_uv.y;

  img_uv += (u_water_distortion * outer_noise);
  img_uv += (u_surface_distortion * surf);

  vec4 img = texture2D(u_image_texture, img_uv);
  img *= (1. + u_illumination * surf);

  color += img.rgb;
  color += u_illumination * vec3(1. - u_blueish, 1., 1.) * surf;
  opacity += img.a;

  float edge_width = .04;
  float edge_alpha = smoothstep(0., edge_width, img_uv.x) * smoothstep(1., 1. - edge_width, img_uv.x);
  edge_alpha *= smoothstep(0., edge_width, img_uv.y) * smoothstep(1., 1. - edge_width, img_uv.y);
  color *= edge_alpha;
  opacity *= edge_alpha;

  // Cinematic grade: contrast first, then saturation — locally boosted by
  // the reveal mask so the cursor brings color back through a desaturated
  // grade instead of just toggling it globally.
  color = (color - 0.5) * u_contrast + 0.5;

  float local_saturation = clamp(u_saturation + reveal, 0., 1.);
  if (local_saturation < .999) {
    float luma = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luma), color, local_saturation);
  }

  if (u_vignette > 0.0001) {
    float vd = length(vUv - 0.5) * 1.41421356;
    color *= 1. - u_vignette * smoothstep(0.35, 1.0, vd);
  }

  gl_FragColor = vec4(clamp(color, 0., 1.), opacity);
}
`

function compileShader(gl: WebGLRenderingContext, src: string, type: number) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(sh)
    gl.deleteShader(sh)
    throw new Error(`Shader compile error: ${info || "unknown"}`)
  }
  return sh
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
  const v = compileShader(gl, vs, gl.VERTEX_SHADER)
  const f = compileShader(gl, fs, gl.FRAGMENT_SHADER)
  const prog = gl.createProgram()!
  gl.attachShader(prog, v)
  gl.attachShader(prog, f)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(prog)
    gl.deleteProgram(prog)
    throw new Error(`Program link error: ${info || "unknown"}`)
  }
  return prog
}

const DEFAULTS: Params = {
  blueish: 0.6,
  scale: 7,
  illumination: 0.15,
  surfaceDistortion: 0.07,
  waterDistortion: 0.03,
  saturation: 1,
  contrast: 1,
  vignette: 0,
  revealRadius: 0.4,
  src: "/media/hero-coastline.mp4",
}

export default function WaterRippleImage({
  blueish = DEFAULTS.blueish,
  scale = DEFAULTS.scale,
  illumination = DEFAULTS.illumination,
  surfaceDistortion = DEFAULTS.surfaceDistortion,
  waterDistortion = DEFAULTS.waterDistortion,
  saturation = DEFAULTS.saturation,
  contrast = DEFAULTS.contrast,
  vignette = DEFAULTS.vignette,
  revealRadius = DEFAULTS.revealRadius,
  src = DEFAULTS.src,
  colorOnHover = false,
  className,
}: WaterRippleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const paramsRef = useRef<Params>({
    blueish,
    scale,
    illumination,
    surfaceDistortion,
    waterDistortion,
    saturation,
    contrast,
    vignette,
    revealRadius,
    src,
  })

  // Keep the latest params available to the render loop without
  // re-running the WebGL init effect on every prop change.
  useEffect(() => {
    paramsRef.current = {
      blueish,
      scale,
      illumination,
      surfaceDistortion,
      waterDistortion,
      saturation,
      contrast,
      vignette,
      revealRadius,
      src,
    }
  }, [
    blueish,
    scale,
    illumination,
    surfaceDistortion,
    waterDistortion,
    saturation,
    contrast,
    vignette,
    revealRadius,
    src,
  ])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext("webgl", { alpha: true, antialias: true })
    if (!gl) return

    const program = createProgram(gl, VERT, FRAG)
    gl.useProgram(program)

    const uniforms: Record<string, WebGLUniformLocation | null> = {}
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
    for (let i = 0; i < uniformCount; i++) {
      const info = gl.getActiveUniform(program, i)
      if (!info) continue
      uniforms[info.name] = gl.getUniformLocation(program, info.name)
    }

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const vbo = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    let texture: WebGLTexture | null = null
    let disposed = false
    const isVideoSrc = /\.(mp4|webm|mov|m4v)(\?|#|$)/i.test(paramsRef.current.src)

    const allocateTexture = () => {
      texture = gl.createTexture()
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.uniform1i(uniforms["u_image_texture"], 0)
    }

    const uploadFrame = (media: TexImageSource) => {
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, media)
    }

    let video: HTMLVideoElement | null = null
    let img: HTMLImageElement | null = null
    let videoReady = false

    if (isVideoSrc) {
      video = document.createElement("video")
      video.muted = true
      video.loop = true
      video.playsInline = true
      video.autoplay = true
      video.preload = "auto"
      video.addEventListener("loadedmetadata", () => {
        if (disposed || !video) return
        gl.uniform1f(uniforms["u_img_ratio"], video.videoWidth / video.videoHeight)
      })
      video.addEventListener("canplay", () => {
        videoReady = true
      })
      video.src = paramsRef.current.src
      video.play().catch(() => {})
      allocateTexture()
    } else {
      img = new Image()
      img.decoding = "async"
      img.onload = () => {
        if (disposed || !img) return
        allocateTexture()
        uploadFrame(img)
        gl.uniform1f(uniforms["u_img_ratio"], img.naturalWidth / img.naturalHeight)
      }
      img.src = paramsRef.current.src
    }

    let bounds = canvas.getBoundingClientRect()
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rawWidth = Math.max(1, Math.round(bounds.width * dpr))
      const rawHeight = Math.max(1, Math.round(bounds.height * dpr))
      // Cap total pixels to keep the 10-octave surface_noise loop cheap
      // on large desktop hero areas, matching oceanic-currents.tsx.
      const pixelScale = Math.min(
        1,
        Math.sqrt(2_000_000 / Math.max(1, rawWidth * rawHeight)),
      )
      const width = Math.max(1, Math.round(rawWidth * pixelScale))
      const height = Math.max(1, Math.round(rawHeight * pixelScale))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }
      gl.uniform1f(uniforms["u_ratio"], canvas.width / canvas.height)
    }

    let visible = document.visibilityState === "visible"
    let inView = true
    let raf = 0
    const start = performance.now()

    const requestRender = () => {
      if (!disposed && visible && inView && raf === 0) {
        raf = requestAnimationFrame(render)
      }
    }

    // Pointer color-reveal tracking (only wired up when requested — no
    // listener cost otherwise). Target/current pairs are eased in the
    // render loop, same pattern as ShaderBackground's cursor tracking.
    let targetU = 0.5
    let targetV = 0.5
    let currentU = 0.5
    let currentV = 0.5
    let targetPresence = 0
    let cursorPresence = 0
    let pointerKnown = false
    let pointerClientX = 0
    let pointerClientY = 0
    let lastPointerFrame: number | null = null

    const updatePointerTarget = () => {
      if (!pointerKnown || bounds.width === 0 || bounds.height === 0) return
      const inside =
        pointerClientX >= bounds.left &&
        pointerClientX <= bounds.right &&
        pointerClientY >= bounds.top &&
        pointerClientY <= bounds.bottom
      if (!inside) {
        targetPresence = 0
        requestRender()
        return
      }
      targetU = (pointerClientX - bounds.left) / bounds.width
      // vUv is bottom-origin before the shader's own 1-y flip, so flip here
      // to match rather than in the shader (kept identical to the uv/img_uv
      // transform it's compared against).
      targetV = 1 - (pointerClientY - bounds.top) / bounds.height
      targetPresence = 1
      requestRender()
    }
    const onPointerMove = (event: PointerEvent) => {
      pointerKnown = true
      pointerClientX = event.clientX
      pointerClientY = event.clientY
      bounds = canvas.getBoundingClientRect()
      updatePointerTarget()
    }
    const onPointerLeave = () => {
      pointerKnown = false
      targetPresence = 0
      requestRender()
    }
    if (colorOnHover) {
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      window.addEventListener("pointercancel", onPointerLeave)
      window.addEventListener("blur", onPointerLeave)
      document.documentElement.addEventListener("pointerleave", onPointerLeave)
    }

    const render = (now: number) => {
      raf = 0
      if (disposed || !visible || !inView) return
      if (video && videoReady && video.readyState >= video.HAVE_CURRENT_DATA) {
        uploadFrame(video)
      }
      const p = paramsRef.current
      gl.uniform1f(uniforms["u_blueish"], p.blueish)
      gl.uniform1f(uniforms["u_scale"], p.scale)
      gl.uniform1f(uniforms["u_illumination"], p.illumination)
      gl.uniform1f(uniforms["u_surface_distortion"], p.surfaceDistortion)
      gl.uniform1f(uniforms["u_water_distortion"], p.waterDistortion)
      gl.uniform1f(uniforms["u_saturation"], p.saturation)
      gl.uniform1f(uniforms["u_contrast"], p.contrast)
      gl.uniform1f(uniforms["u_vignette"], p.vignette)
      if (colorOnHover) {
        const dt = lastPointerFrame === null ? 0 : Math.min((now - lastPointerFrame) / 1000, 0.1)
        lastPointerFrame = now
        const follow = 1 - Math.exp(-10 * dt)
        currentU += (targetU - currentU) * follow
        currentV += (targetV - currentV) * follow
        cursorPresence += (targetPresence - cursorPresence) * follow
        gl.uniform2f(uniforms["u_pointer"], currentU, currentV)
        gl.uniform1f(uniforms["u_cursor_presence"], cursorPresence)
        gl.uniform1f(uniforms["u_reveal_radius"], p.revealRadius)
      }
      // Elapsed ms since mount, not raw performance.now() — the shader
      // runs in mediump precision, and feeding it an ever-growing
      // wall-clock timestamp drifts into visible noise artifacts after
      // a tab has been open for a while.
      gl.uniform1f(uniforms["u_time"], now - start)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      requestRender()
    }

    const updateLayout = () => {
      bounds = canvas.getBoundingClientRect()
      resizeCanvas()
      requestRender()
    }
    updateLayout()

    const resizeObserver = new ResizeObserver(updateLayout)
    resizeObserver.observe(canvas)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true
      if (inView) {
        video?.play().catch(() => {})
        requestRender()
      } else {
        video?.pause()
        if (raf !== 0) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      }
    })
    intersectionObserver.observe(canvas)
    const onVisibilityChange = () => {
      visible = document.visibilityState === "visible"
      if (visible) {
        if (inView) video?.play().catch(() => {})
        requestRender()
      } else {
        video?.pause()
        if (raf !== 0) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("resize", updateLayout)

    requestRender()

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("resize", updateLayout)
      if (colorOnHover) {
        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("pointercancel", onPointerLeave)
        window.removeEventListener("blur", onPointerLeave)
        document.documentElement.removeEventListener("pointerleave", onPointerLeave)
      }
      if (video) {
        video.pause()
        video.removeAttribute("src")
        video.load()
      }
      if (texture) gl.deleteTexture(texture)
      gl.deleteBuffer(vbo)
      gl.deleteProgram(program)
    }
  }, [src, colorOnHover])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  )
}

export { WaterRippleImage }
