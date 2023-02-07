import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Editable from "../Editabled/Editable";

import "./Board.css";

function Board(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  let bgColor = "#" + randomColor;
  // const colors = ["#0D98BA", "#10BBE5", "#32CBF1", "#5DD6F4", "#0A758F", "#009AAC", "#005473", "#0D98BA"];
  // const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //let bgColor = [];
  // let index = colors.indexOf(randomColor) ;
  // if (index % 2 == 0){
  //   bgColor = "#000000";
  // }
  // else {
  //   bgColor = "#fffffff";
  // }
 
  
  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title" id="myContent" contentEditable="true">
          {props.board?.title}
          <span>{props.board?.cards?.length || 0}</span>
        </p>
        <div
          className="board_header_title_more"
          onClick={() => setShowDropdown(true)}
        >
          <MoreHorizontal />
          {showDropdown && (
            <Dropdown
              class="board_dropdown"
              onClose={() => setShowDropdown(false)}
            >
              <p onClick={() => props.removeBoard()}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <div style={{backgroundColor: bgColor}} className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Add Card "
          placeholder="Enter Card Title"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board?.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;
