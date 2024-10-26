import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          onClick={() => navigate("/")}
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 cursor-pointer"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
