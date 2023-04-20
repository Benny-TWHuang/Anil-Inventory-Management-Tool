import './Module.css';
import ButtonImage from "../button_img/ButtonImage.js";

export default function Module() {
  return (
    <div className="App">
      <header className="App-title">Module & Cable</header>
      <div className="App-header">
        <ButtonImage img_path="./menu_img/module.png" site="/module/module" name="Module" />
        <ButtonImage img_path="./menu_img/module.png" site="/module/AOC" name="AOC" />
        <ButtonImage img_path="./menu_img/module.png" site="/module/DAC" name="DAC" />
      </div>
    </div>
  );
  
}
