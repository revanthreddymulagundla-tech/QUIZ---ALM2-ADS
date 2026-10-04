import {useEffect,useState} from 'react';
export function Bg({strong}){
const leaves=['🍃','🌿','🍂','🍃','🌱','🍃','🌿','♻️'];
return <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#052e22] via-[#0a4a39] to-[#0e6b52]" aria-hidden>
<div className="absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-emerald-400/25 blur-3xl animate-float"/>
<div className="absolute top-1/3 -right-24 w-[26rem] h-[26rem] rounded-full bg-sky-400/20 blur-3xl animate-float" style={{animationDelay:'-3s'}}/>
<div className="absolute top-10 right-24 text-6xl opacity-20 animate-float">☁️</div>
{leaves.map((l,i)=><span key={i} className="absolute text-2xl opacity-30 animate-drift" style={{left:`${6+i*12}%`,animationDelay:`${-i*2.3}s`,animationDuration:`${16+i*2}s`}}>{l}</span>)}
{Array.from({length:14}).map((_,i)=><i key={i} className="absolute w-1.5 h-1.5 rounded-full bg-mint/40 animate-float" style={{left:`${(i*37)%100}%`,top:`${(i*53)%90}%`,animationDelay:`${-i}s`}}/>)}
<svg className={`absolute bottom-0 w-full ${strong?'h-2/5':'h-1/4'} opacity-80`} viewBox="0 0 1200 300" preserveAspectRatio="none">
<path d="M0 220 L180 90 L300 170 L460 40 L640 190 L800 80 L960 180 L1100 100 L1200 170 V300 H0Z" fill="#0b3b2e" opacity=".7"/>
<path d="M0 260 Q150 200 300 250 T600 240 T900 250 T1200 230 V300 H0Z" fill="#38bdf8" opacity=".25"/>
<path d="M0 270 L40 200 L80 270 L130 180 L180 270 L240 190 L290 270 L350 170 L410 270 L470 200 L530 270 L600 185 L660 270 L730 195 L790 270 L860 175 L920 270 L990 200 L1050 270 L1120 185 L1200 270 V300H0Z" fill="#052018"/>
<g transform="translate(980 60)" stroke="#a7f3d0" strokeWidth="3" opacity=".6"><path d="M0 130V0M0 0l-30 20M0 0l28 22M0 0l2-34"/></g></svg></div>}
export const Ring=({pct,size=140,stroke=12,children,color='#34d399'})=>{
const [p,setP]=useState(0);useEffect(()=>{const t=setTimeout(()=>setP(pct),100);return()=>clearTimeout(t)},[pct]);
const r=(size-stroke)/2,c=2*Math.PI*r;
return <div className="relative grid place-items-center" style={{width:size,height:size}}>
<svg width={size} height={size} className="-rotate-90"><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={stroke}/>
<circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c*(1-p/100)} style={{transition:'stroke-dashoffset 1.4s cubic-bezier(.2,.8,.2,1)'}}/></svg>
<div className="absolute text-center">{children}</div></div>};
export const Bar=({pct,color='from-emerald-400 to-teal-300'})=>{const [p,setP]=useState(0);useEffect(()=>{const t=setTimeout(()=>setP(pct),100);return()=>clearTimeout(t)},[pct]);
return <div className="h-3 rounded-full bg-white/10 overflow-hidden"><div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{width:`${p}%`,transition:'width 1.1s ease'}}/></div>};
export const Count=({to,suffix=''})=>{const [v,setV]=useState(0);useEffect(()=>{let f,t0;const step=t=>{t0??=t;const k=Math.min((t-t0)/1200,1);setV(Math.round(to*(1-Math.pow(1-k,3))));if(k<1)f=requestAnimationFrame(step)};f=requestAnimationFrame(step);return()=>cancelAnimationFrame(f)},[to]);
return <>{v.toLocaleString()}{suffix}</>};
export const Head=({title,sub})=><div className="mb-8"><h1 className="h1 text-3xl sm:text-4xl">{title}</h1>{sub&&<p className="text-white/70 mt-2 max-w-2xl">{sub}</p>}</div>;
