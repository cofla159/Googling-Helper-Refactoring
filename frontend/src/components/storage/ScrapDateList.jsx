import React from "react";
import Keyword from "./Keyword";
import Title from "./Title";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ScrapDateList = ({
  item,
  index,
  scrapData,
  handleToggleDateClick,
  handleTitleClick,
  cookies,
  deleteTitle,
}) => {
  return (
    <div key={index} className="pb-3">
      {(index === 0 || item.date !== scrapData[index - 1].date) && (
        <div className="flex border-t pt-3 border-slate-300">
          <button
            className="font-bold hover:bg-red-100 focus:ring-2 focus:outline-none focus:ring-red-300 rounded-lg text-xl px-3 py-1 underline decoration-double decoration-2 decoration-red-300 ml-3"
            onClick={() => handleToggleDateClick(item.date)}
          >
            {item.date}
          </button>
        </div>
      )}
      <div className="ml-2">
      {!index ? (
          <div className="relative">
            <div className="tooltip tooltip-right absolute left-[-10px]" data-tip="내가 구글링했던 검색어예요!">
              <InfoOutlinedIcon className="text-google-yellow self-center mt-1" fontSize="small" />
            </div>
            <Keyword keyword={item.keywords.keyword} item={item} />
          </div>
        ) : (
          <Keyword keyword={item.keywords.keyword} item={item} />
        )}
        <div className="flex flex-row">
          <div className="w-7"></div>
          <div className="w-[100%]">
            {item.keywords.titles.map((title, titleIndex) =>
              !index && !titleIndex ? (
                <div className="relative" key={titleIndex}>
                  <div className="tooltip tooltip-right absolute left-[-18px]" data-tip="스크랩한 링크의 제목이에요"
                  key={titleIndex}>
                    <InfoOutlinedIcon className="text-google-green self-center mt-1" fontSize="small" />
                  </div>
                  <Title
                    key={`title-${index}-${titleIndex}`}
                    title={title}
                    handleTitleClick={handleTitleClick}
                    cookies={cookies}
                    item={item}
                    deleteTitle={deleteTitle}
                  />
                </div>
              ) : (
                <Title
                  key={`title-${index}-${titleIndex}`}
                  title={title}
                  handleTitleClick={handleTitleClick}
                  cookies={cookies}
                  item={item}
                  deleteTitle={deleteTitle}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapDateList;
