import { useState } from 'react';
import SearchForm from '../../Search/Search';
import MovieList from 'components/MovieList/MovieList';


export default function Movies() {
  const [query, setQuery] = useState('');

  return (
    <main>
      <MovieList data={query} />
      <SearchForm onSubmit={query => setQuery(query)} />
    </main>
  );
}
