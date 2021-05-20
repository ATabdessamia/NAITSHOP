import React from "react";

const FileUploaded = ({ text, onChange, uploading, value }) => {
  return (
    <div className="my-2">
      <label className="mb-2 inline-block text-gray-700 capitalize ttext-sm sm:text-base md:text-sm lg:text-base">
        {text}
      </label>
      {!uploading ? (
        <label className="flex justify-between items-center w-full text-sm font-normal py-3 px-6 md:py-2 md:px-4 lg:py-3 lg:px-6 text-gray-600 bg-gray-100 bg-clip-padding border-0 cursor-pointer hover:shadow-sm transition-colors ease-in-out input-h">
          <span className="text-base leading-normal font-semibold uppercase">
            {value ? value : "choose image"}
          </span>
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <input
            type="file"
            className="hidden"
            name="image"
            onChange={onChange}
          />
        </label>
      ) : (
        uploading
      )}
    </div>
  );
};

export default FileUploaded;
