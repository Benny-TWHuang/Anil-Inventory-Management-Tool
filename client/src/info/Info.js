import './Info.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

export default function Info() {
  return (
    <div className="App">
    <div className="bread">
      <Breadcrumb>
        <Breadcrumb.Item href="/menu ">Menu</Breadcrumb.Item>
        <Breadcrumb.Item active>Information</Breadcrumb.Item>
      </Breadcrumb>
    </div>
      <header className="App-title">Information</header>
      <div className="outer">
        <div className="info-inner rounded">
          <h3>ANIL Inventory Management Tool</h3>
          <h6>-----------------------------------------------------------------------------------------------------</h6>
          <h4>NCNG FNIC Taiwan</h4>
          <h6>-----------------------------------------------------------------------------------------------------</h6>
          <h6>Database Maintainer: Tera Chen, Yu-chen Hung</h6>
          <h6>Mail: terax.chen@intel.com, yu-chenx.hung@intel.com</h6>
          <h6>WWID: 12165518, 12024815</h6>
          <br></br>
          <h6>ANIL Lab Owner: Michael Li</h6>
          <h6>Mail: chien-cheng.li@intel.com</h6>
          <h6>WWID: 11841229</h6>
          <br></br>
          <h6>Web Developer: Benny Huang</h6>
          <h6>Mail: benny.huang@intel.com</h6>
          <h6>WWID: 12144273</h6>
          <br></br>
          <h6>Manager: Josh</h6>
          <h6>Mail: josh.tsai@intel.com</h6>
          <h6>WWID: 11339643</h6>

        </div>
      </div>
    </div>
  );
  
}
