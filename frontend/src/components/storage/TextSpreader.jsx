function TextSpreader({ texts, handleDragStart }) {
  return texts.map((text, index) => {
    return (
      <div className="tooltip px-1" data-tip="드래그해서 텍스트를 메모에 추가해보세요" key={index}>
        <div
          className="cursor-grab hover:brightness-50 active:cursor-grabbing text-lg mb-5 text-left border border-slate-300 border-dashed rounded-lg p-2 "
          draggable={true}
          onDragStart={handleDragStart}
          key={index}
        >
          {text}
        </div>
      </div>
    );
  });
}

export default TextSpreader;
