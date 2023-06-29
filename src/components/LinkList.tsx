import { useQuery } from '@apollo/client';
import { FEED_QUERY } from '../queries';
import Link from './Link';
import type { FeedLink } from '../types';

const LinkList = () => {
  const { data } = useQuery<{ feed: { links: FeedLink[] } }>(FEED_QUERY);

  return (
    <ul>
      {data && (
        <>
          {data.feed.links
            .filter((link) => link.description && link.url)
            .map((link) => (
              <Link key={link.id} link={link} />
            ))}
        </>
      )}
    </ul>
  );
};

export default LinkList;
