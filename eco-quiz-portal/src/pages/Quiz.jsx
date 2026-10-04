import {useEffect,useState} from 'react';import {Navigate,useNavigate,useParams} from 'react-router-dom';
import {Clock,CheckCircle2,XCircle,ChevronLeft,ChevronRight} from 'lucide-react';
import {CATS,Q} from '../data.js';import {useApp} from '../store.jsx';import {Bar} from '../components/ui.jsx';
export default function Quiz(){
const {id}=useParams();const nav=useNavigate();const {finishQuiz}=useApp();const cat=CATS.find(c=>c.id===id);const qs=Q[id]||[];const key=`eco-quiz-${id}`;
const [st,setSt]=useState(()=>{try{return JSON.parse(localStorage.getItem(key))||{i:0,ans:{},t:0}}catch{return{i:0,ans:{},t:0}}});
useEffect(()=>{const h=setInterval(()=>setSt(x=>({...x,t:x.t+1})),1000);return()=>clearInterval(h)},[]);
useEffect(()=>{localStorage.setItem(key,JSON.stringify(st))},[st,key]);
if(!cat)return <Navigate to="/quizzes" replace/>;
const {i,ans,t}=st,q=qs[i],sel=ans[i],done=sel!==undefined,all=Object.keys(ans).length===qs.length;
const pick=k=>!done&&setSt({...st,ans:{...ans,[i]:k}});
const go=d=>setSt({...st,i:i+d});
const submit=()=>{const c=qs.filter((x,k)=>ans[k]===x[2]).length;localStorage.removeItem(key);finishQuiz(id,c,qs.length,t);nav('/result')};
const mm=`${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;
return <div className="max-w-3xl mx-auto">
<div className="glass p-5 mb-5"><div className="flex items-center justify-between mb-3"><div className="font-semibold">{cat.icon} {cat.name}</div>
<div className="flex items-center gap-2 bg-black/25 rounded-full px-4 py-1.5 tabular-nums"><Clock size={16} className="text-mint"/>{mm}</div></div>
<div className="flex justify-between text-sm text-white/70 mb-2"><span>Question {i+1} of {qs.length}</span><span>{Object.keys(ans).length} answered</span></div>
<Bar pct={Object.keys(ans).length/qs.length*100}/></div>
<div key={i} className="glass p-6 sm:p-9 animate-pop">
<h2 className="font-display text-2xl sm:text-3xl font-bold leading-snug">{q[0]}</h2>
<div className="grid gap-3 mt-7">{q[1].map((o,k)=>{const right=k===q[2],mine=k===sel;
const cls=!done?'bg-white/10 border-white/15 hover:bg-white/20 hover:border-leaf hover:translate-x-1':right?'bg-emerald-500/30 border-emerald-300':mine?'bg-rose-500/30 border-rose-300':'bg-white/5 border-white/10 opacity-60';
return <button key={k} onClick={()=>pick(k)} className={`flex items-center gap-4 text-left rounded-2xl border px-5 py-4 transition-all duration-300 ${cls}`}>
<span className="w-9 h-9 shrink-0 rounded-full bg-black/25 grid place-items-center font-semibold">{'ABCD'[k]}</span><span className="flex-1">{o}</span>
{done&&right&&<CheckCircle2 className="text-emerald-300"/>}{done&&mine&&!right&&<XCircle className="text-rose-300"/>}</button>})}</div>
{done&&<div className="mt-6 rounded-2xl bg-sky-400/10 border border-sky-300/30 p-4 animate-pop"><b className={sel===q[2]?'text-emerald-300':'text-rose-300'}>{sel===q[2]?'Correct! +20 pts':'Not quite.'}</b><p className="text-white/85 mt-1 text-sm">💡 {q[3]}</p></div>}</div>
<div className="flex justify-between gap-3 mt-5"><button disabled={i===0} onClick={()=>go(-1)} className="btn-g disabled:opacity-30"><ChevronLeft size={18}/>Previous</button>
{i<qs.length-1?<button disabled={!done} onClick={()=>go(1)} className="btn-p disabled:opacity-40">Next<ChevronRight size={18}/></button>
:<button disabled={!all} onClick={submit} className="btn-p disabled:opacity-40">Submit Quiz</button>}</div></div>}
