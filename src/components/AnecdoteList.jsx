import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import anecdotesService from "../services/anecdotes";
import { useNotificationDispatch } from "../contexts/notificationContext";

const AnecdoteList = () => {
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const anecdotesResult = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdotesService.getAll,
    retry: 1,
  });
  const voteMutation = useMutation({
    mutationFn: anecdotesService.updateAnecdote,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({ type: "SET", payload: `You voted ${result.content}` });
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
    },
  });

  const anecdotes = anecdotesResult.data;

  const vote = (id) => {
    const votedAnecdote = anecdotesResult.data?.find((a) => a.id === id);
    voteMutation.mutate({ ...votedAnecdote, votes: votedAnecdote.votes + 1 });
  };

  if (anecdotesResult.isLoading) {
    return <span>Loading...</span>;
  }

  if (anecdotesResult.isError) {
    return <span>Anecdote service not available due to error</span>;
  }

  return (
    <div>
      {anecdotes?.map((anecdote) => (
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
