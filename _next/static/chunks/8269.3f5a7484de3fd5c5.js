"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8269],{8269:(e,t,r)=>{r.r(t),r.d(t,{StreamConvergenceBackground:()=>s});var i=r(5155),a=r(2115);let o=`
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`,n=`
                uniform float u_time;
                uniform vec2 u_resolution;
                uniform float u_interactive_fidelity;
                varying vec2 vUv;

                mat2 rotate2d(float _angle){
                    return mat2(cos(_angle),-sin(_angle),
                                sin(_angle),cos(_angle));
                }

                void main() {
                    vec2 p = vUv * 2.0 - 1.0;
                    p.x *= u_resolution.x / u_resolution.y;
                    p = rotate2d(0.55) * p;

                    vec3 color = vec3(0.0);
                    float spread = 0.06 * (0.3 + u_interactive_fidelity * 0.7);

                    for(int i = 0; i < 3; i++) {
                        float offset = float(1 - i) * spread;
                        float y = p.y + offset + (sin(p.x * 2.5 - u_time * 1.5) * 0.12);
                        float wave = smoothstep(0.85, 0.99, sin(y * 6.0 + u_time * 2.0) * 0.5 + 0.5);
                        
                        // Modulating color mixing logic for the violet-indigo theme
                        if(i == 0) color.r += wave * 1.2; 
                        if(i == 1) color.g += wave * 0.5; 
                        if(i == 2) color.b += wave * 1.8; 
                    }

                    float vignette = exp(-length(vUv * 2.0 - 1.0) * 0.8);
                    color *= vignette;

                    gl_FragColor = vec4(color, 1.0);
                }
            `,l={speed:1,fidelity:.5,scale:1,brightness:1,opacity:1,hue:0,saturation:1};function c(e,t,r){let i=e.createShader(t);if(!i)throw Error("Unable to create Stream Convergence shader");if(e.shaderSource(i,r),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(i)??"Stream Convergence shader compilation failed");return i}function s({className:e="",...t}){let r=(0,a.useRef)(null),s=(0,a.useRef)(null),u=(0,a.useRef)({...l,...t});u.current={...l,...t},(0,a.useEffect)(()=>{let e=r.current,t=s.current;if(!e||!t)return;let i=t.getContext("webgl",{alpha:!0,antialias:!1});if(!i)return;let a=c(i,i.VERTEX_SHADER,o),l=c(i,i.FRAGMENT_SHADER,`precision highp float;
${n}`),f=i.createProgram();if(!f)return;if(i.attachShader(f,a),i.attachShader(f,l),i.linkProgram(f),!i.getProgramParameter(f,i.LINK_STATUS))throw Error(i.getProgramInfoLog(f)??"Stream Convergence program link failed");i.useProgram(f);let g=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,g),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),i.STATIC_DRAW);let d=i.getAttribLocation(f,"position");i.enableVertexAttribArray(d),i.vertexAttribPointer(d,2,i.FLOAT,!1,0,0);let m=i.getUniformLocation(f,"u_time"),h=i.getUniformLocation(f,"u_resolution"),v=i.getUniformLocation(f,"u_interactive_fidelity"),_=0,p=!0,A=()=>{let r=e.getBoundingClientRect(),a=Math.min(window.devicePixelRatio||1,2);t.width=Math.max(1,Math.round(r.width*a)),t.height=Math.max(1,Math.round(r.height*a)),i.viewport(0,0,t.width,t.height),i.uniform2f(h,t.width,t.height)},w=e=>{let t=u.current;i.uniform1f(m,3e-4*e*t.speed),i.uniform1f(v,t.fidelity),i.drawArrays(i.TRIANGLES,0,6),_=p&&!document.hidden?requestAnimationFrame(w):0},S=new ResizeObserver(A),b=new IntersectionObserver(([e])=>{(p=e?.isIntersecting??!0)&&!_&&(_=requestAnimationFrame(w)),!p&&_&&(cancelAnimationFrame(_),_=0)});return S.observe(e),b.observe(e),A(),_=requestAnimationFrame(w),()=>{_&&cancelAnimationFrame(_),S.disconnect(),b.disconnect(),i.deleteBuffer(g),i.deleteShader(a),i.deleteShader(l),i.deleteProgram(f)}},[]);let f=u.current;return(0,i.jsx)("div",{ref:r,className:`threeui-background stream-convergence${e?` ${e}`:""}`,children:(0,i.jsx)("canvas",{ref:s,style:{opacity:f.opacity,filter:`hue-rotate(${f.hue}deg) saturate(${f.saturation}) brightness(${f.brightness})`,transform:`scale(${f.scale})`}})})}}}]);