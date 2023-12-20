import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
export default function KeywordKeyword({
  keyword,
  handleToggleKeywordClick,
  deleteKeyword,
  cookies,
  showKeywords,
}) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div>
      {showKeywords==="KEYWORD" ? (
        <div>
          <button
            className="btn-toggle-yellow w-full flex flex-row relative"
            onClick={() => handleToggleKeywordClick(keyword)}
            onMouseEnter={() => showKeywords==="KEYWORD" && setShowDelete(true)}
            onMouseLeave={() => showKeywords==="KEYWORD" && setShowDelete(false)}
          >
            <FolderIcon className="text-amber-400 mr-3 mt-1.5" />
            {keyword}
            {showDelete && (
              <div
                className="ml-2 absolute right-0 top-[0.125rem]
                bg-transparent border-none focus:outline-none  mr-1 text-red-400"
                onClick={() => {
                  deleteKeyword(keyword, cookies.accessToken);
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </div>
            )}
          </button>
        </div>
      ) : (
        <p className="font-semibold px-4 py-2 text-2xl">{keyword}</p>
      )}
    </div>
  );
}
