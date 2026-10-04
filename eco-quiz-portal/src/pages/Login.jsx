import {useState} from 'react';import {Navigate,useNavigate} from 'react-router-dom';
import {Eye,EyeOff,Mail,Lock,User,Leaf} from 'lucide-react';import {Bg} from '../components/ui.jsx';import {useApp} from '../store.jsx';
export default function Login(){
const {s,login}=useApp();const nav=useNavigate();const [show,setShow]=useState(false);const [reg,setReg]=useState(false);
const [f,setF]=useState({u:'',p:'',n:''});const [msg,setMsg]=useState('');
if(s.auth)return <Navigate to="/home" replace/>;
const go=e=>{e.preventDefault();if(!f.u||!f.p)return setMsg('Enter your email and password, or use the demo login.');login(reg?f.n||f.u.split('@')[0]:f.u.split('@')[0]);nav('/home')};
return <div className="min-h-screen grid place-items-center p-4 relative"><Bg strong/>
<div className="absolute inset-0 -z-10 bg-black/30"/>
<div className="glass w-full max-w-md p-8 sm:p-10 animate-pop">
<div className="text-center mb-7"><div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-400/20 border border-emerald-300/30 grid place-items-center mb-4 animate-float"><Leaf className="text-mint" size={32}/></div>
<h1 className="h1 text-3xl leading-tight">🌱 ECO-AWARENESS<br/>QUIZ PORTAL</h1><p className="text-mint/90 mt-2">Learn. Challenge. Protect the Planet.</p></div>
<form onSubmit={go} className="space-y-4">
{reg&&<label className="relative block"><User className="absolute left-4 top-3.5 text-white/50" size={18}/><input className="inp pl-11" placeholder="Full name" value={f.n} onChange={e=>setF({...f,n:e.target.value})}/></label>}
<label className="relative block"><Mail className="absolute left-4 top-3.5 text-white/50" size={18}/><input className="inp pl-11" placeholder="Username / Email" value={f.u} onChange={e=>setF({...f,u:e.target.value})}/></label>
<label className="relative block"><Lock className="absolute left-4 top-3.5 text-white/50" size={18}/><input className="inp pl-11 pr-12" type={show?'text':'password'} placeholder="Password" value={f.p} onChange={e=>setF({...f,p:e.target.value})}/>
<button type="button" aria-label="Toggle password" onClick={()=>setShow(!show)} className="absolute right-4 top-3.5 text-white/60">{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></label>
<div className="flex justify-between text-sm"><label className="flex gap-2 items-center"><input type="checkbox" className="accent-emerald-400" defaultChecked/>Remember me</label>
<button type="button" onClick={()=>setMsg('Demo mode: password reset is not available without a backend.')} className="text-mint hover:underline">Forgot Password?</button></div>
{msg&&<p className="text-sm text-amber-200 bg-amber-400/10 rounded-xl px-3 py-2">{msg}</p>}
<button className="btn-p w-full">{reg?'Create Account':'Login'}</button>
<button type="button" onClick={()=>{login('Revanth',true);nav('/home')}} className="btn-g w-full">🚀 Try Demo Login</button></form>
<p className="text-center text-sm text-white/70 mt-6">{reg?'Already have an account?':'New to Eco-Awareness?'} <button onClick={()=>{setReg(!reg);setMsg('')}} className="text-mint font-semibold hover:underline">{reg?'Login':'Create Account'}</button></p></div></div>}
