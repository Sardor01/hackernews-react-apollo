import { useQuery, gql } from '@apollo/client';
import Link from './Link';
import type { FeedLink } from '../types';

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        description
        url
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

const LinkList = () => {
  const { data } = useQuery<{ feed: { links: FeedLink[] } }>(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.feed.links
            .filter((link) => link.description && link.url)
            .map((link, index) => (
              <Link key={link.id} link={link} index={index} />
            ))}
        </>
      )}
    </div>
  );
};

export default LinkList;
