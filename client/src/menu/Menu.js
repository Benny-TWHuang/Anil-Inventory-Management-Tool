import './Menu.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ButtonImage from "../button_img/ButtonImage.js";

export default function Menu() {
  return (
    <div className="App">
      {/* <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item href="/menu ">Menu</Breadcrumb.Item>
        </Breadcrumb>
      </div> */}
      <header className="App-title">ANIL Inventory Management Tool</header>
      <div className="App-header">
        <ButtonImage img_path="./menu_img/nic.png" site="/adapter" name="Ethernet Network Adapter" />
        <ButtonImage img_path="./menu_img/module.png" site="/module" name="Module & Cable" />
        <ButtonImage img_path="./menu_img/tools.png" site="/tools" name="Tools" />
        {/* <ButtonImage img_path="./menu_img/search.png" site="https://google.com" name="Searching" /> */}
        <ButtonImage img_path="./menu_img/personal.png" site="/account" name="My Account" />
        {/* <ButtonImage img_path="./menu_img/summary.png" site="https://google.com" name="Summary Table" /> */}
        <ButtonImage img_path="./menu_img/guide.png" site="/guide" name="User Guide" />
        <ButtonImage img_path="./menu_img/info.png" site="/info" name="Infomation" />
      </div>
    </div>
  );
  
}
