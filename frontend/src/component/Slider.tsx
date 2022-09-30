import Axios from "axios";
import { useEffect, useState } from "react";

const Slider = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(comments.length);

  const show = 1;

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

	 useEffect(() => {
     setLength(comments.length);
   }, [comments]);

  const fetchComments = async () => {
    const response = await Axios(
      "https://picsum.photos/v2/list?page=2&limit=10"
    );
    setComments(response.data);
  };

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
    console.log(currentIndex);
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
    console.log(currentIndex);
  };
	
  return (
    <div className="w-full flex flex-col">
      {currentIndex > 0 && (
        <button className="arrow left-6 text-black" onClick={prev}>
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-gray-500"
          >
            <path
              d="m13.789 7.155c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591zm-.289 7.563v-5.446l-3.522 2.719z"
              fillRule="nonzero"
            />
          </svg>
        </button>
      )}
      <div className="flex w-full relative ">
        <div className="overflow-hidden w-full h-full">
          <div
            className={`flex transition-all ease-linear duration-200 content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
            }}
          >
            {comments.map((e, index) => {
              return (
                <div key={e.id}>
                  <div className="p-2">
                    <img
                      src={e.download_url}
                      alt={e.author}
                      className={`w-full ${
                        show > 1 ? "h-[360px]" : "h-[600px]"
                      } rounded-md object-cover shadow-md`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {currentIndex < length - show && (
        <button className="arrow right-6 bg-gray-100" onClick={next}>
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-gray-500"
          >
            <path
              d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591zm.289 7.563v-5.446l3.522 2.719z"
              fillRule="nonzero"
            />
          </svg>
        </button>
      )}
      <div className="flex space-x-2 items-center justify-center mt-5">
        {comments.map((slide, slideIndex) => (
          <div
            className={`cursor-pointer rounded-full text-xs ${
              currentIndex === slideIndex ? "text-gray-400" : "text-gray-200"
            }`}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
