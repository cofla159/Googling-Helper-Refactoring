import ImageSpreader from "./ImageSpreader";
import TextSpreader from "./TextSpreader";

export default function Posts({ date, userScrapData, handleDragStart }) {
  const dateData = getDateData(date, userScrapData);

  return (
    <div className="py-4 h-[93vh] overflow-hidden ">
      {date ? (
        <h1 className="sticky top-0 px-4 py-2 text-5xl text-center font-bold border-b bg-white">
          {date}
        </h1>
      ) : (
        ``
      )}
      {dateData && (
        <ul className="h-full overflow-auto p-8 pr-10">
          {dateData.map((data, index) => (
            <div className="pb-6" key={index}>
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
              <div>
                <iframe
                  title={`iframe-${index}`}
                  src={data.url}
                  className="iframe"
                ></iframe>
              </div>
              {data.text && (
                <TextSpreader
                  texts={data.text}
                  handleDragStart={handleDragStart}
                />
              )}
              {data.img && data.img.length > 0 && (
                <div className="flex flex-row flex-wrap w-full gap-[19px] pb-14">
                  {data.img.map}
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
}

function getDateData(date, userScrapData) {
  let dateData = [];
  for (const item of userScrapData) {
    if (item.date === date) {
      const data = item.keywords.titles.map((title, i) => {
        return {
          title: title,
          url: item.keywords.urls[i],
          text: item.keywords.texts ? item.keywords.texts[i] : null,
          img: item.keywords.img ? item.keywords.img[i] : null,
        };
      });
      dateData.push(...data);
    }
  }
  return dateData;
}
