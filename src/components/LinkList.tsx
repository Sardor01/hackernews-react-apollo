import { useQuery } from '@apollo/client';
import { FEED_QUERY, NEW_LINKS_SUBSCRIPTION } from '../queries';
import Link from './Link';
import type { FeedLink } from '../types';

const LinkList = () => {
  const { data, subscribeToMore } = useQuery<{
    feed: {
      links: FeedLink[];
      __typename: string;
    };
  }>(FEED_QUERY);

  subscribeToMore<{ newLink: FeedLink }>({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(({ id }) => id === newLink.id);
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });

  return (
    <ul>
      {data && (
        <>
          {data.feed.links
            .filter((link: FeedLink) => link.description && link.url)
            .map((link: FeedLink) => (
              <Link key={link.id} link={link} />
            ))}
        </>
      )}
    </ul>
  );
};

export default LinkList;
