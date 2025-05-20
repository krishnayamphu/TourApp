import { Link, Outlet } from "react-router-dom";
export default function AppLayout() {
  return (
    <>
      <header className="bg-sky-500">
        <div className="container mx-auto">
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link
                  className="block p-2 transition duration-300 hover:bg-sky-600 hover:text-white"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block p-2 transition duration-300 hover:bg-sky-600 hover:text-white"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="block p-2 transition duration-300 hover:bg-sky-600 hover:text-white"
                  to="/forms"
                >
                  Form
                </Link>
              </li>
              <li>
                <Link
                  className="block p-2 transition duration-300 hover:bg-sky-600 hover:text-white"
                  to="/hooks"
                >
                  Hooks
                </Link>
              </li>
              <li>
                <Link
                  className="block p-2 transition duration-300 hover:bg-sky-600 hover:text-white"
                  to="/todo"
                >
                  Todo
                </Link>
              </li>
              <li>
                <Link
                  className="block p-2 transition duration-300 hover:bg-sky-600 hover:text-white"
                  to="/upload-form"
                >
                  Upload
                </Link>
              </li>
              <li>
                <Link
                  className="block p-2 transition duration-300 hover:bg-sky-600 hover:text-white"
                  to="/media"
                >
                  Media Files
                </Link>
              </li>
              <li>
                <Link
                  className="block p-2 transition duration-300 hover:bg-sky-600 hover:text-white"
                  to="/register"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  className="block p-2 transition duration-300 hover:bg-sky-600 hover:text-white"
                  to="/users"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  className="block p-2 transition duration-300 hover:bg-sky-600 hover:text-white"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
