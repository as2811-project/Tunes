import React, { useState } from "react";
import axios from "axios";

export const SearchPage = () => {
  const [subscribedSongs, setSubscribedSongs] = useState([]);
  const [message, setMessage] = useState([]);
  const [noResult, setNoResults] = useState([]);
  const [subscribed, setSubscribed] = useState([]);
  const email = sessionStorage.getItem("useremail").replace(/^"(.*)"$/, "$1");
  const username = sessionStorage.getItem("username").replace(/^"(.*)"$/, "$1");
  const [searchTerm, setSearchTerm] = useState({
    title: "",
    artist: "",
    year: "",
  });
  const [responseData, setResponseData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!searchTerm.title && !searchTerm.artist && !searchTerm.year) {
      setMessage("Please enter at least one search term.");
      return;
    } else {
      setMessage();
    }
    const data = {
      title: searchTerm.title,
      artist: searchTerm.artist,
      year: searchTerm.year,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://6jnew3zo65.execute-api.us-east-1.amazonaws.com/prod/query",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      if (
        response.data &&
        response.data.items &&
        response.data.items.length > 0
      ) {
        setResponseData(response.data);
      } else {
        setResponseData([]);
        console.log("No results found.");
        setNoResults("No result is retrieved. Please query again");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSubscribe = async (songId) => {
    axios
      .patch(
        "https://6jnew3zo65.execute-api.us-east-1.amazonaws.com/prod/subservice",
        { email, username, songId, action: "add" }
      )
      .then((response) => {
        console.log(response.data);
        setSubscribedSongs([...subscribedSongs, songId]);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 409) {
          console.log(error.response.data.message);
          setSubscribed(songId);
        } else {
          setSubscribed("There was an error, please try again later.");
        }
      });
  };

  return (
    <div className="flex flex-col mt-10 py-5">
      <h2 className="text-2xl font-semibold mb-4 text-violet-400">Query</h2>
      <form
        onSubmit={submitHandler}
        className="flex flex-row space-y-0.5 space-x-4"
      >
        <input
          type="text"
          name="title"
          value={searchTerm.title}
          onChange={handleChange}
          placeholder="Song Title"
          className="border rounded-md h-10 px-4 py-2 w-full text-gray-500"
        />
        <input
          type="text"
          name="artist"
          value={searchTerm.artist}
          onChange={handleChange}
          placeholder="Artist"
          className="border rounded-md h-10 px-4 py-2 w-full text-gray-500"
        />
        <input
          type="text"
          name="year"
          value={searchTerm.year}
          onChange={handleChange}
          placeholder="Year"
          className="border rounded-md px-4 py-2 w-full text-gray-500"
        />
        <button
          type="submit"
          className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded-md mt-4 w-full md:w-auto"
        >
          Search
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <p className="pt-5 font-normal mb-7">Query Results are displayed below</p>
      <div className="flex flex-col">
        {responseData && responseData.items && responseData.items.length > 0 ? (
          responseData.items.map((item, index) => (
            <div
              key={item.songId}
              className="flex justify-between gap-x-3 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={item.img_url}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-white-900">
                    {item.title} - {item.artist}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-white-900">
                    {item.year}
                  </p>
                </div>
              </div>
              {/* Subscribe button */}
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-2 rounded-md"
                onClick={() => handleSubscribe(item.songId)}
                disabled={subscribedSongs.includes(item.songId)}
              >
                {subscribedSongs.includes(item.songId)
                  ? "Subscribed"
                  : subscribed === item.songId
                  ? "Already Subscribed"
                  : "Subscribe"}
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500">
            {noResult && <p className="message">{noResult}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
