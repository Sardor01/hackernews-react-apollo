import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FEED_QUERY } from '../queries';
import Link from './Link';
import { LINKS_PER_PAGE } from '../constants';
import type { FeedLink } from '../types';

const getQueryVariables = (isNewPage: boolean, page: number) => {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const take = isNewPage ? LINKS_PER_PAGE : 100;
  const orderBy = { createdAt: 'desc' };
  return { take, skip, orderBy };
};

const getLinksToRender = (isNewPage: boolean, data: { feed: { links: FeedLink[] } }) => {
  if (isNewPage) {
    return data.feed.links;
  }
  const rankedLinks = data.feed.links.slice();
  rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length);
  return rankedLinks;
};

const LinkList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isNewPage = location.pathname.includes('new');
  const pageIndexParams = location.pathname.split('/');
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);

  const { data, loading, error } = useQuery<{ feed: { links: FeedLink[]; count: number } }>(
    FEED_QUERY,
    {
      fetchPolicy: 'no-cache',
      variables: getQueryVariables(isNewPage, page),
    }
  );

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <ul>
            {getLinksToRender(isNewPage, data)
              .filter((link) => link.description && link.url)
              .map((link) => (
                <Link key={link.id} link={link} />
              ))}
          </ul>
          {isNewPage && (
            <div className="my-3 flex gap-3 text-gray-500">
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (page > 1) {
                    navigate(`/new/${page - 1}`);
                  }
                }}
              >
                Previous
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (page <= data.feed.count / LINKS_PER_PAGE) {
                    const nextPage = page + 1;
                    navigate(`/new/${nextPage}`);
                  }
                }}
              >
                Next
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LinkList;
