import { useNotificationDispatch } from "../contexts/notificationContext";
import anecdotesService from "../services/anecdotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.createAnecdote,
    onSuccess: (result) => {
      queryClient.invalidateQueries("anecdotes");
      dispatch({ type: "SET", payload: `You added ${result.content}` });
      setTimeout(
        () =>
          dispatch({
            type: "RESET",
          }),
        5000
      );
    },
    onError: (error) => {
      dispatch({ type: "SET", payload: error });
      setTimeout(
        () =>
          dispatch({
            type: "RESET",
          }),
        5000
      );
    },
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = {
      content: event.target.anecdote.value,
      votes: 0,
    };
    newAnecdoteMutation.mutate(anecdote);
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
