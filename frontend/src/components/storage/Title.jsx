import React, { useState } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function Title({
  title,
  handleTitleClick,
  deleteTitle,
  cookies,
  item,
}) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="flex py-1 ml-2">
      <div className="flex flex-row bg-red-50 hover:bg-red-100 rounded-lg w-full relative">
        <button
          className="btn-title "
          onClick={() => handleTitleClick(title)}
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          {title}
        </button>
        {showDelete && (
          <button
            onClick={() => {
              const titleIndex = item.keywords.titles.findIndex((t) => t === title);
              const url = item.keywords.urls[titleIndex];
              deleteTitle(title, cookies.accessToken, item.date, url);
            }}
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
            className="absolute right-0 top-[0.125rem]
             bg-transparent border-none focus:outline-none  mr-1 text-red-400"
          >
            <DeleteOutlineOutlinedIcon className=" text-red-400" />
          </button>
        )}
      </div>
    </div>
  );
}
