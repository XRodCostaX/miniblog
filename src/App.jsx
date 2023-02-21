import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuthentication } from './hooks/useAuthentication';
// context
import { AuthProvider } from './context/AuthContext';
// pages
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import About from './pages/About/About';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Post from './pages/Post/Post';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';

function App() {
  const [users, setUsers] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = users === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUsers(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>carregando...</p>;
  }

  return (
    <div className="App">
      <AuthProvider value={{ users }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />
              <Route path="/register" element={!users ? <Register /> : <Navigate to="/" />} />
              <Route path="/login" element={!users ? <Login /> : <Navigate to="/" />} />
              <Route path="/posts/create" element={users ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path="/dashboard" element={users ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
