import axios from "axios";
import { useState } from "react";

export default function PhotosUpload({ placesPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  async function handleUploadPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/places/upload-by-link", {
      link: photoLink + ".jpg",
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function handleUploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/places/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <>
      {/* Adding Photo by Link */}
      <div className="flex">
        <input
          type="text"
          placeholder="Add using a link ...jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          onClick={handleUploadPhotoByLink}
          className="bg-gray-200 px-4 gap-2 rounded-2xl"
        >
          Add photo
        </button>
      </div>

      {/* Add Photo by uploading from device */}
      {/* grid grid-cols-3 mt-2 md:grid-cols-4 lg:grid-cols-6 */}

      <div className="flex  gap-4">
        {placesPhotos.length > 0 &&
          placesPhotos.map((link, index) => (
            <div key={index}>
              <img
                className="rounded-md"
                src={"http://localhost:5000/" + link}
                alt="Image"
                height={40}
                width={40}
              />
            </div>
          ))}

        <label className=" flex justify-center mx-1 border bg-transparent rounded-2xl py-4 text-2xl text-gray-400 cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleUploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}
