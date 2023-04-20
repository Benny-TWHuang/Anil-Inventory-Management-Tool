import './Adapter.css';
import ButtonImage from "../button_img/ButtonImage.js";

export default function Adapter() {
  return (
    <div className="App">
      <header className="App-title">Ethernet Network Adapter</header>
      <div className="App-header">
        <ButtonImage img_path="./menu_img/nic.png" site="/adapter/800" name="800 Series" />
        <ButtonImage img_path="./menu_img/nic.png" site="/adapter/700" name="700 Series" />
        <ButtonImage img_path="./menu_img/nic.png" site="/adapter/600" name="600 Series" />
        <ButtonImage img_path="./menu_img/nic.png" site="/adapter/500" name="500 Series" />
        <ButtonImage img_path="./menu_img/nic.png" site="/adapter/300" name="300 Series" />
        <ButtonImage img_path="./menu_img/nic.png" site="/adapter/200" name="200 Series" />
        <ButtonImage img_path="./menu_img/nic.png" site="/adapter/legacy" name="Legacy/Interpose/VMC/External" />
      </div>
    </div>
  );
  
}
