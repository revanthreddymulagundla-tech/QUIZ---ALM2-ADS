import {CheckCircle2,Check} from 'lucide-react';
import {CATS,CHALLENGES,MOCK_USERS} from '../data.js';import {useApp,levelInfo,day} from '../store.jsx';import {Bar,Count,Head,Ring} from '../components/ui.jsx';
const avgBy=(h,id)=>{const x=h.filter(r=>r.cat===id);return x.length?Math.round(x.reduce((a,r)=>a+r.pct,0)/x.length):null};
export function Leaderboard(){const {s}=useApp();
const rows=[...MOCK_USERS.map(([n,p,q])=>({n,p,q})),{n:s.name,p:s.points,q:s.history.length,me:true}].sort((a,b)=>b.p-a.p).map((r,i)=>({...r,rank:i+1}));
const me=rows.find(r=>r.me),medal=['🥇','🥈','🥉'];
return <div><Head title="🏆 ECO CHAMPIONS" sub="Top learners this season. Sample data for demonstration."/>
<div className="glass p-5 mb-6 flex items-center gap-4 border-emerald-300/40 !bg-emerald-400/15"><div className="text-3xl font-extrabold text-mint">#{me.rank}</div>
<div className="flex-1"><div className="text-xs text-white/60">Your Rank</div><div className="font-semibold text-lg">{me.n}</div></div><div className="text-right font-bold">{me.p.toLocaleString()}<div className="text-xs font-normal text-white/60">Eco Points</div></div></div>
<div className="space-y-3">{rows.map(r=><div key={r.n} className={`glass !rounded-2xl p-4 flex items-center gap-3 sm:gap-5 hover:translate-x-1 transition ${r.rank<=3?'!bg-amber-300/15 border-amber-200/40':''} ${r.me?'ring-2 ring-leaf':''}`}>
<div className="w-10 text-center text-2xl font-bold">{medal[r.rank-1]||`#${r.rank}`}</div>
<div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-300 to-sky-400 text-forest font-bold grid place-items-center">{r.n[0]}</div>
<div className="flex-1 min-w-0"><div className="font-semibold truncate">{r.n}{r.me&&' (You)'}</div><div className="text-xs text-white/60">{r.q} quizzes completed</div></div>
<div className="text-right"><div className="font-bold">{r.p.toLocaleString()}</div><div className="text-xs text-white/60">Eco Points</div></div></div>)}</div></div>}
export function Progress(){const {s}=useApp();const L=levelInfo(s.points),h=s.history;
const avg=h.length?Math.round(h.reduce((a,r)=>a+r.pct,0)/h.length):0,best=h.length?Math.max(...h.map(r=>r.pct)):0;
const T=[['Total Quizzes',h.length,''],['Average Score',avg,'%'],['Best Score',best,'%'],['Eco Points',s.points,''],['Current Level',L.n,''],['Quiz Streak',s.streak,' days']];
return <div><Head title="My Progress" sub="Track your learning journey."/>
<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">{T.map(([l,v,u])=><div key={l} className="glass !rounded-2xl p-5"><div className="text-3xl font-bold"><Count to={v} suffix={u}/></div><div className="text-sm text-white/65">{l}</div></div>)}</div>
<div className="glass p-6 mb-6"><div className="flex justify-between mb-3"><b>🌱 Level {L.n} – {L.name}</b><span className="text-mint">{L.pct}%</span></div><Bar pct={L.pct}/>
<p className="text-sm text-white/60 mt-2">{L.next?`${L.next} more points to the next level`:'Max level reached!'}</p></div>
<div className="grid lg:grid-cols-2 gap-6"><div className="glass p-6"><h3 className="font-semibold mb-4">Topic-wise performance</h3><div className="space-y-4">{CATS.map(c=>{const a=avgBy(h,c.id);return <div key={c.id}><div className="flex justify-between text-sm mb-1"><span>{c.icon} {c.name}</span><span>{a===null?'—':a+'%'}</span></div><Bar pct={a||0}/></div>})}</div></div>
<div className="glass p-6"><h3 className="font-semibold mb-4">Recent quiz scores</h3>{h.length===0?<p className="text-white/60">Take a quiz to see your scores here.</p>:
<div className="flex items-end gap-2 h-48">{h.slice(-8).map((r,i)=><div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1"><span className="text-xs">{r.pct}%</span><div className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 to-mint transition-all duration-700" style={{height:`${r.pct*.75}%`}}/><span className="text-lg">{CATS.find(c=>c.id===r.cat)?.icon}</span></div>)}</div>}</div></div></div>}
export function Challenges(){const {s,completeChallenge}=useApp();const d=s.done[day()]||[];const today=CHALLENGES[new Date().getDate()%CHALLENGES.length];
const Card=(c,big)=>{const ok=d.includes(c.id);return <div key={c.id} className={`glass p-5 ${big?'sm:p-8 !bg-emerald-400/15':''} ${ok?'opacity-80':''}`}>
<div className="flex items-center gap-4"><div className="text-4xl">{c.icon}</div><div className="flex-1"><div className={`font-semibold ${big?'text-xl':''}`}>{c.t}</div><div className="text-sm text-mint">+50 Eco Points</div></div></div>
<button disabled={ok} onClick={()=>completeChallenge(c.id)} className={`${ok?'btn-g':'btn-p'} w-full mt-4`}>{ok?<><Check size={18}/>Completed</>:'I Completed It'}</button></div>};
return <div><Head title="🌱 DAILY ECO CHALLENGE" sub={`${d.length} of ${CHALLENGES.length} completed today. Challenges reset daily.`}/>
<div className="mb-6"><p className="text-sm text-white/60 mb-2">Today’s featured challenge</p>{Card(today,true)}</div>
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{CHALLENGES.filter(c=>c.id!==today.id).map(c=>Card(c))}</div></div>}
export function Impact(){const {s}=useApp();const k=s.points/1240;const v=[['♻️','Waste Avoided',Math.round(24*k),' kg',60,'#a3e635'],['💧','Water Saved',Math.round(1250*k),' L',75,'#38bdf8'],['⚡','Energy Saved',Math.round(48*k),' kWh',45,'#fbbf24'],['🌳','Trees Equivalent',Math.round(12*k),'',30,'#34d399']];
return <div><Head title="YOUR ECO IMPACT 🌎" sub="Illustrative estimates only: mock frontend values scaled from your Eco Points, not real measurements."/>
<div className="grid sm:grid-cols-2 gap-5">{v.map(([i,l,n,u,p,c])=><div key={l} className="glass p-6 flex items-center gap-5 hover:-translate-y-1 transition duration-300">
<Ring pct={p} size={110} stroke={10} color={c}><span className="text-3xl">{i}</span></Ring><div><div className="text-3xl font-extrabold"><Count to={n} suffix={u}/></div><div className="text-white/70">{l}</div></div></div>)}</div></div>}
