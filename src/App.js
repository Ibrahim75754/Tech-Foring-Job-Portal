import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Addjob from './components/AddJob/Addjob';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import AuthProvider from './contexts/AuthProvider';
import Main from './layout/Main';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        { path: '/', element: <PrivateRoute><Home></Home></PrivateRoute> },
        { path: '/home', element: <PrivateRoute><Home></Home></PrivateRoute> },
        { path: '/addJob', element: <PrivateRoute><Addjob></Addjob></PrivateRoute> }
      ]
    },
    { path: '/login', element: <Login></Login> },
    { path: '/registration', element: <Registration></Registration> },
  ])
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
