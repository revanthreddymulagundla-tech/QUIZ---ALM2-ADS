import {Navigate,Route,Routes} from 'react-router-dom';
import {useApp} from './store.jsx';import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';import {Home,Quizzes,Learn} from './pages/Main.jsx';import Quiz from './pages/Quiz.jsx';import Result from './pages/Result.jsx';
import {Leaderboard,Progress,Challenges,Impact} from './pages/Stats.jsx';import {Profile,Settings} from './pages/Account.jsx';
const Guard=({children})=>useApp().s.auth?children:<Navigate to="/login" replace/>;
export default function App(){return <Routes>
<Route path="/login" element={<Login/>}/>
<Route element={<Guard><Layout/></Guard>}>
<Route path="/home" element={<Home/>}/><Route path="/quizzes" element={<Quizzes/>}/><Route path="/quiz/:id" element={<Quiz/>}/><Route path="/result" element={<Result/>}/>
<Route path="/learn" element={<Learn/>}/><Route path="/leaderboard" element={<Leaderboard/>}/><Route path="/progress" element={<Progress/>}/>
<Route path="/challenges" element={<Challenges/>}/><Route path="/impact" element={<Impact/>}/><Route path="/profile" element={<Profile/>}/><Route path="/settings" element={<Settings/>}/></Route>
<Route path="*" element={<Navigate to="/home" replace/>}/></Routes>}
