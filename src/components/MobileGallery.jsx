import MobilePicture from "./MobilePicture";

const Gallery = ({ images }) => {
  return (
    <div className="grid grid-cols-3 gap-2 border border-neutral-400 w-fit h-fit py-3 px-3">
      {images.map((image, index) => (
        <MobilePicture key={index} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
};

export default Gallery;
