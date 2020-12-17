import React, {useState} from 'react';
import './Menu.css';

const Menu = ({access, itemNames, onItem}) => {
  const [state, setState] = useState({opened: false});

  const openNav = () => {
    if (state.opened) closeNav();
    else {
      document.getElementById("mysidenav").style.width = "200px";
      document.getElementById("navmain").style.marginLeft = "450px";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
      setState({opened: true});
    }
  }


  const closeNav = () => {
    document.getElementById("mysidenav").style.width = "0";
    document.getElementById("navmain").style.marginLeft = "50px";
    document.body.style.backgroundColor = "white";
    setState({opened: false});
  }

  return (
    <>
      <div id="mysidenav" className="sidenav">
        <a className="closebtn" onClick={closeNav}>&times;</a>
        {itemNames.map((iName) => (
           access[iName] ? <a name={iName} onClick={onItem}>{iName}</a> : null
        ))}
      </div>
      <div id="navmain">
      <span style={{fontSize:"30px",cursor:"pointer", display: "block", textAlign: "left" }} onClick={openNav}>&#9776; Menu</span>
      </div>
    </>
  );
}

export default Menu;
