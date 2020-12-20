import React, { useState } from "react";
import ReactDOM from "react-dom";

import anecdotes from "./anecdotes";
import Button from "./components/Button";
import DisplayVoteCount from "./components/DisplayVoteCount";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const randomAnecdote = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const votesCopy = [...votes];

  const recordVote = () => {
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  const modeCount = Math.max(...votesCopy);

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>
      <br />
      <DisplayVoteCount vote={votes[selected]} />
      <br />
      <Button handleClick={recordVote} text="Vote" />
      <Button handleClick={randomAnecdote} text="Next anecdote" />
      <br />
      {modeCount > 0 && (
        <>
          <h2>Most Popular Anecdote/(s)</h2>
          <ul>
            {votesCopy
              .reduce((acc, curr, index) => {
                if (curr === modeCount) acc.push(index);
                return acc;
              }, [])
              .map((voteIndex, index) => (
                <li key={index}>{anecdotes[voteIndex]}</li>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
