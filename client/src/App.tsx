import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function Home() {
  return <p>Home</p>;
}
function Error() {
  return <p>Error</p>;
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
