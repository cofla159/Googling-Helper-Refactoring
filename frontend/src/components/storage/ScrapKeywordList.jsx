import React, { useState } from "react";
import KeywordKeyword from "./KeywordKeyword";
import KeywordTitle from "./KeywordTitle";

export default function ScrapKeywordList({
  item,
  handleToggleKeywordClick,
  deleteKeyword,
  cookies,
  currentKeyword,
  handleTitleClick,
  deleteTitle,
  showKeywords,
}) {
  const [selectedKeyword, setSelectedKeyword] = useState(null);

  const handleKeywordClick = (keyword) => {
    if (selectedKeyword === keyword) {
      setSelectedKeyword(null);
    } else {
      setSelectedKeyword(keyword);
    }
    showKeywords === "KEYWORD" && handleToggleKeywordClick(keyword);
  };

  return (
    <ul className="">
      <li>
        <KeywordKeyword
          keyword={item.keyword}
          handleToggleKeywordClick={handleKeywordClick}
          deleteKeyword={deleteKeyword}
          cookies={cookies}
          showKeywords={showKeywords}
        />
        {showKeywords === "KEYWORD" &&
          selectedKeyword === item.keyword &&
          item.dates.map((date, dateIndex) => (
            <div className="flex flex-row">
              <div className="w-7"></div>
              <div className="w-[100%]" key={`date-${dateIndex}`}>
                {currentKeyword[item.keyword] &&
                  date.titles.map((title, titleIndex) => (
                    <KeywordTitle
                      key={`title-${titleIndex}`}
                      title={title}
                      handleTitleClick={() => handleTitleClick(title)}
                      deleteTitle={deleteTitle}
                      cookies={cookies}
                      date={date}
                      showDetails={true}
                    />
                  ))}
              </div>
            </div>
          ))}
      </li>
    </ul>
  );
}
