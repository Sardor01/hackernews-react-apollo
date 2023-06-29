import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../constants';

const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="flex flex-nowrap justify-between bg-orange-400 px-5 py-1">
      <div className="flex items-center gap-2">
        <Link to="/" className="no-underline">
          Hacker News
        </Link>
        {authToken ? (
          <>
            <span className="mb-0.5">|</span>
            <Link to="/create" className="no-underline">
              Submit
            </Link>
            <span className="mb-0.5">|</span>
            <button
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN);
                navigate(`/`);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <span className="mb-0.5">|</span>
            <Link to="/login" className="no-underline">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
