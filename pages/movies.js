/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from 'react';
import PageHead from 'components/PageHead';
import PageWrapper from 'components/PageWrapper';

// this is very very bad but I was challenged to do it in under an hour

const DEFINITELY_NOT_AN_API_KEY = '$2b$10$ikhbV/5qJk.lKAxZKBmGRu0N/8qocKtgFQvxXKtma/1.LCZlQGu5i';
const BIN_ID = '644c1a42b89b1e22999379af';

const fetchAllMovies = async () => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': DEFINITELY_NOT_AN_API_KEY,
    },
  });
  return await response.json();
};

const updateBin = async (payload) => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': DEFINITELY_NOT_AN_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  return await response.json();
};

const Badge = ({ children }) => (
  <span className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
    {children}
  </span>
);

export default () => {
  const [originalPayload, setOriginalPayload] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const results = await fetchAllMovies();
      console.log('bin payload', results);
      setOriginalPayload(results.record);
      setFilteredMovies(results.record.movies);
    };
    fetchData();
  }, []);

  // loading state
  if (!originalPayload || !filteredMovies) {
    return (
      <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const onFilter = (filterText) => {
    if (!filterText) {
      setFilteredMovies(originalPayload.movies);
    } else {
      // shitty filtering
      const newFilteredMovies = originalPayload.movies
        .filter(m => m.name.toLowerCase().includes(filterText.toLowerCase()));
      setFilteredMovies(newFilteredMovies);
    }
  };

  const watchMovie = async (movie, initial) => {
    const newMoviesPayload = [...originalPayload.movies];
    const originalMovieIdx = newMoviesPayload.findIndex(m => m.name === movie.name);

    newMoviesPayload[originalMovieIdx] = { ...movie };
    newMoviesPayload[originalMovieIdx].seen[initial] = true;

    setOriginalPayload(null);
    setFilteredMovies(null);
    const result = await updateBin({ movies: newMoviesPayload });
    setOriginalPayload(result.record);
    setFilteredMovies(result.record.movies);
  }

  return (
    <PageWrapper>
      <PageHead title="Secret movie tracker" description="Secret movie tracker" />

      <input
        type="text"
        placeholder="filter"
        onChange={(e) => onFilter(e.target.value)}
        className="mb-8 block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
      />

      <ul className="list-disc">
        {filteredMovies.map(m => (
          <li key={JSON.stringify(m)} className="ml-4 mb-4 text-xl">
            {m.name}

            {/* {m.seen.M && <Badge>M</Badge>}
            {m.seen.A && <Badge>A</Badge>} */}
            <div className="text-sm">
              <button
                onClick={() => watchMovie(m, 'M')}
                className={`px-1 py-1 rounded-full font-semibold text-sm bg-${m.seen.M ? 'cyan' : 'gray'}-500 text-white`}
                style={{ backgroundColor: m.seen.M ? 'cyan' : 'gray'}} // fuck you tailwind
              >
                M
              </button>
              {' '}
              <button
                onClick={() => watchMovie(m, 'A')}
                className={`px-1 py-1 rounded-full font-semibold text-sm bg-${m.seen.A ? 'cyan' : 'gray'}-500 text-white`}
                style={{ backgroundColor: m.seen.A ? 'cyan' : 'gray'}}
              >
                A
              </button>
            </div>
          </li>
        ))}
      </ul>
    </PageWrapper>
  )
};