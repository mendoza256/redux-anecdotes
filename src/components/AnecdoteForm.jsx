import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const getId = () => (100000 * Math.random()).toFixed(0);

  const addAnecdote = (event) => {
    event.preventDefault();
    const newAnecdote = {
      content: event.target.anecdote.value,
      id: getId(),
      votes: 0,
    };
    dispatch(createAnecdote(newAnecdote));
  };

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
