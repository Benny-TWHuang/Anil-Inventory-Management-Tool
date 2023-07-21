import './App.css';
import useToken from './login/useToken';
import Menu from "./menu/Menu";
import Adapter from "./adapter/Adapter";
import Module from "./module/Module";
import Info from "./info/Info";
import Login from "./login/Login";
import Show from "./show/Show";
import Account from "./account/Account";
import Guide from "./guide/Guide";
import Rules from "./rules/Rules";
import Tutorial from "./tutorial/Tutorial";
import Sorttable from "./sorttable/Sorttable";
import Navigatebar from "./navigatebar/Navigatebar";
import { Routes, Route } from 'react-router-dom';
import jwt from 'jwt-decode';

function App() {
  const { token, setToken } = useToken();
  let mtype = "3";
  const teamID = ["11268225","11904427","11528909","11426818","11300157",
                  "12144273","12114737","11577365","11298387","11996801",
                  "12087633","11340330","11628138","11339643","11798174",
                  "11778025","12007298","11488014","11839766","11841229",
                  "11528031","10602906","10700984"];
  
  if(!token) {
    return <Login setToken={setToken} />
  } else {
    try {
      let a = jwt(token);
      if(a.name === undefined || a.name === null || a.ssid === undefined || a.ssid === null || a.id === undefined || a.id === null || a.team === undefined || a.team === null || a.mail === undefined || a.mail === null) {
        localStorage.removeItem('ticket');
        return <Login setToken={setToken} />
      } else if (a.id === "12144273" || a.id === "12165518" || a.id === "12024815") { //
        mtype = "1";
      } else if (teamID.includes(a.id) || a.team === "56107" || a.team === "34102") {
        mtype = "2";
      } else {
        mtype = "3";
      }
    } catch (error) {
      localStorage.removeItem('ticket');
      return <Login setToken={setToken} />
    }
  }

  return (
    <div className="wrapper">
      <Navigatebar />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Guide />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/adapter" element={<Adapter />} />
          <Route path="/adapter/800" element={<Show value={"ada800"} membertype={mtype}/>} />
          <Route path="/adapter/700" element={<Show value={"ada700"} membertype={mtype}/>} />
          <Route path="/adapter/600" element={<Show value={"ada600"} membertype={mtype}/>} />
          <Route path="/adapter/500" element={<Show value={"ada500"} membertype={mtype}/>} />
          <Route path="/adapter/300" element={<Show value={"ada300"} membertype={mtype}/>} />
          <Route path="/adapter/200" element={<Show value={"ada200"} membertype={mtype}/>} />
          <Route path="/adapter/legacy" element={<Show value={"legacy"} membertype={mtype}/>} />
          <Route path="/module" element={<Module />} />
          <Route path="/module/module" element={<Show value={"module"} membertype={mtype}/>} />
          <Route path="/module/AOC" element={<Show value={"AOC"} membertype={mtype}/>} />
          <Route path="/module/DAC" element={<Show value={"DAC"} membertype={mtype}/>} />
          <Route path="/tools" element={<Show value={"tools"} membertype={mtype}/>} />
          <Route path="/info" element={<Info />} />
          <Route path="/account" element={<Account />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/borrow" element={<Rules cate={"Borrow"} img_path={"./b_rule.png"}/>} />
          <Route path="/return" element={<Rules cate={"Return"} img_path={"./r_rule.png"}/>} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/test" element={<Sorttable value={"ada800"} membertype={mtype}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;