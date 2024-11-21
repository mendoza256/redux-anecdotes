import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import anecdotesService from "../services/anecdotes";

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const anecdotesResult = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdotesService.getAll,
    retry: 1,
  });

  const voteMutation = useMutation({
    mutationFn: anecdotesService.updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  const anecdotes = anecdotesResult.data;

  const filterState = useSelector(({ filter }) => {
    return filter;
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    const votedAnecdote = anecdotesResult.data?.find((a) => a.id === id);
    voteMutation.mutate({ ...votedAnecdote, votes: votedAnecdote.votes + 1 });

    dispatch(setNotification(`You voted ${votedAnecdote.content}`, 5000));
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
