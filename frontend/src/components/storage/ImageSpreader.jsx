function ImageSpreader({ images, handleDragStart }) {
  return images.map((image, imageIndex) => {
    return (
      <div className="tooltip" data-tip="드래그해서 이미지를 메모에 추가해보세요" key={`img-${imageIndex}`}>
        <img
          className="cursor-grab border-[2px] rounded-lg hover:brightness-50 active:cursor-grabbing"
          onDragStart={handleDragStart}
          key={`img-${imageIndex}`}
          src={image}
          crossOrigin="anonymous"
          alt={`Imag-${imageIndex}`}
        />
      </div>
    );
  });
}

export default ImageSpreader;
