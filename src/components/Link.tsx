import { type FetchResult, gql, useMutation } from '@apollo/client';
import { FEED_QUERY } from '../queries';
import { timeDifferenceForDate } from '../utils';
import { AUTH_TOKEN, LINKS_PER_PAGE } from '../constants';
import type { FeedLink, Vote } from '../types';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

const Link = ({ link }: { link: FeedLink }) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: 'desc' };

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data }: Omit<FetchResult<{ vote: Vote }>, 'context'>) => {
      const queryResult = cache.readQuery<{ feed: { links: FeedLink[] } }>({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      if (queryResult && data) {
        const updatedLinks = queryResult.feed.links.map((feedLink) => {
          if (feedLink.id === link.id) {
            return {
              ...feedLink,
              votes: [...feedLink.votes, data.vote],
            };
          }
          return feedLink;
        });

        cache.writeQuery({
          query: FEED_QUERY,
          data: {
            feed: {
              links: updatedLinks,
            },
          },
          variables: {
            take,
            skip,
            orderBy,
          },
        });
      }
    },
  });

  return (
    <li className="flex items-start gap-1.5 border border-b-0 border-gray-500 p-1 last:border-b">
      <div className="inline-flex flex-shrink-0 items-center">
        {authToken && (
          <button
            className="ml-1 text-gray-800"
            style={{ cursor: 'pointer' }}
            onClick={() => vote()}
          >
            ▲
          </button>
        )}
      </div>
      <div className="flex-1">
        {link.url ? (
          <a href={link.url} target="_blank" className="block w-full">
            {link.description}
          </a>
        ) : (
          <div>{link.description}</div>
        )}
        {
          <div className="text-sm text-gray-500">
            {link.votes.length} votes | {link.postedBy ? `by ${link.postedBy.name}` : ''}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </li>
  );
};

export default Link;
