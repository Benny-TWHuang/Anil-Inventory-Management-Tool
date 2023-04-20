import './Account.css';
import jwt from 'jwt-decode';

export default function Account() {
  let a;
  try {
    const code = localStorage.getItem('ticket');
    a = jwt(code);
  } catch (error) {
    localStorage.removeItem('ticket');
    return (
      <div className="App">
        <header className="App-title">My Account</header>
        <div className="outer">
          <div className="inner rounded">
            <h2>There is no data. Please login again</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-title">My Account</header>
      <div className="outer">
        <div className="acc-inner rounded">
          <h3>{a.name}</h3>
          <br></br>
          <br></br>
          <h5>IDSID: {a.ssid}</h5>
          <br></br>
          <h5>WWID: {a.id}</h5>
          <br></br>
          <h5>Team ID: {a.team}</h5>
          <br></br>
          <h5>Mail: {a.mail}</h5>
        </div>
      </div>
    </div>
  );
  
}
