import './Tutorial.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function Tutorial(props) {
  let p1 = require("./Picture1.png");
  let p2 = require("./Picture2.png");
  let p3 = require("./Picture3.png");
  let p4 = require("./Picture4.png");
  let p5 = require("./Picture5.png");
  let p6 = require("./Picture6.png");
  let p7 = require("./Picture7.png");
  let p8 = require("./Picture8.png");
  let p9 = require("./Picture9.png");

  let navigate = useNavigate(); 
  return (
    <div className="App">
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item href="/menu ">Menu</Breadcrumb.Item>
          <Breadcrumb.Item href="/guide ">User Guide</Breadcrumb.Item>
          <Breadcrumb.Item active>How to update information/notes</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <header className="tu-title1"> ANIL Inventory Management Tool </header>
      <header className="tu-title2"> How to update information/notes </header>
      <div className="tu-content">
        <div className="outer">
          <Button onClick={()=>{navigate("/");}} variant="primary tu-btn">Back</Button>
        </div>
        <div className="outer" style={{width: '50%', float:'left'}}>
          <div className="in-text"><h4>·&nbsp;&nbsp;&nbsp;&nbsp;Update notes</h4></div>
          <div className="in-text"><h6>Step1 - Find out the device and click it</h6></div>
          <img src={p1} className="tu_image" alt="n1" />
          <div className="in-text"><h6>Step2 - Copy UID</h6></div>
          <img src={p2} className="tu_image" alt="n2" />
          <div className="in-text"><h6>Step3 - Click "Update Note"</h6></div>
          <img src={p3} className="tu_image" alt="n3" />
          <div className="in-text"><h6>Step4 - Paste UID and fill out the comment in "Note", and then click "Save Changes"</h6></div>
          <img src={p4} className="tu_image" alt="n4" />
          <div className="in-text"><h6>Step5 - The item will be updated successfully.</h6></div>
          <img src={p5} className="tu_image" alt="n5" />
        </div>
        <div className="outer" style={{width: '50%', float:'right'}}>
          <div className="in-text"><h4>·&nbsp;&nbsp;&nbsp;&nbsp;Update information</h4></div>
          <div className="in-text"><h6>Step1 - Find out the device and click it</h6></div>
          <img src={p6} className="tu_image" alt="n6" />
          <div className="in-text"><h6>Step2 - Click "Modify Device info"</h6></div>
          <img src={p7} className="tu_image" alt="n7" />
          <div className="in-text"><h6>Step3 - Fill new product name and family, nd then click "Save Changes"</h6></div>
          <img src={p8} className="tu_image" alt="n8" />
          <div className="in-text"><h6>Step4 - The item will be updated successfully.</h6></div>
          <img src={p9} className="tu_image" alt="n9" />
        </div>
      </div>
    </div>
  );
  
}