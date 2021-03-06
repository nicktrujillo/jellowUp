import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  displayProjects,
  displayCards,
  displayColumns,
  getProjects,
  getColumns,
  getCards,
  getBoard,
  addColumn,
  removeColumn,
  updateColumn,
  addCard,
  removeCard,
  updateCard,
  selectProjects,
  selectColumns,
  selectCards,
  selectBoard,
} from "./boardSlice";
function Column(props) {
  const [cardList, setCardList] = useState([]);
  const [inputText, setInputText] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`/api/cards/${props.id}`).then((r) => {
      setCardList(r.data);
    });
  }, []);
  function getCards() {
    axios.get(`/api/cards/${props.id}`).then((r) => {
      setCardList(r.data);
    });
    setInputText("");
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`/api/cards`, { description: inputText, id: props.id })
      .then((r) => {
        getCards();
      });
  }
  function handleDelete(item) {
    console.log(item.id);
    axios.delete(`/api/cards/${item.id}`).then((r) => {
      getCards();
    });
  }
  return (
    <div>
      {cardList.map((item) => (
        <div className="list-row">
          <ul className="list-items" key={item.id}>
            <li>{item.description}</li>
          </ul>
          <button className="btn xbtn" onClick={() => handleDelete(item)}>x</button>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
        className="btn add-card"
          type="text"
          placeholder="+ Add new card"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        ></input>
      </form>
    </div>
  );
}
export default Column;