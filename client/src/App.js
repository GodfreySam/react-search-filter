import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [allGame, setAllGame] = useState([]);
  const [filteredGame, setFilteredGame] = useState(allGame);

  // a filter to filter games by groups and levels

  const checkInput = (inputL, inputG, str) => {
      let pattern = str.split("").map((item) => {
          return `(?=.*${item})`;
        }).join("");

        let regex = new RegExp(`${pattern}`, "g");

        return inputL.match(regex) || inputG.match(regex);
      }

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase().substring(0, 3);
    let result = [];
    
    result = allGame.filter((data) => {
      let group = data.Group.substring(0, 3).toLowerCase();
      let level = data.Level.substring(0, 3).toLowerCase();
      return group.includes(value) ||
       level.includes(value) ||
       checkInput(group, level, value)
    });
    if (result.length > 0) {
      setFilteredGame(result);
    } else {
      document.getElementById("alert").innerHTML = "no games with found with the input";
    }
  };

  const BarStyling = {
    width: "25rem",
    margin: "0 auto",
    marginTop: "10%",
    marginBottom: "5%",
    background: "#F1F1F1",
    border: "none",
    padding: "0.5rem",
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetch("/api", { crossdomain: true })
      .then((response) => response.json())
      .then((data) => {
        setAllGame(data.data);
        setFilteredGame(data.data);
      });
  }, []);

  return (
    <div>
      <h1>9ijakids Game List</h1>
      <input
        style={BarStyling}
        type="text"
        placeholder={"search game by topic"}
        onKeyUp={(e) => handleSearch(e)}
      />
      <p id="alert"></p>
      <div>
        {filteredGame.map((game, index) => {
          return (
            <div key={game.GameTitle}>
              <ul>
                <li className="image">
                  <div className="game-header">
                    <span className="title">{game.GameTitle}</span>
                    <span className="description">{game.GameDescription}</span>
                  </div>
                  <a href="#">
                    <img src={game.GameImage} />
                  </a>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;