import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

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

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url,
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
