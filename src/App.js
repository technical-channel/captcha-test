import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import ReCAPTCHA from 'react-google-recaptcha';

import Board from "./Components/Board/Board";

import "./App.css";
import Editable from "./Components/Editabled/Editable";





function App() {
  
  function onChange(value) {
    console.log('Captcha value:', value);
  }
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });

  const addboardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id, title) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };
 
  let captcha;
  function generate() {
  
    document.getElementById("submit").value = "";
  
    
    captcha = document.getElementById("image");
    let uniquechar = "";
  
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 1; i < 5; i++) {
      uniquechar += randomchar.charAt(
        Math.random() * randomchar.length)
    }
  
    captcha.innerHTML = uniquechar;
  }
  
  function printmsg() {
    const usr_input = document
      .getElementById("submit").value;

    if (usr_input == captcha.innerHTML) {
      let s = document.getElementById("key")
        .innerHTML = "Matched";
      generate();
    }
    else {
      let s = document.getElementById("key")
        .innerHTML = "not Matched";
      generate();
    }
  }
  
  
  useEffect(() => {
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
  }, [boards]);


  return (
    <div className="app">
      <div className="app_nav">
        <h1 className="text-2xl font-bold" style={{textAlign:'left'}} ><i class="fa-solid fa-box"></i> React Trello</h1>
        <div className="access-btn">
          <Popup trigger=
              {<button style={{backgroundColor: '#1c87c9', margin:'auto 20px', padding:'4px', borderRadius: '4px'}}> Sign Up </button>}>
              <div className="Login-form">
                <div className='form-box solid'>
                  <form className="signup-form" style={{paddingRight: '0px'}}>
                    <label>Email Id</label><br></br>
                    <input type="text" name="username" className="login-box"></input><br></br>
                    <label>Password</label><br></br>
                    <input type="password" name="password" className="login-box"></input><br></br>
                    <label>Confirm Password</label><br></br>
                    <input type="password" name="confirm password" className="login-box"></input>
                    <div className="login-control">
                      <button type="submit">Sign Up</button>
                    </div>
                    <p>Alreday a user? <span>LOGIN</span></p>
                    {/* <div onload="generate()">
                      <div id="user-input" class="inline">
                        <input type="text" id="submit"
                            placeholder="Captcha code" />
                      </div>
                
                    <div class="inline" onclick={generate()}>
                        <i class="fas fa-sync"></i>
                    </div>
                
                    <div id="image" class="inline" selectable="False">
                    </div>
                    <button type="submit" id="btn" onclick={printmsg()}>Sign Up <button />
 
                    <p id="key"></p>
                  </div> */}
                    <ReCAPTCHA
                      sitekey="6LcMr10kAAAAAGFG6c7BIHaPakcyVkMwtFIDIXxD"
                      onChange={onChange}
                    />
                  </form>
                </div>
              </div>
          </Popup>
          <Popup trigger=
              {<button style={{backgroundColor: '#1c87c9', padding:'4px', borderRadius: '4px'}}> Login </button>}>
              <div className="Login-form">
                <div className='form-box solid'>
                  <form className="login-form">
                    <label>User Id</label><br></br>
                    <input type="text" name="username" className="login-box"></input>
                    <label>Password</label><br></br>
                    <input type="password" name="password" className="login-box"></input>
                    <div className="login-control">
                      <button type="submit">Login</button>
                      <h6>Forgot Password</h6>
                    </div>
                    <p>Not Registered? <span>Create an account</span></p>
                  </form>
                </div>
              </div>
          </Popup>
        </div>
      </div> 
      <div className="app_boards_container">
        <div className="app_boards">
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(item.id)}
              removeCard={removeCard}
              dragEnded={dragEnded}
              dragEntered={dragEntered}
              updateCard={updateCard}
            />
          ))}
          <div className="app_boards_last">
            <Editable
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
