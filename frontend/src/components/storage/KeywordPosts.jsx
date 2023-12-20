import React from "react";
import TextSpreader from "./TextSpreader";
import ImageSpreader from "./ImageSpreader";

const KeywordPosts = ({ keyword, userScrapData, handleDragStart }) => {
  const keywordData = getKeywordData(keyword, userScrapData);

  return (
    <div className="py-4 h-[93vh] overflow-hidden">
      <h1 className="sticky top-0 px-4 py-2 text-5xl text-center font-bold shadow bg-white">
        {keyword ? `${keyword}` : ""}
      </h1>
      {keywordData && (
        <ul className="h-full overflow-auto p-8 pr-10">
          {keywordData.map((data, index) => (
            <div className="pb-6" key={`keyword-post-${index}`}>
              <div className="pl-4 py-2 text-left text-3xl font-semibold flex justify-between">
                  {data.title}
                  <div className="flex items-end">
                  <button
              className="btn-bluewhite "
              onClick={() =>
                window.open(data.url, "_blank", "noopener noreferrer")
              }
            >
              Link
            </button>
              </div>
              </div>
              {data.url.length > 0 ? (
                <iframe
                  title={`iframe-${index}`}
                  src={data.url}
                  className="iframe"
                ></iframe>
              ) : null}
              {data.text && (
                <TextSpreader
                  texts={data.text}
                  handleDragStart={handleDragStart}
                />
              )}
              {data.img && data.img.length > 0 && (
                <div className="flex flex-row flex-wrap w-full gap-[19px] pb-14">
                  <ImageSpreader
                    images={data.img}
                    handleDragStart={handleDragStart}
                  />
                </div>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

function getKeywordData(keyword, userScrapData) {
  let keywordData = [];
  for (const item of userScrapData) {
    if (item.keyword === keyword) {
      const datas = item.dates.flatMap((date) => {
        return date.titles.map((title, i) => {
          return {
            title: title,
            url: date.urls[i] ? date.urls[i] : [],
            img: date.img[i] ? date.img[i] : null,
            text: date.texts[i] ? date.texts[i] : null,
          };
        });
      });
      keywordData.push(...datas);
    }
  }
  return keywordData;
}

export default KeywordPosts;
