import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = {
      content: event.target.anecdote.value,
      votes: 0,
    };
    newAnecdoteMutation.mutate(anecdote);
    dispatch(setNotification(`You added ${anecdote.content}`, 5000));
    event.target.anecdote.value = "";
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
