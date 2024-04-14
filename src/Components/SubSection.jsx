import { useEffect, useState } from "react";
import SearchPage from "./SearchPage";
import axios from "axios";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const email = sessionStorage.getItem("useremail").replace(/^"(.*)"$/, "$1");
  const user_name = sessionStorage
    .getItem("username")
    .replace(/^"(.*)"$/, "$1");

  const [subscriptionsFetched, setSubscriptionsFetched] = useState(false);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.post(
        "https://6jnew3zo65.execute-api.us-east-1.amazonaws.com/prod/dashboard",
        { email }
      );
      const filteredSubscriptions = response.data.filter(
        (item) => item !== null
      );
      setSubscriptions(filteredSubscriptions);

      setSubscriptionsFetched(true);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  useEffect(() => {
    if (!subscriptionsFetched) {
      fetchSubscriptions();
    }
  }, [subscriptionsFetched]);

  const handleRemoveSubscription = async (songId) => {
    axios
      .patch(
        "https://6jnew3zo65.execute-api.us-east-1.amazonaws.com/prod/subservice",
        { email, user_name, songId, action: "remove" }
      )
      .then((response) => {
        console.log(response.data);
        setSubscriptions((prevSubscriptions) =>
          prevSubscriptions.filter((song) => song.songId !== songId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col mt-10 py-5">
      <h1 className="text-3xl font-bold text-violet-400 tracking-tight text-violet-400 sm:text-3xl bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">
        <p>
          Hi,{" "}
          <span className="text-transparent bg-clip-text">{user_name}!</span>
        </p>
      </h1>
      <h2 className="text-2xl font-bold text-violet-400 py-5">
        Your Subscriptions
      </h2>
      {subscriptions.length === 0 ? (
        <p className="text-white-900 mt-5">
          Oops, you haven't subscribed to any music yet. Use the query feature
          to search for songs to subscribe to.
        </p>
      ) : (
        subscriptions.map((song) => (
          <div key={song.songId} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={song.img_url}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-white-900">
                  {song.title} - {song.artist}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-white-900">
                  {song.year}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <button
                onClick={() => handleRemoveSubscription(song.songId)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
      <SearchPage />
    </div>
  );
};

export default Subscriptions;
