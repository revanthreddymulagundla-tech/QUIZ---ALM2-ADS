import {Navigate,useNavigate} from 'react-router-dom';import {useApp} from '../store.jsx';import {CATS} from '../data.js';import {Ring} from '../components/ui.jsx';
export default function Result(){const {s}=useApp();const nav=useNavigate();const r=s.lastResult;
if(!r)return <Navigate to="/quizzes" replace/>;
const cat=CATS.find(c=>c.id===r.cat),lab=r.pct>=90?'Outstanding!':r.pct>=70?'Excellent!':r.pct>=50?'Good effort!':'Keep learning!';
const Stat=([l,v])=><div key={l} className="bg-black/20 rounded-2xl p-4"><div className="text-2xl font-bold">{v}</div><div className="text-xs text-white/60">{l}</div></div>;
return <div className="max-w-2xl mx-auto glass p-8 sm:p-12 text-center animate-pop">
<div className="text-5xl animate-float">🎉</div><h1 className="h1 text-3xl mt-2">QUIZ COMPLETED!</h1><p className="text-white/60 mt-1">{cat?.icon} {cat?.name}</p>
<div className="flex justify-center my-7"><Ring pct={r.pct} size={190} stroke={16} color={r.pct>=70?'#34d399':r.pct>=50?'#fbbf24':'#fb7185'}><div className="text-4xl font-extrabold">{r.pct}%</div><div className="text-mint">{lab}</div></Ring></div>
<div className="grid grid-cols-2 sm:grid-cols-5 gap-3">{[['Correct',r.correct],['Incorrect',r.total-r.correct],['Total',r.total],['Time',`${Math.floor(r.secs/60)}m ${r.secs%60}s`],['Eco Points',`+${r.pts}`]].map(Stat)}</div>
<p className="mt-7 text-white/85">Great work! Every new piece of knowledge is another step toward a greener planet.</p>
<div className="grid sm:grid-cols-2 gap-3 mt-8"><button onClick={()=>nav(`/quiz/${r.cat}`)} className="btn-p">Try Again</button><button onClick={()=>nav('/quizzes')} className="btn-g">Explore Another Quiz</button>
<button onClick={()=>nav('/leaderboard')} className="btn-g">View Leaderboard</button><button onClick={()=>nav('/home')} className="btn-g">Back to Dashboard</button></div></div>}
