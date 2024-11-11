import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  return (
    <div style={{ marginBottom: "1rem" }}>
      <span>filter</span>
      <input onChange={(e) => dispatch(setFilter(e.target.value))} />
    </div>
  );
};

export default AnecdoteFilter;
