import {useState} from 'react';import {Link,useNavigate} from 'react-router-dom';
import {Play,Compass,BarChart3,Clock,HelpCircle,ChevronDown} from 'lucide-react';
import {CATS,TOPICS} from '../data.js';import {useApp} from '../store.jsx';import {Head} from '../components/ui.jsx';
const STATS=[['🌍','Global Impact','8 Gt CO₂ avoidable by 2030'],['♻️','Recycling','Cuts waste & energy use'],['🌱','Sustainability','Habits that last'],['💧','Water Conservation','Every drop counts'],['⚡','Renewable Energy','Clean power growing fast'],['🌳','Climate Action','Forests store carbon']];
export function Home(){const nav=useNavigate();const {s}=useApp();
return <div>
<section className="glass p-8 sm:p-14 mb-8 relative overflow-hidden">
<div className="absolute -right-10 -top-10 text-[12rem] opacity-10 animate-float select-none">🌍</div>
<p className="text-mint mb-2">Welcome back, {s.name}</p>
<h1 className="h1 text-4xl sm:text-6xl max-w-2xl leading-[1.05]">Make Your Knowledge Greener 🌱</h1>
<p className="text-white/75 text-lg mt-4 max-w-xl">Test your knowledge. Discover sustainable habits. Make a difference.</p>
<div className="flex flex-wrap gap-3 mt-8"><button onClick={()=>nav('/quizzes')} className="btn-p text-lg px-8 py-4"><Play size={20}/>START QUIZ</button>
<button onClick={()=>nav('/quizzes')} className="btn-g"><Compass size={18}/>Explore Topics</button><button onClick={()=>nav('/progress')} className="btn-g"><BarChart3 size={18}/>My Progress</button></div></section>
<div className="grid grid-cols-2 lg:grid-cols-3 gap-4">{STATS.map(([i,t,d])=>
<div key={t} className="glass !rounded-3xl p-5 hover:-translate-y-1 hover:bg-white/15 transition duration-300"><div className="text-4xl mb-3">{i}</div><div className="font-semibold">{t}</div><div className="text-sm text-white/65">{d}</div></div>)}</div></div>}
export function Quizzes(){const nav=useNavigate();const {s}=useApp();
const col={Easy:'text-lime-300 bg-lime-400/15',Medium:'text-amber-300 bg-amber-400/15',Hard:'text-rose-300 bg-rose-400/15'};
return <div><Head title="Quiz Categories" sub="Pick a topic and earn Eco Points: +20 per correct answer and +100 per completed quiz."/>
<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{CATS.map(c=>{const n=s.history.filter(h=>h.cat===c.id).length;return(
<article key={c.id} className="group glass overflow-hidden hover:-translate-y-1.5 transition duration-300">
<div className={`h-32 bg-gradient-to-br ${c.g} relative grid place-items-center overflow-hidden`}><span className="text-7xl group-hover:scale-125 group-hover:rotate-6 transition duration-500">{c.icon}</span>
<svg className="absolute bottom-0 w-full h-10 opacity-40" viewBox="0 0 300 40" preserveAspectRatio="none"><path d="M0 40V25Q40 5 80 22T160 18T240 24T300 12V40Z" fill="#052018"/></svg></div>
<div className="p-5"><h3 className="font-display font-bold text-xl">{c.name}</h3><p className="text-sm text-white/70 mt-1 min-h-[2.5rem]">{c.desc}</p>
<div className="flex items-center gap-2 mt-3 text-xs"><span className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1"><HelpCircle size={13}/>{Q_LEN} questions</span><span className={`rounded-full px-3 py-1 ${col[c.diff]}`}>{c.diff}</span>{n>0&&<span className="ml-auto text-mint">{n}× done</span>}</div>
<button onClick={()=>nav(`/quiz/${c.id}`)} className="btn-p w-full mt-4">Start Quiz</button></div></article>)})}</div></div>}
const Q_LEN=4;
export function Learn(){const {s,readArticle}=useApp();const [open,setOpen]=useState(null);
return <div><Head title="Eco Knowledge" sub="Read an article to earn +25 Eco Points (once per topic)."/>
<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{TOPICS.map(t=>{const o=open===t.id,rd=s.read.includes(t.id);return(
<article key={t.id} className="glass overflow-hidden flex flex-col">
<div className={`h-36 bg-gradient-to-br ${t.g} grid place-items-center text-7xl relative`}>{t.icon}{rd&&<span className="absolute top-3 right-3 text-xs bg-black/40 rounded-full px-3 py-1">✓ Read</span>}</div>
<div className="p-5 flex-1 flex flex-col"><h3 className="font-display font-bold text-xl">{t.name}</h3><p className="text-white/70 text-sm mt-1">{t.short}</p>
<ul className="mt-3 space-y-1.5 text-sm">{t.facts.map(f=><li key={f} className="flex gap-2"><span className="text-leaf">●</span>{f}</li>)}</ul>
{o&&<p className="mt-4 text-sm text-white/85 bg-black/20 rounded-2xl p-4 animate-pop">{t.body}</p>}
<button onClick={()=>{setOpen(o?null:t.id);if(!o)readArticle(t.id)}} className="btn-g mt-auto self-start mt-4">{o?'Show Less':'Learn More'}<ChevronDown size={16} className={o?'rotate-180':''}/></button></div></article>)})}</div>
<Link to="/quizzes" className="btn-p mt-8">Test what you learned</Link></div>}
