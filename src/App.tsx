import Header from './components/Header.tsx';
import LinkList from './components/LinkList.tsx';
import CreateLink from './components/CreateLink.tsx';
import Login from './components/Login.tsx';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Header />
      <div className="bg-gray-100 p-4 pt-1">
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
