import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Addjob from './components/AddJob/Addjob';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Main from './layout/Main';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        { path: '/', element: <Home></Home> },
        { path: 'home', element: <Home></Home> },
        { path: 'addJob', element: <Addjob></Addjob> }
      ]
    },
    { path: '/login', element: <Login></Login> },
  ])
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
