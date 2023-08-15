import { useSearchParams } from 'react-router-dom';

export default function SearchForm({ onSubmit }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("query")


  const handleFormSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return;
    }
    onSubmit(query);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="searchInput"
        id="searchInput"
        required
        autoFocus
        onChange={e => setSearchParams({ query: e.currentTarget.value })}
      />
      <button type="submit">
        Search
      </button>
    </form>
  );
}