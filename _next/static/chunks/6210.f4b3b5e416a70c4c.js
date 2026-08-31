"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6210,9471],{6210:(e,u,t)=>{t.r(u),t.d(u,{DotMatrixBackground:()=>a.DotMatrixBackground});var a=t(9471)},9471:(e,u,t)=>{t.r(u),t.d(u,{DOT_MATRIX_DEFAULTS:()=>s,DotMatrixBackground:()=>l});var a=t(5155),i=t(2115),n=t(6845);let o=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`,r=`
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uGridScale;
uniform float uMouseAmount;
uniform float uPulseSpeed;
uniform float uRadius;
uniform float uOpacity;
varying vec2 vUv;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;
  uv += uMouse * uMouseAmount;
  vec2 grid = fract(uv * uGridScale);
  vec2 id = floor(uv * uGridScale);
  float dist = length(grid - vec2(0.5));
  float pulse = sin(uTime * uPulseSpeed + id.x * 0.05 + id.y * 0.05) * 0.5 + 0.5;
  float radius = 0.08 + pulse * uRadius;
  float alpha = smoothstep(radius, radius - 0.05, dist);
  vec2 center = vec2(0.5 * aspect, 0.5);
  float depthFade = smoothstep(1.2, 0.1, length(uv - center));
  vec3 color = vec3(0.0, 0.9, 1.0) * pulse;
  gl_FragColor = vec4(color, alpha * depthFade * uOpacity);
}
`,s={speed:1,gridScale:60,mouseAmount:.04,pulseSpeed:.4,radius:.15,opacity:.35,hue:0};function l({className:e="",...u}){let t=(0,i.useRef)(null),l=(0,i.useRef)(null),d=(0,i.useRef)({...s,...u});return d.current={...s,...u},(0,i.useEffect)(()=>{let e=t.current,u=l.current;if(!e||!u)return;let a=new n.JeP({canvas:u,antialias:!0,alpha:!0});a.setPixelRatio(Math.min(window.devicePixelRatio,2));let i=new n.Z58,s=new n.qUd(-1,1,1,-1,.1,10);s.position.z=1;let c={uTime:{value:0},uResolution:{value:new n.I9Y},uMouse:{value:new n.I9Y},uGridScale:{value:60},uMouseAmount:{value:.04},uPulseSpeed:{value:.4},uRadius:{value:.15},uOpacity:{value:.35}},v=new n.bdM(2,2),m=new n.BKk({uniforms:c,vertexShader:o,fragmentShader:r,transparent:!0,depthWrite:!1});i.add(new n.eaF(v,m));let p=new n.I9Y,f=new n.I9Y,h=0,g=!0,w=performance.now(),R=e=>{let t=u.getBoundingClientRect();f.x=(e.clientX-t.left)/Math.max(1,t.width)*2-1,f.y=-((e.clientY-t.top)/Math.max(1,t.height)*2-1)},x=()=>{let u=e.getBoundingClientRect();a.setSize(u.width,u.height,!1),c.uResolution.value.set(u.width,u.height)},S=e=>{let u=d.current;p.lerp(f,.05),c.uTime.value=(e-w)*.001*u.speed,c.uMouse.value=p,c.uGridScale.value=u.gridScale,c.uMouseAmount.value=u.mouseAmount,c.uPulseSpeed.value=u.pulseSpeed,c.uRadius.value=u.radius,c.uOpacity.value=u.opacity,a.render(i,s),h=g&&!document.hidden?requestAnimationFrame(S):0},M=new ResizeObserver(x),y=new IntersectionObserver(([e])=>{(g=e?.isIntersecting??!0)&&!h&&(h=requestAnimationFrame(S)),!g&&h&&(cancelAnimationFrame(h),h=0)});return M.observe(e),y.observe(e),u.addEventListener("pointermove",R,{passive:!0}),x(),h=requestAnimationFrame(S),()=>{h&&cancelAnimationFrame(h),M.disconnect(),y.disconnect(),u.removeEventListener("pointermove",R),v.dispose(),m.dispose(),a.dispose()}},[]),(0,a.jsx)("div",{ref:t,className:`threeui-background dot-matrix${e?` ${e}`:""}`,children:(0,a.jsx)("canvas",{ref:l,style:{filter:`hue-rotate(${d.current.hue}deg)`}})})}}}]);