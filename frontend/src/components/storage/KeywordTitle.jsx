import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function KeywordTitle({
  title,
  handleTitleClick,
  deleteTitle,
  cookies,
  date,
  showDetails,
}) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="flex py-1 ml-2">
      <div className="flex flex-row bg-amber-50 hover:bg-amber-100 rounded-lg w-full relative">
        <button
          className="btn-title focus:ring-amber-300"
          onClick={handleTitleClick}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          {title}
        </button>
        {showDelete && (
          <button
            onClick={() => {
              const titleIndex = date.titles.findIndex((t) => t === title);
              const url = date.urls[titleIndex];
              deleteTitle(title, cookies.accessToken, date.date, url);
            }}
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
            className="absolute right-0 top-[0.125rem]
             bg-transparent border-none focus:outline-none  mr-1 text-red-400"
          >
            <DeleteOutlineOutlinedIcon className="text-red-400" />
          </button>
        )}
      </div>
    </div>
  );
}
