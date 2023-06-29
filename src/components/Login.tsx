import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: '',
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate('/');
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate('/');
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    formState.login ? login() : signup();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="my-2">{formState.login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-col gap-3">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your name"
            required
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="email"
          placeholder="Your email address"
          required
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safe password"
          required
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="submit"
          className="mr-2 min-w-[100px] cursor-pointer bg-blue-900 p-3 text-white"
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          type="button"
          className="cursor-pointer"
          onClick={() =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login ? 'need to create an account?' : 'already have an account?'}
        </button>
      </div>
    </form>
  );
};

export default Login;
