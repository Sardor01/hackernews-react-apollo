import { useQuery, gql } from '@apollo/client';
import Link from './Link';

interface Link {
  id: string;
  description: string;
  url: string;
}

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery<{ feed: { links: Link[] } }>(FEED_QUERY);

  return (
    <div>
      {data && (
        <>
          {data.feed.links
            .filter((link) => link.description && link.url)
            .map((link) => (
              <Link key={link.id} link={link} />
            ))}
        </>
      )}
    </div>
  );
};

export default LinkList;
