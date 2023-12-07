import { Carousel } from "@material-tailwind/react";
const BASEURL = process.env.REACT_APP_BASEURL;
 
export function ImgCarousel() {
  return (
    <section className="w-full mt-5 sm:px-5">
      <Carousel loop autoplay nextArrow={() => false} prevArrow={() => false} navigation={() => false} className="rounded-xl xl:w-11/12 mx-auto  ">
      <img
        src={`${BASEURL}/images/carousel1.jpg`}
        alt=" 1"
        className="h-full w-full object-cover " 
      />
      <img
      src={`${BASEURL}/images/carousel2.jpg`}
        alt=" 2"
        className="h-full w-full object-cover "
      />
      <img
        alt=" 3"
        src={`${BASEURL}/images/carousel3.jpg`}
        className="h-full w-full object-cover "
      />
    </Carousel>
    </section>
    
  );
}