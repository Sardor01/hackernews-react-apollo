import { FormEvent, useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import Link from './Link';
import type { FeedLink } from '../types';

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery<{ feed: { links: FeedLink[] } }>(
    FEED_SEARCH_QUERY
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await executeSearch({
      variables: { filter: searchFilter },
    });
  };

  return (
    <>
      <form className="mb-6 flex flex-col items-start justify-start gap-2" onSubmit={handleSubmit}>
        Search
        <input
          type="text"
          className="w-full"
          required
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button type="submit" className="min-w-[100px] bg-blue-900 p-2 text-white">
          OK
        </button>
      </form>
      {data && data.feed.links.map((link) => <Link key={link.id} link={link} />)}
    </>
  );
};

export default Search;
