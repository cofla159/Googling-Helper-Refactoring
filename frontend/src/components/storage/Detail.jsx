import ImageSpreader from "./ImageSpreader";
import TextSpreader from "./TextSpreader";

export default function Detail({ title, userScrapData, handleDragStart }) {
  const titleData = getTitleData(title, userScrapData);
  const data = titleData[0] || {};

  return (
    <div className="p-8 overflow-auto">
      <div className="pl-4 pt-2 pb-5 mb-5 border-b-2 border-slate-400 text-center text-4xl font-bold flex justify-between">
          {data.title}
          <div className="text-2xl flex items-end ">
            <button
              className="btn-bluewhite"
              onClick={() =>
                window.open(data.url, "_blank", "noopener noreferrer")
              }
            >
              Link
            </button>
          </div>
      </div>
      {data.url && (
        <>
          <iframe
            title={`iframe-${data.title}`}
            src={data.url}
            className="iframe"
          ></iframe>
        </>
      )}
      {data.text && data.text.length > 0 && (
        <TextSpreader texts={data.text} handleDragStart={handleDragStart} />
      )}
      {data.img && data.img.length > 0 && (
        <div className="flex flex-row flex-wrap w-full gap-[19px] pb-14">
          <ImageSpreader images={data.img} handleDragStart={handleDragStart} />
        </div>
      )}
    </div>
  );
}

function getTitleData(title, userScrapData) {
  let titleData = [];
  for (const item of userScrapData) {
    if (item.keywords.titles.includes(title)) {
      const index = item.keywords.titles.indexOf(title);
      const data = {
        title: title,
        url: item.keywords.urls[index],
        img: item.keywords.img ? item.keywords.img[index] : null,
        text: item.keywords.texts ? item.keywords.texts[index] : null,
      };
      titleData.push(data);
      break; // Stop after finding the first matching title
    }
  }
  return titleData;
}
