import { useSelector, useDispatch } from "react-redux";
import { castVote } from "./reducers/anecdoteReducer";
import { AnecdoteForm } from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => a.votes - b.votes)
  );
  const dispatch = useDispatch();
  const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes);

  const vote = (id) => {
    dispatch(castVote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {orderedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  );
};

export default App;
