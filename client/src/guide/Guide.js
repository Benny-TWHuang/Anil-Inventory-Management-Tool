import './Guide.css';
import ButtonImage from "../button_img/ButtonImage.js";

export default function Guide() {
  return (
    <div className="App">
      <header className="guide-title">ANIL Inventory Management Tool User Guide</header>
      <div className="guide-content">
        <div className = "guide-table">
          <table className="table table-light table-striped table-hover">
            <thead>
                <tr>
                  <th> </th>
                  <th>Super User Group</th>
                  <th>General User Group</th>
                  <th>Read Only User Group</th>
                </tr>
            </thead>
            <tbody>              
              <tr>
                  <td>Add/Delete data</td>
                  <td>v</td>
                  <td>x</td>
                  <td>x</td>
              </tr>
              <tr>
                  <td>Status update</td>
                  <td>v</td>
                  <td>x</td>
                  <td>x</td>
              </tr>
              <tr>
                  <td>Information/Note update</td>
                  <td>v</td>
                  <td>v</td>
                  <td>x</td>
              </tr>
              <tr>
                  <td>User list</td>
                  <td>23F owner - Yu-chen <br></br> 18F owner - Tera</td>
                  <td>NCNG FNIC Taiwan</td>
                  <td>Others</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="guide-content">        
        <ButtonImage img_path="./menu_img/borrow.png" site="/borrow" name="Borrow Rules" />
        <ButtonImage img_path="./menu_img/return.png" site="/return" name="Return Rules" />
        <ButtonImage img_path="./menu_img/tutorial.png" site="/tutorial" name="How to update information/notes" />
        <ButtonImage img_path="./menu_img/start.png" site="/menu" name="Start" />
      </div>
    </div>
  );
  
}
