import React from "react";
import TextSpreader from "./TextSpreader";
import ImageSpreader from "./ImageSpreader";

const KeywordDetail = ({ title, userScrapData, handleDragStart }) => {
  const keywordData = getKeywordData(title, userScrapData);
  return (
    <div className="p-8 overflow-auto">
      <div className="pl-4 pt-2 pb-5 mb-5 border-b-2 border-slate-400 text-center text-4xl font-bold flex justify-between">
          {title}
          <div className="text-2xl flex items-end ">
            <button
              className="btn-bluewhite"
              onClick={() =>
                window.open(keywordData.url, "_blank", "noopener noreferrer")
              }
            >
              Link
            </button>
          </div>
      </div>
      {keywordData.url && (
        <>
          <iframe
            title={`iframe-${title}`}
            src={keywordData.url}
            className="iframe"
          ></iframe>
        </>
      )}
      <TextSpreader
        texts={keywordData.texts}
        handleDragStart={handleDragStart}
      />
      <div className="flex flex-row flex-wrap w-full gap-[19px] pb-14">
        <ImageSpreader
          images={keywordData.imgs}
          handleDragStart={handleDragStart}
        />
      </div>
    </div>
  );
};

export default KeywordDetail;

function getKeywordData(title, userScrapData) {
  let keywordData = {
    texts: [],
    imgs: [],
    url: "",
  };

  for (const item of userScrapData) {
    if (item.dates && Array.isArray(item.dates)) {
      for (const date of item.dates) {
        if (date.titles && Array.isArray(date.titles)) {
          const titleIndex = date.titles.findIndex(
            (itemTitle) => itemTitle === title
          );
          if (titleIndex !== -1) {
            keywordData.texts.push(...date.texts[titleIndex]);
            keywordData.imgs.push(...date.img[titleIndex]);
            keywordData.url = date.urls[titleIndex];
            break;
          }
        }
      }
    }
  }

  return keywordData;
}
