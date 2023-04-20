import './Navigatebar.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigatebar() {
  return (
    <div className="nav-bar">
      <Navbar bg="light" variant="light" expand="sm">
        <Navbar.Brand href="/menu">AIMT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/menu">Menu</Nav.Link>
            <NavDropdown title="Network Adapter" id="basic-nav-dropdown">
              <NavDropdown.Item href="/adapter/800">800</NavDropdown.Item>
              <NavDropdown.Item href="/adapter/700">700</NavDropdown.Item>
              <NavDropdown.Item href="/adapter/600">600</NavDropdown.Item>
              <NavDropdown.Item href="/adapter/500">500</NavDropdown.Item>
              <NavDropdown.Item href="/adapter/300">300</NavDropdown.Item>
              <NavDropdown.Item href="/adapter/200">200</NavDropdown.Item>
              <NavDropdown.Item href="/adapter/Legacy">Legacy/Interpose/VMC/External</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/adapter">All List</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Module & Cable" id="basic-nav-dropdown">
              <NavDropdown.Item href="/module/module">Module</NavDropdown.Item>
              <NavDropdown.Item href="/module/AOC">AOC</NavDropdown.Item>
              <NavDropdown.Item href="/module/DAC">DAC</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/module">All List</NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link href="/tools">Tools</Nav.Link>
            <Nav.Link href="/account">Account</Nav.Link>
            <NavDropdown title="User Guide" id="basic-nav-dropdown">
              <NavDropdown.Item href="/borrow">Borrow Rules</NavDropdown.Item>
              <NavDropdown.Item href="/return">Return Rules</NavDropdown.Item>
              <NavDropdown.Item href="/tutorial">How to update information/notes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/guide">All List</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/info">Info</Nav.Link>
            <Nav.Link href="/" onClick={() => localStorage.removeItem('ticket')}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    
  );
}

export default Navigatebar;