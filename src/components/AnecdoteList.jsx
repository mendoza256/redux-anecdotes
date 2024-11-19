import { useSelector, useDispatch } from "react-redux";
import { castVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useQuery } from "@tanstack/react-query";
import anecdotesService from "../services/anecdotes";

const AnecdoteList = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdotesService.getAll,
    retry: 1,
  });

  const anecdotes = result.data;

  const filterState = useSelector(({ filter }) => {
    return filter;
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(castVote(id));
    const votedAnecdote = result.data?.find((a) => a.id === id);

    dispatch(setNotification(`You voted ${votedAnecdote.content}`, 5000));
  };

  if (result.isLoading) {
    return <span>Loading...</span>;
  }

  if (result.isError) {
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
