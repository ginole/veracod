"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6423],{6423:(e,t,r)=>{r.r(t),r.d(t,{BellFieldBackground:()=>u});var o=r(5155),n=r(2115);let a=`
                attribute vec2 position;
                void main() { gl_Position = vec4(position, 0.0, 1.0); }
            `,i=`
                precision highp float;
                uniform vec2 u_resolution;
                uniform float u_time;
                uniform vec2 u_mouse;
                uniform float u_strike;

                #define PI 3.14159265359

                float hash(vec2 p) { return fract(sin(dot(p, vec2(23.71, 91.37))) * 41537.1234); }

                // damped-cosine stand-in for the Bessel envelope of a circular mode
                float bess(float x) { return cos(x - 0.785398) / sqrt(1.0 + abs(x)); }

                void main() {
                    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                    vec2 p = uv * 2.0 - 1.0;
                    p.x *= u_resolution.x / u_resolution.y;
                    p.y += 0.08;

                    vec2 m = u_mouse / u_resolution.xy * 2.0 - 1.0;
                    m.y = -m.y;
                    m.x *= u_resolution.x / u_resolution.y;
                    p -= m * 0.11;

                    float t = u_time * 0.09;
                    float r = length(p);
                    float a = atan(p.y, p.x);

                    // the bell drifts between partials the way a struck bell does
                    float ang = 3.0 + 1.6 * sin(t * 0.37) + sin(t * 0.19 + 1.7);
                    float k   = 3.1 + 1.0 * sin(t * 0.23 + 0.6);

                    float amp = 1.0 + (1.0 - u_strike) * 0.55;
                    float f1 = bess(r * k * PI - t * 2.2) * cos(ang * a + t * 0.5);
                    float f2 = bess(r * k * 1.6 * PI + t * 1.4) * cos((ang * 2.0 + 1.0) * a - t * 0.31);
                    float f = (f1 + f2 * 0.30) * amp;

                    // nodal lines — where the metal stands still
                    float node = 1.0 - smoothstep(0.0, 0.075 + 0.075 * r, abs(f));
                    // antinodes — where it moves, and glows hot
                    float anti = smoothstep(0.40, 0.95, abs(f));

                    // the crown stays quiet — clears a reading zone under the type
                    float open = smoothstep(0.14, 0.92, r);
                    node *= open;
                    anti *= open;

                    vec3 deep   = vec3(0.031, 0.055, 0.051);
                    vec3 patina = vec3(0.306, 0.608, 0.541);
                    vec3 bronze = vec3(0.847, 0.608, 0.247);
                    vec3 ash    = vec3(0.937, 0.914, 0.863);

                    vec3 col = deep;
                    col = mix(col, patina, node * 0.50);
                    col = mix(col, bronze, anti * 0.22);
                    col += ash * pow(node, 3.0) * 0.13;

                    // shock ring travelling out from the strike
                    float ring = smoothstep(0.06, 0.0, abs(r - u_strike * 2.3)) * (1.0 - u_strike);
                    col += mix(bronze, ash, 0.4) * ring * 0.7;

                    col *= mix(0.10, 1.0, smoothstep(2.0, 0.28, r));
                    col += (hash(gl_FragCoord.xy) - 0.5) * 0.022;

                    gl_FragColor = vec4(col, 1.0);
                }
            `,s={speed:1,pointerAmount:1,strikeDuration:2400,emberAmount:1,brightness:1,opacity:1,hue:0,saturation:1};function l(e,t,r){let o=e.createShader(t);if(!o)throw Error("Unable to create Bell Field shader");if(e.shaderSource(o,r),e.compileShader(o),!e.getShaderParameter(o,e.COMPILE_STATUS))throw Error(e.getShaderInfoLog(o)??"Bell Field shader compilation failed");return o}function u({className:e="",...t}){let r=(0,n.useRef)(null),u=(0,n.useRef)(null),h=(0,n.useRef)(null),c=(0,n.useRef)({...s,...t});c.current={...s,...t},(0,n.useEffect)(()=>{let e=r.current,t=u.current,o=h.current;if(!e||!t||!o)return;let n=t.getContext("webgl"),s=o.getContext("2d");if(!n||!s)return;let d=l(n,n.VERTEX_SHADER,a),m=l(n,n.FRAGMENT_SHADER,i),f=n.createProgram();if(!f)return;if(n.attachShader(f,d),n.attachShader(f,m),n.linkProgram(f),!n.getProgramParameter(f,n.LINK_STATUS))throw Error(n.getProgramInfoLog(f)??"Bell Field program link failed");n.useProgram(f);let p=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,p),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,-1,1,1,-1,1]),n.STATIC_DRAW);let g=n.getAttribLocation(f,"position");n.enableVertexAttribArray(g),n.vertexAttribPointer(g,2,n.FLOAT,!1,0,0);let v=n.getUniformLocation(f,"u_resolution"),x=n.getUniformLocation(f,"u_time"),b=n.getUniformLocation(f,"u_mouse"),w=n.getUniformLocation(f,"u_strike"),_=1,y=1,A=1,M=.5,k=.5,E=.5,R=.5,F=0,P=!0,S=!1,I=-1e9,L=performance.now(),B=Array.from({length:58},()=>({x:Math.random(),y:Math.random(),r:.4+1.4*Math.random(),vy:-(.1+.26*Math.random()),vx:(Math.random()-.5)*.08,ph:Math.random()*Math.PI*2,sp:.5+1.4*Math.random(),hot:.36>Math.random()})),T=()=>{let r=e.getBoundingClientRect();_=Math.max(1,r.width),y=Math.max(1,r.height),A=Math.min(window.devicePixelRatio||1,2),t.width=Math.max(1,Math.round(_*A)),t.height=Math.max(1,Math.round(y*A)),o.width=t.width,o.height=t.height,s.setTransform(A,0,0,A,0,0),n.viewport(0,0,t.width,t.height),n.uniform2f(v,t.width,t.height),S||(M=E=.5*_,k=R=.5*y,S=!0),B.forEach(e=>{e.x<=1&&(e.x*=_),e.y<=1&&(e.y*=y)})},C=t=>{let r=e.getBoundingClientRect(),o=c.current.pointerAmount;E=.5*_+(t.clientX-r.left-.5*_)*o,R=.5*y+(t.clientY-r.top-.5*y)*o},U=()=>{I=performance.now()},z=window.setTimeout(U,1700),N=window.setInterval(U,8200),$=e=>{let t=c.current,r=.001*e*t.speed;M+=(E-M)*.04,k+=(R-k)*.04,n.uniform1f(x,(e-L)*.001*t.speed),n.uniform1f(w,Math.min(1,Math.max(0,(e-I)/t.strikeDuration))),n.uniform2f(b,M*A,k*A),n.drawArrays(n.TRIANGLES,0,6),s.clearRect(0,0,_,y);let o=Math.max(0,Math.min(58,Math.round(58*t.emberAmount)));for(let e=0;e<o;e+=1){let o=B[e];o.y+=o.vy*t.speed,o.x+=(o.vx+.13*Math.sin(r*o.sp*.5+o.ph))*t.speed,o.y<-4&&(o.y=y+4,o.x=Math.random()*_),o.x<-4&&(o.x=_+4),o.x>_+4&&(o.x=-4);let n=.5+.5*Math.sin(r*o.sp+o.ph);s.beginPath(),s.arc(o.x,o.y,o.r,0,2*Math.PI),s.fillStyle=o.hot?`rgba(231, 193, 101, ${.06+.34*n})`:`rgba(143, 203, 185, ${.04+.24*n})`,s.fill()}F=P&&!document.hidden?requestAnimationFrame($):0},D=new ResizeObserver(T),q=new IntersectionObserver(([e])=>{(P=e?.isIntersecting??!0)&&!F&&(F=requestAnimationFrame($)),!P&&F&&(cancelAnimationFrame(F),F=0)});return D.observe(e),q.observe(e),e.addEventListener("pointermove",C,{passive:!0}),e.addEventListener("pointerdown",U),T(),F=requestAnimationFrame($),()=>{F&&cancelAnimationFrame(F),window.clearTimeout(z),window.clearInterval(N),D.disconnect(),q.disconnect(),e.removeEventListener("pointermove",C),e.removeEventListener("pointerdown",U),n.deleteBuffer(p),n.deleteShader(d),n.deleteShader(m),n.deleteProgram(f)}},[]);let d=c.current;return(0,o.jsxs)("div",{ref:r,className:`threeui-background bell-field${e?` ${e}`:""}`,style:{background:"#08100f",opacity:d.opacity,filter:`hue-rotate(${d.hue}deg) saturate(${d.saturation}) brightness(${d.brightness})`},children:[(0,o.jsx)("canvas",{ref:u,style:{zIndex:0}}),(0,o.jsx)("canvas",{ref:h,style:{zIndex:1,pointerEvents:"none"}})]})}}}]);