import Header from './components/Header';
import LinkList from './components/LinkList';
import CreateLink from './components/CreateLink';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Header />
      <div className="mb-4 bg-gray-100 p-4 pt-3">
        <Routes>
          <Route path="/" element={<LinkList />} />
          <Route path="/create" element={<CreateLink />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
