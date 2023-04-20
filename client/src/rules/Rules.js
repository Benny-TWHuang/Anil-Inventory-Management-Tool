import './Rules.css';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';

export default function Rules(props) {
  let graphImage = require(`${props.img_path}`);

  let rule_text = <></>;
  if(props.cate === "Borrow") {
    rule_text = <>
                  <h3>Borrow Cases</h3>
                  <h6>Case 1 - NICs/Modules/Cables(Return on the same day)</h6>
                  <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{">>"} No need to update in AIMT</h6>
                  <h6>Case 2 - NICs/Modules/Cables</h6>
                  <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{">>"} Update in AIMT</h6>
                  <h6>Case3 - Tools</h6>
                  <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{">>"} Update in AIMT</h6>
                  <h6>Case4 - AIMT owner is not in seat</h6>
                  <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{">>"}  IM AIMT owner first, or inform AIMT owner by mail</h6>
                </>
  } else {
    rule_text = <>
                  <h3>Return Rule</h3>
                  <h6>AIMT owner check with borrower if NIC is functional or not</h6>
                  <h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{">>"} If broken, please update in AIMT</h6>
                </>
  }
  let navigate = useNavigate(); 
  return (
    <div className="App">
      <header className="rules-title">ANIL Inventory Management Tool {props.cate} Rules</header>
      <div className="outer">
        <img src={graphImage} className="rules_image" alt={props.cate} />
        <div className="inner rounded rules_image">          
          {rule_text}
        </div>
      </div>
      <Button onClick={()=>{navigate("/");}} variant="primary rule-btn">Back</Button>
    </div>
  );
  
}

// Return Rule
// AIMT owner check with borrower if NIC is functional or not
//          >> If broken, please update in AIMT
