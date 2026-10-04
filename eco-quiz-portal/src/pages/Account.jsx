import {useState} from 'react';import {Link} from 'react-router-dom';import {Moon,RotateCcw,Sun} from 'lucide-react';
import {useApp,levelInfo,LEVELS} from '../store.jsx';import {Bar,Head} from '../components/ui.jsx';
export function Profile(){const {s}=useApp();const L=levelInfo(s.points),h=s.history;
const rec=h.filter(r=>r.cat==='recycling').some(r=>r.pct>=75);
const B=[['🏅','Quiz Master','Complete 5 quizzes',h.length>=5],['🌱','Eco Explorer','Complete your first quiz',h.length>=1],['♻️','Recycling Hero','Score 75%+ on Recycling',rec],['🔥','7-Day Streak','Keep a 7-day streak',s.streak>=7],['🌍','Planet Protector','Reach Level 4',L.n>=4]];
return <div><div className="glass p-8 flex flex-col sm:flex-row items-center gap-6 mb-6">
<div className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-300 to-sky-400 text-forest text-5xl font-bold grid place-items-center ring-4 ring-white/20">{s.name[0]}</div>
<div className="text-center sm:text-left flex-1 w-full"><h1 className="h1 text-3xl">{s.name}</h1><p className="text-mint">Level {L.n} – {L.name}</p>
<div className="my-3"><Bar pct={L.pct}/></div><div className="flex gap-6 justify-center sm:justify-start text-sm"><span>⭐ {s.points.toLocaleString()} Eco Points</span><span>🔥 {s.streak}-day streak</span></div></div></div>
<h2 className="font-display text-2xl font-bold mb-4">Achievements</h2>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{B.map(([i,n,d,ok])=><div key={n} className={`glass !rounded-2xl p-5 flex items-center gap-4 transition ${ok?'!bg-amber-300/15 border-amber-200/40':'opacity-50 grayscale'}`}><div className="text-4xl">{i}</div><div><div className="font-semibold">{n}</div><div className="text-xs text-white/65">{ok?'Unlocked':d}</div></div></div>)}</div>
<h2 className="font-display text-2xl font-bold mt-8 mb-4">Levels</h2><div className="glass p-5 space-y-2">{LEVELS.map(([n,p],i)=><div key={n} className={`flex justify-between ${L.n===i+1?'text-mint font-semibold':'text-white/60'}`}><span>Level {i+1} – {n}</span><span>{p} pts</span></div>)}</div>
<p className="text-sm text-white/60 mt-4">Points: quiz +100 · correct answer +20 · daily challenge +50 · article +25. <Link className="text-mint underline" to="/quizzes">Earn more</Link></p></div>}
export function Settings(){const {s,setName,toggleTheme,reset}=useApp();const [n,setN]=useState(s.name);const [ok,setOk]=useState('');
return <div className="max-w-xl"><Head title="Settings"/>
<div className="glass p-6 space-y-6"><div><label className="text-sm text-white/70">Display name</label><div className="flex gap-2 mt-1"><input className="inp" value={n} onChange={e=>setN(e.target.value)}/>
<button className="btn-p" onClick={()=>{n.trim()&&setName(n.trim());setOk('Name saved.')}}>Save</button></div>{ok&&<p className="text-sm text-mint mt-2">{ok}</p>}</div>
<div className="flex items-center justify-between"><div><div className="font-semibold">Theme</div><div className="text-sm text-white/60">Currently: {s.theme==='forest'?'Deep forest':'Light canopy'}</div></div>
<button onClick={toggleTheme} className="btn-g">{s.theme==='forest'?<Sun size={18}/>:<Moon size={18}/>}Switch</button></div>
<div className="flex items-center justify-between"><div><div className="font-semibold">Reset demo data</div><div className="text-sm text-white/60">Restore sample points and history</div></div>
<button onClick={()=>{reset();setN('Revanth');setOk('Demo data restored.')}} className="btn-g"><RotateCcw size={18}/>Reset</button></div></div></div>}
