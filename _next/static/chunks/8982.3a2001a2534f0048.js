"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8982],{8982:(e,t,a)=>{a.r(t),a.d(t,{EMERALD_HORIZON_DEFAULTS:()=>u,EmeraldHorizonBackground:()=>s});var o=a(5155),i=a(2115),n=a(6845);let l=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`,r=`
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_wave_scale;
uniform float u_variation;
uniform float u_glow;
uniform float u_vignette;
varying vec2 vUv;
float hash(float n) { return fract(sin(n) * 1e4); }
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), u);
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float yPos = st.y;
  float wave1 = sin(st.x * 3.0 + u_time * 0.5) * 0.1 * u_wave_scale;
  float wave2 = sin(st.x * 5.0 - u_time * 0.3) * 0.05 * u_wave_scale;
  float combinedWave = wave1 + wave2;
  float intensity = smoothstep(0.4, -0.1, yPos + combinedWave);
  float variation = noise(st.x * 2.0 + u_time * 0.1) * 0.5 + 0.5;
  intensity *= variation * 1.5 * u_variation;
  vec3 color = vec3(0.0, 0.02, 0.0);
  vec3 glowColor1 = vec3(0.05, 0.8, 0.2);
  vec3 glowColor2 = vec3(0.0, 1.0, 0.5);
  vec3 finalGlow = mix(glowColor1, glowColor2, st.x + sin(u_time*0.2)*0.5);
  color += finalGlow * pow(intensity, 1.5) * 1.2 * u_glow;
  float vignette = mix(1.0, smoothstep(1.2, 0.5, length(st - vec2(0.5, 0.0))), u_vignette);
  color *= vignette;
  gl_FragColor = vec4(color, 1.0);
}
`,u={speed:1,waveScale:1,variation:1,glow:1,vignette:1,hue:0};function s({className:e="",...t}){let a=(0,i.useRef)(null),s=(0,i.useRef)(null),v=(0,i.useRef)({...u,...t});return v.current={...u,...t},(0,i.useEffect)(()=>{let e=a.current,t=s.current;if(!e||!t)return;let o=new n.Z58,i=new n.qUd(-1,1,1,-1,0,1),u=new n.JeP({canvas:t,alpha:!0,antialias:!0});u.setPixelRatio(Math.min(window.devicePixelRatio,2));let c={u_time:{value:0},u_resolution:{value:new n.I9Y(1,1)},u_wave_scale:{value:1},u_variation:{value:1},u_glow:{value:1},u_vignette:{value:1}},f=new n.BKk({vertexShader:l,fragmentShader:r,uniforms:c,depthWrite:!1,depthTest:!1}),_=new n.bdM(2,2);o.add(new n.eaF(_,f));let m=0,w=!0,d=performance.now(),g=()=>{let t=e.getBoundingClientRect();u.setSize(t.width,t.height,!1),c.u_resolution.value.set(t.width,t.height)},h=e=>{let t=v.current;c.u_time.value=(e-d)*.001*t.speed,c.u_wave_scale.value=t.waveScale,c.u_variation.value=t.variation,c.u_glow.value=t.glow,c.u_vignette.value=t.vignette,u.render(o,i),m=w&&!document.hidden?requestAnimationFrame(h):0},x=new ResizeObserver(g),p=new IntersectionObserver(([e])=>{(w=e?.isIntersecting??!0)&&!m&&(m=requestAnimationFrame(h)),!w&&m&&(cancelAnimationFrame(m),m=0)});return x.observe(e),p.observe(e),g(),m=requestAnimationFrame(h),()=>{m&&cancelAnimationFrame(m),x.disconnect(),p.disconnect(),_.dispose(),f.dispose(),u.dispose()}},[]),(0,o.jsx)("div",{ref:a,className:`threeui-background emerald-horizon${e?` ${e}`:""}`,children:(0,o.jsx)("canvas",{ref:s,style:{filter:`hue-rotate(${v.current.hue}deg)`}})})}}}]);