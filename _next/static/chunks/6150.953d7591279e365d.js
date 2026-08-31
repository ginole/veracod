"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6150],{6150:(e,t,r)=>{r.r(t),r.d(t,{RibbonFieldBackground:()=>s});var o=r(5155),a=r(2115);let i=`
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,n=`
        precision highp float;
        uniform vec2 resolution;
        uniform float time;
        uniform vec2 pointer;

        float hash(vec2 p) {
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 45.32);
          return fract(p.x * p.y);
        }

        float ribbon(vec2 uv, float offset, float width, float phase) {
          float y = 0.55 + 0.20 * sin((uv.x * 2.15) + phase) + 0.045 * sin((uv.x * 7.0) - phase * 0.7);
          float d = abs(uv.y - y - offset);
          return exp(-(d * d) / width);
        }

        void main() {
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec2 p = uv;
          p.x *= resolution.x / resolution.y;

          float t = time * 0.22;
          float drift = (pointer.x - 0.5) * 0.06;

          float rightFade = smoothstep(0.28, 0.72, uv.x);
          float centerDark = 1.0 - smoothstep(0.0, 0.88, distance(uv, vec2(0.18, 0.48)));

          float r1 = ribbon(vec2(uv.x + drift, uv.y), 0.03, 0.0065, t + 0.9);
          float r2 = ribbon(vec2(uv.x - drift * 0.7, uv.y), -0.23, 0.0085, t + 3.25);
          float r3 = ribbon(vec2(uv.x + drift * 0.4, uv.y), 0.25, 0.014, t + 1.85);

          float glow = r1 * 1.14 + r2 * 1.05 + r3 * 0.48;

          vec3 teal = vec3(0.17, 0.83, 0.75);
          vec3 cyan = vec3(0.22, 0.82, 0.96);
          vec3 indigo = vec3(0.39, 0.38, 0.92);
          vec3 purple = vec3(0.66, 0.33, 0.98);
          vec3 blue = vec3(0.23, 0.51, 0.96);

          vec3 col = vec3(0.0);
          col += cyan * r1 * 0.92;
          col += teal * r1 * 0.62;
          col += indigo * r3 * 0.42;
          col += blue * r2 * 0.66;
          col += purple * (r2 + r3) * 0.30;

          float bloom = exp(-pow(distance(uv, vec2(0.76, 0.40 + 0.035 * sin(t))), 2.0) / 0.050);
          bloom += exp(-pow(distance(uv, vec2(0.71, 0.75 + 0.025 * cos(t))), 2.0) / 0.030);
          col += vec3(0.42, 0.85, 1.0) * bloom * 0.34;

          vec2 grid = fract(gl_FragCoord.xy / 7.0) - 0.5;
          float dotShape = smoothstep(0.29, 0.11, length(grid));
          float noise = hash(floor(gl_FragCoord.xy / 7.0));
          float scan = 0.72 + 0.28 * sin((uv.x + uv.y) * 38.0 + time * 1.3);
          float dots = dotShape * (0.48 + 0.52 * noise) * scan;

          float micro = hash(gl_FragCoord.xy + time) * 0.035;
          float alpha = clamp((glow * 1.55 + bloom * 0.50) * dots * rightFade, 0.0, 1.0);
          alpha *= 1.0 - centerDark * 0.56;

          vec3 base = vec3(0.005, 0.005, 0.005);
          vec3 finalColor = mix(base, col, clamp(alpha * 1.55, 0.0, 1.0));
          finalColor += micro * rightFade;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,l={speed:1,pointerAmount:1,smoothing:.035,brightness:1,opacity:1,hue:0,saturation:1};function c(e,t,r){let o=e.createShader(t);if(!o)throw Error("Unable to create Axiom shader");if(e.shaderSource(o,r),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(o)??"Axiom shader compilation failed");return o}function s({className:e="",...t}){let r=(0,a.useRef)(null),s=(0,a.useRef)(null),f=(0,a.useRef)({...l,...t});f.current={...l,...t},(0,a.useEffect)(()=>{let e=r.current,t=s.current;if(!e||!t)return;let o=t.getContext("webgl",{alpha:!0,antialias:!1,premultipliedAlpha:!1});if(!o)return;let a=c(o,o.VERTEX_SHADER,i),l=c(o,o.FRAGMENT_SHADER,n),u=o.createProgram();if(!u)return;if(o.attachShader(u,a),o.attachShader(u,l),o.linkProgram(u),!o.getProgramParameter(u,o.LINK_STATUS))throw Error(o.getProgramInfoLog(u)??"Axiom program link failed");o.useProgram(u);let h=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,h),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),o.STATIC_DRAW);let d=o.getAttribLocation(u,"position");o.enableVertexAttribArray(d),o.vertexAttribPointer(d,2,o.FLOAT,!1,0,0);let m=o.getUniformLocation(u,"resolution"),v=o.getUniformLocation(u,"time"),p=o.getUniformLocation(u,"pointer"),g=.72,b=.42,x=.72,A=.42,w=0,y=!0,F=performance.now(),R=t=>{let r=e.getBoundingClientRect();x=.72+((t.clientX-r.left)/Math.max(r.width,1)-.72)*f.current.pointerAmount,A=.42+(1-(t.clientY-r.top)/Math.max(r.height,1)-.42)*f.current.pointerAmount},S=()=>{let r=e.getBoundingClientRect(),a=Math.min(window.devicePixelRatio||1,2);t.width=Math.max(1,Math.floor(r.width*a)),t.height=Math.max(1,Math.floor(r.height*a)),o.viewport(0,0,t.width,t.height),o.uniform2f(m,t.width,t.height)},E=e=>{let t=f.current;g+=(x-g)*t.smoothing,b+=(A-b)*t.smoothing,o.uniform1f(v,(e-F)*.001*t.speed),o.uniform2f(p,g,b),o.drawArrays(o.TRIANGLES,0,6),w=y&&!document.hidden?requestAnimationFrame(E):0},_=new ResizeObserver(S),C=new IntersectionObserver(([e])=>{(y=e?.isIntersecting??!0)&&!w&&(w=requestAnimationFrame(E)),!y&&w&&(cancelAnimationFrame(w),w=0)});return _.observe(e),C.observe(e),e.addEventListener("pointermove",R,{passive:!0}),S(),w=requestAnimationFrame(E),()=>{w&&cancelAnimationFrame(w),_.disconnect(),C.disconnect(),e.removeEventListener("pointermove",R),o.deleteBuffer(h),o.deleteShader(a),o.deleteShader(l),o.deleteProgram(u)}},[]);let u=f.current;return(0,o.jsx)("div",{ref:r,className:`threeui-background ribbon-field${e?` ${e}`:""}`,children:(0,o.jsx)("canvas",{ref:s,style:{opacity:u.opacity,filter:`hue-rotate(${u.hue}deg) saturate(${u.saturation}) brightness(${u.brightness})`}})})}}}]);