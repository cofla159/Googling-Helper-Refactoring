import React from "react";

export default function Search({
  searchResultArray,
  handleDragStart,
  searchRef,
}) {
  const keyword = searchRef.current;

  const highlightSearchTerm = (text) => {
    const searchTerms = keyword.trim().split(" ");
    const regex = new RegExp(`(${searchTerms.join("|")})`, "gi");
    
  
    return text.split(regex).map((word, index) => {
      if (regex.test(word)) {
        return (
          <span className="bg-yellow-300" key={index}>
            {word}
          </span>
        );
      } else {
        return word;
      }
    });
  };
  

  return (
    <div>
      <div className="p-8 overflow-auto">
        <div className="px-4 pb-4 text-left text-3xl font-semibold">
          "{keyword}" 검색결과
        </div>
        {searchResultArray === null || keyword === undefined ? (
          <div className="text-3xl text-center p-6">검색 결과가 없습니다</div>
        ) : searchResultArray && searchResultArray.length > 0 ? (
          searchResultArray.map((text, index) => (
            <div
              className="tooltip px-1"
              data-tip="드래그해서 텍스트를 메모에 추가해보세요"
              key={index}
            >
              <div
                className="cursor-grab hover:brightness-50 active:cursor-grabbing text-lg mb-5 text-left border border-slate-300 border-dashed rounded-lg p-2 "
                draggable={true}
                onDragStart={handleDragStart}
              >
                {highlightSearchTerm(text)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-3xl text-center p-6">로딩중</div>
        )}
      </div>
    </div>
  );
}
