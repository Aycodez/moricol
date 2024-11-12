"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./pharmacy-product-card";

import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export interface Product {
  product: {
    _id: string;
    coverimage: string;
    name: string;
    price: number;
    prescription: boolean;
  };
}

const NextArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className="absolute -right-5 top-20 z-[999] mb-5">
      <button
        onClick={onClick}
        className="rounded-full bg-gray-500 bg-opacity-40 p-2"
      >
        <GrFormNext size={20} />
      </button>
    </div>
  );
};
const PrevArrow = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className="absolute top-20 z-[999] mb-5">
      <button
        onClick={onClick}
        className="rounded-full bg-gray-500 bg-opacity-40 p-2"
      >
        <GrFormPrevious size={25} />
      </button>
    </div>
  );
};
const SliderUtil = ({ data }: { data: Array<Product> }) => {
  const settings = {
    arrows: true,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {data?.map((drug, index) => {
          if (drug?.product) {
            return (
              <ProductCard
                key={index}
                id={drug.product?._id}
                prescription={drug.product?.prescription}
                drugName={drug.product?.name}
                imageUrl={drug.product?.coverimage}
                price={drug.product?.price}
              />
            );
          }
        })}
      </Slider>
    </div>
  );
};

export default SliderUtil;
