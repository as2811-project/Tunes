import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const regAPIUrl =
  "https://6jnew3zo65.execute-api.us-east-1.amazonaws.com/prod/register";

export const RegForm = () => {
  let navigate = useNavigate();
  const [email, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUsername] = useState("");
  const [message, setMessage] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    if (email === "" || password.trim() === "") {
      setMessage("Please fill all the fields");
      return;
    }
    setMessage(null);
    const requestBody = {
      user_name: user_name,
      email: email,
      password: password,
    };

    axios
      .post(regAPIUrl, requestBody)
      .then((response) => {
        setMessage("Registeration Successful");
        setIsLoggedIn(true);
        return response;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setMessage(error.response.data.message);
        } else {
          setMessage(
            "Apologies. The server encountered an issue, please try again."
          );
        }
      });
  };

  if (isLoggedIn) {
    navigate("/login");
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-4xl font-bold tracking-tight text-violet-400 sm:text-3xl">
          Register
        </h1>
        <form className="space-y-6" onSubmit={submitHandler} method="POST">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-white-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                value={user_name}
                type="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={email}
                type="email"
                autoComplete="email"
                onChange={(e) => setUseremail(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                value={password}
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-violet-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
        {message && (
          <div
            className="flex items-center mt-4 p-4 mb-4 text-sm text-red-800 rounded-lg bg-stone-900 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
