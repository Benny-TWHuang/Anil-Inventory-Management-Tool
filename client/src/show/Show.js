import './Show.css';
import React from 'react';
// import Popup from '../popup/Popup';
import { Button, Modal } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';

export default function Show(props) {
  const renderAfterCalled = useRef(false);
  const [uid, setuid] = useState();
  const [da, setDa] = useState();
  const [inda, setInda] = useState();
  const [update,setUpdate] = useState(false);
  const updateClose = () => {setUpdate(false); window.location.reload();};
  const updateShow = () => {if (props.membertype === "1") {
                              setUpdate(true);
                            } else if (props.membertype === "2") {
                              alert("You don't have the permission to add new device.")
                            } else {
                              alert("You don't have the permission to add new device.")
                            }};
  const [upsta,setUpsta] = useState(false);
  const upstaClose = () => {setUpsta(false); window.location.reload();};
  const upstaShow = () => {if (props.membertype === "1") {
                              setUpsta(true);
                            } else if (props.membertype === "2") {
                              alert("You don't have the permission to update device status.")
                            } else {
                              alert("You don't have the permission to update device status.")
                            }};
  const [upnot,setUpnot] = useState(false);
  const upnotClose = () => {setUpnot(false); window.location.reload();};
  const upnotShow = () => {if (props.membertype === "1") {
                              setUpnot(true);
                            } else if (props.membertype === "2") {
                              setUpnot(true);
                            } else {
                              alert("You don't have the permission to update device note.")
                            }};
  const [modify,setModify] = useState(false);
  const modifyClose = () => {setModify(false); window.location.reload();};
  const modifyShow = () => {if (props.membertype === "1") {
                              setButtonPop(false);
                              setModify(true);
                            } else if (props.membertype === "2") {
                              setButtonPop(false);
                              setModify(true);
                            } else {
                              alert("You don't have the permission to modify device information.")
                            }};
  const [upuid,setUpuid] = useState(false);
  const upuidClose = () => {setUpuid(false); window.location.reload();};
  const upuidShow = () => {if (props.membertype === "1") {
                              setButtonPop(false);
                              setUpuid(true);
                            } else if (props.membertype === "2") {
                              alert("You don't have the permission to modify device information.")
                            } else {
                              alert("You don't have the permission to modify device information.")
                            }};
  const [ButtonPop,setButtonPop] = useState(false);
  const handleClose = () => setButtonPop(false);
  const handleShow = (e) => {setuid(e.target.parentElement.innerText.split('\t')[1]); 
                            if(props.value.substring(0, 3) === "ada" || props.value === "legacy") {
                              setOldProductName(e.target.parentElement.innerText.split('\t')[2]); 
                              setOldFamily(e.target.parentElement.childNodes[3].innerText); 
                            } else if (props.value === "module" || props.value === "AOC" || props.value === "DAC") {
                              setOldProductName(e.target.parentElement.innerText.split('\t')[2]); 
                              setOldVendor(e.target.parentElement.innerText.split('\t')[3]); 
                              setOldFamily(e.target.parentElement.innerText.split('\t')[4]); 
                              setOldSpeed(e.target.parentElement.innerText.split('\t')[5]); 
                              setOldDistance(e.target.parentElement.innerText.split('\t')[6]); 
                              setOldWavelength(e.target.parentElement.innerText.split('\t')[7]); 
                              setOldInterface(e.target.parentElement.innerText.split('\t')[8]); 
                            }  else if(props.value === "tools") {
                              setOldProductName(e.target.parentElement.innerText.split('\t')[2]); 
                            }
                            setButtonPop(true);};
  const [person,setPerson] = useState(false);
  const [WWID,setwwid] = useState();
  const personClose = () => setPerson(false);
  const personShow = (e) => {if(e.target.parentElement.childNodes[3].innerText === "NA") {
                              setPerson(false);
                            } else {
                              setPerson(true);

                            }};
                          

  const [newUID, setNewUID] = useState();
  const [product_name, setProductName] = useState();
  const [family, setFamily] = useState();
  const [location, setLocation] = useState();
  const [status, setStatus] = useState();
  const [borrower, setBorrower] = useState();
  const [note, setNote] = useState();
  
  const [vendor, setVendor] = useState();
  const [speed, setSpeed] = useState();
  const [distance, setDistance] = useState();
  const [wavelength, setWavelength] = useState();
  const [inter, setInterface] = useState();

  const [old_product_name, setOldProductName] = useState();
  const [old_family, setOldFamily] = useState();
  const [old_vendor, setOldVendor] = useState();
  const [old_speed, setOldSpeed] = useState();
  const [old_distance, setOldDistance] = useState();
  const [old_wavelength, setOldWavelength] = useState();
  const [old_inter, setOldInterface] = useState();

  const fetchUID = async (cur_uid) => {
    return fetch('/api/uid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ask: props.value, curuid: cur_uid})
    })
      .then(response => response.json())
      .then(data => setInda(data))
  }   

  const fetchwwid = async (wwid) => {
    if(wwid === 'NA') {
      setwwid(undefined);
      return;
    }
    return fetch('/api/wwid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({wwid: wwid})
    })
      .then(response => response.json())
      .then(data => setwwid(data))
  }   

  let per_info = <></>;
  if (WWID === undefined) {
    per_info = <></>;
  } else {
    per_info = <>
                <p>Name: {WWID.name}</p>
                <p>IDSID: {WWID.ssid}</p>
                <p>WWID: {WWID.id}</p>
                <p>Mail:{WWID.mail}</p>
              </>;
  }

  const addNew = async () => {
    if(props.value.substring(0, 3) === "ada" || props.value === "legacy"){
      if(newUID === undefined || newUID === "" || product_name === undefined || product_name === "" || family === undefined || family === "" || location === undefined || location === ""  || status === undefined || status === "") {
        alert("Please fill the boxes.(not include optional boxes)")
      } else {
        return await fetch('/api/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ask: props.value,uid: newUID, product: product_name, family: family, location: location, status: status, borrower: borrower, note: note})
        })
          .then(response => response.text())
          .then(updateClose())
      }
    } else if (props.value === "module" || props.value === "AOC" || props.value === "DAC") {
      if(newUID === undefined || newUID === "" || speed === undefined || speed === "" || family === undefined || family === "" || location === undefined || location === ""  || status === undefined || status === "") {
        alert("Please fill the boxes.(not include optional boxes)")
      } else if(vendor === undefined || vendor === "" || product_name === undefined || product_name === "" || distance === undefined || distance === "" || wavelength === undefined || wavelength === ""  || inter === undefined || inter === "") {
        alert("Please fill the boxes.(not include optional boxes)")
      } else {
        return await fetch('/api/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ask: props.value,uid: newUID, model: product_name, vendor: vendor, type: family, speed: speed, distance: distance, wavelength: wavelength, inter: inter , location: location, status: status, borrower: borrower, note: note})
        })
          .then(response => response.text())
          .then(updateClose())
      }
    } else if(props.value === "tools") {
      if(newUID === undefined || newUID === "" || product_name === undefined || product_name === "" || status === undefined || status === "") {
        alert("Please fill the boxes.(not include optional boxes)")
      } else {
        return await fetch('/api/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ask: props.value,uid: newUID, item: product_name, status: status, borrower: borrower, note: note})
        })
          .then(response => response.text())
          .then(updateClose())
      }
    }
  } 

  const addStatus = async () => {
    if(newUID === undefined || newUID === "" || status === undefined || status === "" || borrower === undefined || borrower === "") {
      alert("Please fill the boxes.(not include optional boxes)")
    } else {
      return await fetch('/api/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ask: props.value, uid: newUID, status: status, borrower: borrower, note: note})
      })
        .then(response => response.text())
        .then((data) => {
                if (data === "Nonexist") {
                  alert("UID doesn't exist. Please check again.")
                } else if (data === "OK") {
                  upstaClose();
                }
              })
    }
  } 

  const addNote = async () => {
    if(newUID === undefined || newUID === "" || note === undefined || note === "") {
      alert("Please fill the boxes.")
    } else {
      return await fetch('/api/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ask: props.value, uid: newUID, note: note})
      })
        .then(response => response.text())
        .then((data) => {
                if (data === "Nonexist") {
                  alert("UID doesn't exist. Please check again.")
                } else if (data === "OK") {
                  upnotClose();
                }
              })
    }
  } 

  const addModify = async () => {
    if(props.value.substring(0, 3) === "ada" || props.value === "legacy") {
      if(product_name === undefined || product_name === "" || family === undefined || family === "") {
        alert("Please fill the boxes.")
      } else {
        return await fetch('/api/modify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ask: props.value, uid: uid, product: product_name, family: family})
        })
          .then(response => response.text())
          .then(modifyClose())
      }
    } else if (props.value === "module" || props.value === "AOC" || props.value === "DAC") {
      if(speed === undefined || speed === "" || family === undefined || family === "" || vendor === undefined || vendor === "" || product_name === undefined || product_name === "") {
        alert("Please fill the boxes.(not include optional boxes)")
      } else if(distance === undefined || distance === "" || wavelength === undefined || wavelength === ""  || inter === undefined || inter === "") {
        alert("Please fill the boxes.(not include optional boxes)")
      } else {
        return await fetch('/api/modify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ask: props.value,uid: uid, model: product_name, vendor: vendor, type: family, speed: speed, distance: distance, wavelength: wavelength, inter: inter})
        })
          .then(response => response.text())
          .then(updateClose())
      }
    } else if(props.value === "tools") {
      if(product_name === undefined || product_name === "") {
        alert("Please fill the boxes.(not include optional boxes)")
      } else {
        return await fetch('/api/modify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ask: props.value,uid: uid, item: product_name})
        })
          .then(response => response.text())
          .then(updateClose())
      }
    }
  } 

  const UIDchange = async () => {
    if(newUID === undefined || newUID === "") {
      alert("Please fill the boxes.")
    } else {
      return await fetch('/api/newuid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ask: props.value, olduid: uid, newuid: newUID})
      })
        .then(response => response.text())
        .then((data) => {
                if (data === "already") {
                  alert("New UID exists. Please check again and fill with other UID.")
                } else if (data === "no") {
                  alert("UID doesn't exist. Please check again.")
                } else if (data === "ok") {
                  upnotClose();
                }
              })
    }
  } 
  
  useEffect(
  () => {
    if (!renderAfterCalled.current) {
      fetch('/api/show', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ask: props.value})
      })
      .then(response => response.json())
      .then(data => setDa(data))
      
    }

    renderAfterCalled.current = true;
  }, [props]) 

  let showtitle = "";
  let DisplayData, keys, AddDevice, UpdateStatus, UpdateNote, ModifyInfo, UpdateUID;

  if(props.value.substring(0, 3) === "ada") {
    showtitle = "Series "+props.value.substring(3);
  } else if (props.value === "legacy") {
    showtitle = "Legacy/Interpose/VMC/External";
  } else {
    showtitle = props.value.charAt(0).toUpperCase() + props.value.slice(1);
  }

  UpdateStatus =  <>
                    <div className="add-wrapper">
                      <form onSubmit={addStatus}>
                        <label>
                          <p className="text" htmlFor="UID">UID</p>
                          <input type="text" onChange={e => setNewUID(e.target.value)} id="uid"/>
                        </label>
                        <label>
                          <p className="text" htmlFor="Status">Status</p>
                          <input type="text" onChange={e => setStatus(e.target.value)} id="status"/>
                        </label>
                        <label>
                          <p className="text" htmlFor="Borrower">Borrower</p>
                          <input type="text" onChange={e => setBorrower(e.target.value)} id="borrower"/>
                        </label>
                        <label>
                          <p className="text" htmlFor="Note">Note(optional)</p>
                          <input type="text" onChange={e => setNote(e.target.value)} id="note"/>
                        </label>
                      </form>
                    </div>
                  </>

  UpdateNote =  <>
                  <div className="add-wrapper">
                    <form onSubmit={addNote}>
                      <label>
                        <p className="text" htmlFor="UID">UID</p>
                        <input type="text" onChange={e => setNewUID(e.target.value)} id="uid"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Note">Note</p>
                        <input type="text" onChange={e => setNote(e.target.value)} id="note"/>
                      </label>
                    </form>
                  </div>
                </>

  UpdateUID = <>
                  <div className="add-wrapper" style={{width: '50%', float:'left'}}>
                    <p className="text" >Old UID:</p>
                    <p className="text">{uid}</p>
                  </div>
                  <div className="add-wrapper" style={{width: '50%', float:'right'}}>
                    <form onSubmit={UIDchange}>
                      <label>
                        <p className="text" htmlFor="New UID">New UID:</p>
                        <input type="text" onChange={e => setNewUID(e.target.value)} id="new_uid"/>
                      </label>
                    </form>
                  </div>
                </>

  if(props.value.substring(0, 3) === "ada" || props.value === "legacy"){
    AddDevice = <>
                  <div className="add-wrapper">
                    <form onSubmit={addNew}>
                      <label>
                        <p className="text" htmlFor="UID">UID</p>
                        <input type="text" onChange={e => setNewUID(e.target.value)} id="uid"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Product Name">Product Name</p>
                        <input type="text" onChange={e => setProductName(e.target.value)} id="product_name"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Family">Family</p>
                        <input type="text" onChange={e => setFamily(e.target.value)} id="family"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Location">Location</p>
                        <input type="text" onChange={e => setLocation(e.target.value)} id="location"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Status">Status</p>
                        <input type="text" onChange={e => setStatus(e.target.value)} id="status"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Borrower">Borrower(optional)</p>
                        <input type="text" onChange={e => setBorrower(e.target.value)} id="borrower"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Note">Note(optional)</p>
                        <input type="text" onChange={e => setNote(e.target.value)} id="note"/>
                      </label>
                    </form>
                  </div>
                </>
    ModifyInfo = <>
                    <div className="add-wrapper" style={{width: '50%', float:'left'}}>
                      <p className="text" >Old Product Name:</p>
                      <p className="text">{old_product_name}</p>
                      <br></br>
                      <p className="text" >Old Family:</p>
                      <p className="text" >{old_family}</p>
                    </div>
                    <div className="add-wrapper" style={{width: '50%', float:'right'}}>
                      <form onSubmit={addModify}>
                        <label>
                          <p className="text" htmlFor="Product Name">New Product Name:</p>
                          <input type="text" onChange={e => setProductName(e.target.value)} id="product_name"/>
                        </label>
                        <label>
                          <p className="text" htmlFor="Family">New Family:</p>
                          <input type="text" onChange={e => setFamily(e.target.value)} id="family"/>
                        </label>
                      </form>
                    </div>
                  </>
  } else if(props.value === "module" || props.value === "AOC" || props.value === "DAC"){
    AddDevice = <>
                  <div className="add-wrapper">
                    <form onSubmit={addNew}>
                      <label>
                        <p className="text" htmlFor="UID">UID</p>
                        <input type="text" onChange={e => setNewUID(e.target.value)} id="uid"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Model">Model</p>
                        <input type="text" onChange={e => setProductName(e.target.value)} id="product_name"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Vendor">Vendor</p>
                        <input type="text" onChange={e => setVendor(e.target.value)} id="vendor"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Type">Type</p>
                        <input type="text" onChange={e => setFamily(e.target.value)} id="family"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Speed">Speed</p>
                        <input type="text" onChange={e => setSpeed(e.target.value)} id="speed"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Distance">Distance</p>
                        <input type="text" onChange={e => setDistance(e.target.value)} id="distance"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Wavelength">Wavelength</p>
                        <input type="text" onChange={e => setWavelength(e.target.value)} id="wavelength"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Interface">Interface</p>
                        <input type="text" onChange={e => setInterface(e.target.value)} id="interface"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Location">Location</p>
                        <input type="text" onChange={e => setLocation(e.target.value)} id="location"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Status">Status</p>
                        <input type="text" onChange={e => setStatus(e.target.value)} id="status"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Borrower">Borrower(optional)</p>
                        <input type="text" onChange={e => setBorrower(e.target.value)} id="borrower"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Note">Note(optional)</p>
                        <input type="text" onChange={e => setNote(e.target.value)} id="note"/>
                      </label>
                    </form>
                  </div>
                </>
    ModifyInfo = <>
                    <div className="add-wrapper" style={{width: '50%', float:'left'}}>
                      <p className="text" >Old Model:</p>
                      <p className="text">{old_product_name}</p>
                      <br></br>
                      <p className="text" >Old Vendor:</p>
                      <p className="text">{old_vendor}</p>
                      <br></br>
                      <p className="text" >Old Type:</p>
                      <p className="text" >{old_family}</p>
                      <br></br>
                      <p className="text" >Old Speed:</p>
                      <p className="text" >{old_speed}</p>
                      <br></br>
                      <p className="text" >Old Distance:</p>
                      <p className="text" >{old_distance}</p>
                      <br></br>
                      <p className="text" >Old Wavelength:</p>
                      <p className="text" >{old_wavelength}</p>
                      <br></br>
                      <p className="text" >Old Interface:</p>
                      <p className="text" >{old_inter}</p>
                      <br></br>
                    </div>
                    <div className="add-wrapper" style={{width: '50%', float:'right'}}>
                      <form onSubmit={addModify}>
                        <label>
                          <p className="text" htmlFor="Model">New Model</p>
                          <input type="text" onChange={e => setProductName(e.target.value)} id="product_name"/>
                        </label>
                        <label>
                          <p className="text" htmlFor="Vendor">New Vendor</p>
                          <input type="text" onChange={e => setVendor(e.target.value)} id="vendor"/>
                        </label>
                        <label>
                          <p className="text" htmlFor="Type">New Type</p>
                          <input type="text" onChange={e => setFamily(e.target.value)} id="family"/>
                        </label>
                        <label>
                          <p className="text" htmlFor="Speed">New Speed</p>
                          <input type="text" onChange={e => setSpeed(e.target.value)} id="speed"/>
                        </label>
                        <label>
                          <p className="text" htmlFor="Distance">New Distance</p>
                          <input type="text" onChange={e => setDistance(e.target.value)} id="distance"/>
                        </label>
                        <label>
                          <p className="text" htmlFor="Wavelength">New Wavelength</p>
                          <input type="text" onChange={e => setWavelength(e.target.value)} id="wavelength"/>
                        </label>
                        <label>
                          <p className="text" htmlFor="Interface">New Interface</p>
                          <input type="text" onChange={e => setInterface(e.target.value)} id="interface"/>
                        </label>
                      </form>
                    </div>
                  </>
  } else if(props.value === "tools"){
    AddDevice = <>
                  <div className="add-wrapper">
                    <form onSubmit={addNew}>
                      <label>
                        <p className="text" htmlFor="UID">UID</p>
                        <input type="text" onChange={e => setNewUID(e.target.value)} id="uid"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Item">Item</p>
                        <input type="text" onChange={e => setProductName(e.target.value)} id="product_name"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Status">Status</p>
                        <input type="text" onChange={e => setStatus(e.target.value)} id="status"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Borrower">Borrower(optional)</p>
                        <input type="text" onChange={e => setBorrower(e.target.value)} id="borrower"/>
                      </label>
                      <label>
                        <p className="text" htmlFor="Note">Note(optional)</p>
                        <input type="text" onChange={e => setNote(e.target.value)} id="note"/>
                      </label>
                    </form>
                  </div>
                </>
    ModifyInfo = <>
                    <div className="add-wrapper" style={{width: '50%', float:'left'}}>
                      <p className="text" >Old Item:</p>
                      <p className="text">{old_product_name}</p>
                    </div>
                    <div className="add-wrapper" style={{width: '50%', float:'right'}}>
                      <form onSubmit={addModify}>
                        <label>
                          <p className="text" htmlFor="Product Name">New Item:</p>
                          <input type="text" onChange={e => setProductName(e.target.value)} id="product_name"/>
                        </label>
                      </form>
                    </div>
                  </>
  } 
  
  let new_dis, status_dis, note_dis, mod_dis, uid_dis;
  if (props.membertype === "1") {
    new_dis = <><Button onClick={updateShow}>Add Device</Button></>;
    status_dis = <><Button onClick={upstaShow}>Update Status</Button></>;
    note_dis = <><Button onClick={upnotShow}>Update Note</Button></>;
    mod_dis = <><Button variant="primary" onClick={modifyShow}> Modify Device Info </Button></>;
    uid_dis = <><Button variant="primary" onClick={upuidShow}> Update UID </Button></>;
  } else if (props.membertype === "2") {
    new_dis = <><Button onClick={updateShow} style={{opacity:0.6}}>Add Device</Button></>;
    status_dis = <><Button onClick={upstaShow} style={{opacity:0.6}}>Update Status</Button></>;
    note_dis = <><Button onClick={upnotShow}>Update Note</Button></>;
    mod_dis = <><Button variant="primary" onClick={modifyShow}> Modify Device Info </Button></>;
    uid_dis = <><Button variant="primary" onClick={upuidShow} style={{opacity:0.6}}> Update UID </Button></>;
  } else {
    new_dis = <><Button onClick={updateShow} style={{opacity:0.6}}>Add Device</Button></>;
    status_dis = <><Button onClick={upstaShow} style={{opacity:0.6}}>Update Status</Button></>;
    note_dis = <><Button onClick={upnotShow} style={{opacity:0.6}}>Update Note</Button></>;
    mod_dis = <><Button variant="primary" onClick={modifyShow} style={{opacity:0.6}}> Modify Device Info </Button></>;
    uid_dis = <><Button variant="primary" onClick={upuidShow} style={{opacity:0.6}}> Update UID </Button></>;
  }

  if (da === undefined || da.length === 0) {
    return (
      <div className="App">
        <header className="App-title">{showtitle}</header>
        <div className="App-header">
          <h1>There is no data.</h1>
        </div>
      </div>
    );
  } else {
    keys = Object.keys(da[0])
    DisplayData=da.map(
      (info, i)=>{
          return( 
              <tr key={i} onClick={async (e)=>{handleShow(e);await fetchUID(e.target.parentElement.innerText.split('\t')[1]);}}>
                  <td>{i}</td>
                  {
                  keys.map((k, idx2) => {
                                        if (props.value === "legacy" && k === "Family") {
                                          return <td key={idx2} style={{display:'none'}}>{info[k]}</td>;
                                        } else {
                                          return <td key={idx2} >{info[k]}</td>;
                                        }
                            })
                  }
              </tr>
          )
      }
    )
  }

  if (inda === undefined || inda === null || inda.length === 0) {
    return (
        <div className="App">
          <header className="App-title">{showtitle}</header>
          <div className="App-header">
            {new_dis}
            <Modal show={update} onHide={updateClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Device</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {AddDevice}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={()=>{addNew();}}>
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={updateClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {status_dis}
            <Modal show={upsta} onHide={upstaClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Status</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {UpdateStatus}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={()=>{addStatus();}}>
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={upstaClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            {note_dis}
            <Modal show={upnot} onHide={upnotClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Note</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {UpdateNote}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={()=>{addNote();}}>
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={upnotClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <table className="table table-light table-striped table-hover">
                <thead>
                    <tr>
                      <th>#</th>
                      {
                      // create td elements from fieldsKeys
                      keys.map((k, idx2) =>  {
                                            if (props.value === "legacy" && k === "Family") {
                                              return <td key={idx2} style={{display:'none'}}>{k}</td>;
                                            } else {
                                              return <th key={idx2}>{k}</th>;
                                            }
                              })
                      }
                    </tr>
                </thead>
                <tbody>              
                    {DisplayData}
                    <Modal show={ButtonPop} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Detail</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        There is no Note or Borrow data about this UID. Please contact with AIMT owner to ask for help.
                      </Modal.Body>
                      <Modal.Footer>
                        {uid_dis}
                        {mod_dis}
                        <Button variant="secondary" onClick={handleClose}> Close </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal show={upuid} onHide={upuidClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update UID</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {UpdateUID}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={UIDchange}>
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={upuidClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal show={modify} onHide={modifyClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modify UID: {uid}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {ModifyInfo}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={addModify}>
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={modifyClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                </tbody>
            </table>
          </div>
        </div>
      );
  } 

  return (
    <div className="App">
      <header className="App-title">{showtitle}</header>
      <div className="App-header">
        {new_dis}
        <Modal show={update} onHide={updateClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Device</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {AddDevice}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>{addNew();}}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={updateClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {status_dis}
        <Modal show={upsta} onHide={upstaClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {UpdateStatus}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>{addStatus();}}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={upstaClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {note_dis}
        <Modal show={upnot} onHide={upnotClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {UpdateNote}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={()=>{addNote();}}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={upnotClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <table className="table table-light table-striped table-hover">
            <thead>
                <tr>
                  <th>#</th>
                  {
                    // create td elements from fieldsKeys
                    keys.map((k, idx2) =>  {
                                          if (props.value === "legacy" && k === "Family") {
                                            return <td key={idx2} style={{display:'none'}}>{k}</td>;
                                          } else {
                                            return <th key={idx2}>{k}</th>;
                                          }
                            })
                    }
                </tr>
            </thead>
            <tbody>              
                {DisplayData}
                <Modal show={ButtonPop} onHide={handleClose}  className="fade modal-lg">
                  <Modal.Header closeButton>
                    <Modal.Title>{uid}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="inner-table">
                      <table className="table table-light table-striped table-hover">
                        <thead>
                            <tr>
                              <th>#</th>
                              <th>UID</th>
                              <th>Status</th>
                              <th>Borrower</th>
                              <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>              
                            {inda.map(
                              (info, i)=>{
                                  return( 
                                      <tr key={i} onClick={async (e)=>{await fetchwwid(e.target.parentElement.childNodes[3].innerText);personShow(e);}} >
                                          <td>{i}</td>
                                          <td>{info.UID}</td>
                                          <td>{info.Status}</td>
                                          <td>{info.Borrower}</td>
                                          <td>{info.Date}</td>
                                      </tr>
                                  )
                              })
                            }
                        </tbody>
                      </table>
                      <p>Note: {inda[0].Note}</p>
                      <Modal show={person} onHide={personClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Borrower Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {per_info}
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={personClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    {uid_dis}
                    {mod_dis}
                    <Button variant="secondary" onClick={handleClose}> Close </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={upuid} onHide={upuidClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update UID</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {UpdateUID}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={UIDchange}>
                      Save Changes
                    </Button>
                    <Button variant="secondary" onClick={upuidClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
                <Modal show={modify} onHide={modifyClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modify UID: {uid}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {ModifyInfo}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={addModify}>
                      Save Changes
                    </Button>
                    <Button variant="secondary" onClick={modifyClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
            </tbody>
        </table>
      </div>
    </div>
  );
  
}
