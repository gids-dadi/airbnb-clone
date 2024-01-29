import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
  // const { id } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/places/get-places")
      .then((response) => {
        // Handle the successful response
        const { data } = response;
        setPlaces(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error fetching data:", error);
      });
  }, []);

  // useEffect(() => {
  //   axios.get("/places/get-place/" + id).then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <br />
        <Link
          to={"/account/places/new"}
          className=" inline-flex gap-1 bg-color1 text-white text-sm px-2 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div>
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"account/places/" + place._id}
              className="mt-4  flex cursor-pointer  bg-gray-200 gap-4 p-4 rounded-2xl"
            >
              <div className=" w-40 h-40 bg-gray-300 shrink-0 ">
                {place.photos.length > 0 && (
                  <img
                    src={place.photos[0].url}
                    alt={place.photos[0].filename}
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
              
            </Link>
          ))}
      </div>
    </div>
  );
}
