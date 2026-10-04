export default {content:['./index.html','./src/**/*.{js,jsx}'],theme:{extend:{
fontFamily:{display:['Fraunces','serif'],sans:['Outfit','system-ui','sans-serif']},
colors:{forest:'#06271d',moss:'#0d4a36',leaf:'#34d399',mint:'#a7f3d0',sky2:'#7dd3fc',sand:'#e7d9b8'},
keyframes:{float:{'0%,100%':{transform:'translateY(0) rotate(0)'},'50%':{transform:'translateY(-28px) rotate(20deg)'}},
drift:{'0%':{transform:'translateY(105vh) rotate(0)'},'100%':{transform:'translateY(-10vh) rotate(360deg)'}},
fadeUp:{from:{opacity:0,transform:'translateY(14px)'},to:{opacity:1,transform:'none'}},
pop:{from:{opacity:0,transform:'scale(.96)'},to:{opacity:1,transform:'none'}}},
animation:{float:'float 8s ease-in-out infinite',drift:'drift 18s linear infinite',fadeUp:'fadeUp .5s ease both',pop:'pop .35s ease both'}}}};
