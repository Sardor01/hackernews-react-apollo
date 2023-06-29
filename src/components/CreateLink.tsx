import { useState } from 'react';
import { type FetchResult, gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { FEED_QUERY } from '../queries';
import { LINKS_PER_PAGE } from '../constants';
import type { FeedLink } from '../types';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    description: '',
    url: '',
  });

  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: 'desc' };

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
    },
    update: (cache, { data }: Omit<FetchResult<{ post: FeedLink }>, 'context'>) => {
      const queryResult = cache.readQuery<{ feed: { links: FeedLink[] } }>({
        query: FEED_QUERY,
        variables: {
          take,
          skip,
          orderBy,
        },
      });

      if (queryResult && data) {
        cache.writeQuery({
          query: FEED_QUERY,
          data: {
            feed: {
              links: [data.post, ...queryResult.feed.links],
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
    onCompleted: () => navigate('/'),
  });

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (formState.description && formState.url) {
            await createLink();
          } else {
            alert('Please, fill in the form!');
          }
        }}
      >
        <div className="mt-3 flex flex-col">
          <input
            className="mb-3"
            value={formState.description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            type="text"
            placeholder="A description for the link"
            required
          />
          <input
            className="mb-3"
            value={formState.url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            type="text"
            placeholder="The URL for the link"
            required
          />
        </div>
        <button type="submit" className="min-w-[100px] bg-blue-900 p-3 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateLink;
