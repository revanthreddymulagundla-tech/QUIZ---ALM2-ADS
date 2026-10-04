import {createContext,useContext,useEffect,useState} from 'react';
export const LEVELS=[['Eco Beginner',0],['Green Learner',300],['Eco Explorer',800],['Planet Protector',1500],['Sustainability Champion',2500]];
export const levelInfo=p=>{let i=0;LEVELS.forEach((l,k)=>{if(p>=l[1])i=k});const nx=LEVELS[i+1];
return{n:i+1,name:LEVELS[i][0],pct:nx?Math.round((p-LEVELS[i][1])/(nx[1]-LEVELS[i][1])*100):100,next:nx?nx[1]-p:0}};
export const day=(o=0)=>new Date(Date.now()-o*864e5).toISOString().slice(0,10);
const blank={auth:false,name:'Revanth',points:0,streak:0,last:null,history:[],done:{},read:[],theme:'forest',lastResult:null};
const demo={...blank,auth:true,points:1240,streak:3,last:day(1),history:[
{cat:'recycling',correct:4,total:4,pct:100,secs:52,date:day(3)},{cat:'climate',correct:3,total:4,pct:75,secs:70,date:day(2)},{cat:'water',correct:3,total:4,pct:75,secs:64,date:day(1)}]};
const Ctx=createContext();export const useApp=()=>useContext(Ctx);
export function Provider({children}){
const [s,set]=useState(()=>{try{return{...blank,...JSON.parse(localStorage.getItem('eco-state'))}}catch{return blank}});
useEffect(()=>{localStorage.setItem('eco-state',JSON.stringify(s));document.body.dataset.theme=s.theme},[s]);
const up=f=>set(p=>({...p,...f(p)}));
const touch=p=>p.last===day()?p.streak:p.last===day(1)?p.streak+1:1;
const A={s,
login:(name,seed)=>set(p=>seed?{...demo,theme:p.theme}:{...p,auth:true,name:name||p.name}),
logout:()=>up(()=>({auth:false})),
reset:()=>set({...demo}),
setName:name=>up(()=>({name})),
toggleTheme:()=>up(p=>({theme:p.theme==='forest'?'light':'forest'})),
finishQuiz:(cat,correct,total,secs)=>{const pct=Math.round(correct/total*100),pts=100+20*correct;
const r={cat,correct,total,pct,secs,pts,date:day()};
up(p=>({points:p.points+pts,streak:touch(p),last:day(),history:[...p.history,r],lastResult:r}))},
completeChallenge:(id)=>up(p=>{const d=p.done[day()]||[];return d.includes(id)?{}:{points:p.points+50,streak:touch(p),last:day(),done:{...p.done,[day()]:[...d,id]}}}),
readArticle:id=>up(p=>p.read.includes(id)?{}:{points:p.points+25,read:[...p.read,id]})};
return <Ctx.Provider value={A}>{children}</Ctx.Provider>}
