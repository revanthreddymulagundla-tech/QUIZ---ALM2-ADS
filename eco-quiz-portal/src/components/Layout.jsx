import {useState} from 'react';
import {NavLink,Outlet,useLocation,useNavigate} from 'react-router-dom';
import {Home,Brain,BookOpen,Trophy,BarChart3,Sprout,Globe2,User,Settings,LogOut,Menu,X} from 'lucide-react';
import {Bg} from './ui.jsx';import {useApp,levelInfo} from '../store.jsx';
const NAV=[['/home','Home',Home],['/quizzes','Quizzes',Brain],['/learn','Learn',BookOpen],['/leaderboard','Leaderboard',Trophy],['/progress','My Progress',BarChart3],['/challenges','Daily Challenge',Sprout],['/impact','Eco Impact',Globe2]];
export default function Layout(){
const [open,setOpen]=useState(false);const {s,logout}=useApp();const nav=useNavigate();const loc=useLocation();const L=levelInfo(s.points);
const link=([to,label,I])=><NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isActive?'bg-emerald-400/20 text-mint shadow-inner border border-emerald-300/30':'text-white/75 hover:bg-white/10 hover:translate-x-1 border border-transparent'}`}><I size={20}/>{label}</NavLink>;
const side=<div className="flex flex-col h-full p-5">
<div className="flex items-center gap-2 text-2xl h1 mb-6 px-2">🌱 EcoAware</div>
<button onClick={()=>{nav('/profile');setOpen(false)}} className="glass !rounded-2xl p-3 mb-5 flex items-center gap-3 text-left hover:bg-white/15 transition">
<div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-300 to-sky-400 grid place-items-center text-forest font-bold">{s.name[0]}</div>
<div className="min-w-0"><div className="font-semibold truncate">{s.name}</div><div className="text-xs text-mint">Lv {L.n} · {s.points.toLocaleString()} pts</div></div></button>
<nav className="flex-1 space-y-1 overflow-y-auto">{NAV.map(link)}{link(['/profile','Profile',User])}</nav>
<div className="pt-4 mt-4 border-t border-white/10 space-y-1">{link(['/settings','Settings',Settings])}
<button onClick={()=>{logout();nav('/login')}} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white/75 hover:bg-rose-500/20 transition"><LogOut size={20}/>Logout</button></div></div>;
return <div className="min-h-screen"><Bg/>
<aside className="hidden lg:block fixed inset-y-0 left-0 w-72 bg-black/25 backdrop-blur-xl border-r border-white/10 z-30">{side}</aside>
<header className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-black/30 backdrop-blur-xl border-b border-white/10">
<span className="h1 text-xl">🌱 EcoAware</span><button aria-label="Menu" onClick={()=>setOpen(!open)} className="p-2 rounded-xl bg-white/10">{open?<X/>:<Menu/>}</button></header>
{open&&<div className="lg:hidden fixed inset-0 z-40"><div className="absolute inset-0 bg-black/60" onClick={()=>setOpen(false)}/><aside className="absolute left-0 inset-y-0 w-72 max-w-[85%] bg-forest animate-pop">{side}</aside></div>}
<main className="lg:ml-72 px-4 sm:px-8 py-8 max-w-6xl mx-auto"><div key={loc.pathname} className="animate-fadeUp"><Outlet/></div></main></div>}
