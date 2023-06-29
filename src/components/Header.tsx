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
        <span className="mb-0.5">|</span>
        <Link to="/" className="no-underline">
          New
        </Link>
        <span className="mb-0.5">|</span>
        <Link to="/top" className="no-underline">
          Top
        </Link>
        <span className="mb-0.5">|</span>
        <Link to="/search" className="no-underline">
          Search
        </Link>
        <span className="mb-0.5">|</span>
        {authToken ? (
          <>
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
          <Link to="/login" className="no-underline">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
