import { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotosUpload from "../components/photosUpload";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [placesPhotos, setPlacesphotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get("/places/get-place/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setPlacesphotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

  function inputLabel(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(label, description) {
    return (
      <>
        {inputLabel(label)}
        {inputDescription(description)}
      </>
    );
  }

  async function handleSavePlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      photos: placesPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    if (id) {
      await axios.put("/places/update-place/" + id, ...placeData);
      setRedirect(true);
    }
    await axios.post("places/create-place", {
      ...placeData,
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <AccountNav />
      <form onSubmit={handleSavePlace}>
        {/* Title input */}
        {preInput(
          "Title",
          " Title for the place, should be short and catchy as an advertisment"
        )}
        <input
          type="text"
          placeholder=" Apartment Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Address */}
        {preInput("Address", " Address to the place")}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* Photos */}
        {preInput("Photos", " More photos = better")}

        <PhotosUpload placesPhotos={placesPhotos} onChange={setPlacesphotos} />

        {/* Description */}
        {preInput("Description", "Add description of the place")}
        <textarea
          className=""
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Perks */}
        {preInput("Perks", "Select the perks of the place")}
        <div className="grid gap- 2 mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 ">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {/* Extra Info */}
        {preInput("ExtraInfo", "House rules, precuations etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {/* Check in and out */}
        {preInput(
          "Check in&out times",
          "Add check in and out times, remember to have some time window for cleaning the roow between guests."
        )}
        <div className="grid sm:grid-col-3 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="15:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="15:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Max number of Guest</h3>
            <input
              type="text "
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>

        <button className="bg-color1 my-4 rounded-xl  text-white">Save</button>
      </form>
    </>
  );
}
