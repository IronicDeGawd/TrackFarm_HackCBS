import { useState, useEffect } from "react";
import img1 from "../assets/carousel/img1.png";
import img2 from "../assets/carousel/img2.png";
import img3 from "../assets/carousel/img3.png";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    {
      id: 1,
      image: img1,
      alt: "Item 1",
    },
    {
      id: 2,
      image: img2,
      alt: "Item 2",
    },
    {
      id: 3,
      image: img3,
      alt: "Item 3",
    },
  ];

  // Transition to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // Transition to previous slide
  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  // Auto transition every 15 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  });

  return (
    <div className="w-full\">
      <div className="relative mx-auto my-10 max-w-[500px] h-[500px]">
        {/* Carousel container */}
        <div className="relative overflow-hidden rounded-full border-4 border-green-800">
          <div
            className="flex transition-transform delay-200 duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full h-full flex justify-center items-center"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons container */}
        {/* Left arrow */}
        <button
          onClick={prevSlide}
          className="absolute z-10 size-12 top-80 right-0 flex justify-center items-center border-green-900 border-2 bg-white text-black font-bold text-2xl p-3 rounded-full hover:bg-green-700 hover:text-white hover:border-0"
        >
          &lt;
        </button>

        {/* Right arrow */}
        <button
          onClick={nextSlide}
          className="absolute z-10 size-12 bottom-20 right-8 flex justify-center items-center bg-green-700 text-white font-bold text-2xl p-3 rounded-full opacity-100 hover:border-green-900 hover:text-black hover:bg-white hover:border-2"
        >
          &gt;
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Carousel;
