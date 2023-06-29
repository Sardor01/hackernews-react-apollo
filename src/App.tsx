import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Header />
      <div className="mb-4 bg-gray-100 p-4 pt-3">
        <Routes>
          <Route path="/" element={<Navigate replace to="/new/1" />} />
          <Route path="/create" element={<CreateLink />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/top" element={<LinkList />} />
          <Route path="/new/:page" element={<LinkList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
