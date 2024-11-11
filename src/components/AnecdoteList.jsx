import { useSelector, useDispatch } from "react-redux";
import { castVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes;
    }
    return filter !== ""
      ? anecdotes.filter((a) => a.content.includes(filter))
      : anecdotes;
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(castVote(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
