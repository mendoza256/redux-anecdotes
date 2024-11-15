import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
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
    dispatch(createNotification(`You added ${newAnecdote.content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
