import { Carousel } from "@material-tailwind/react";
 
export function ImgCarousel() {
  return (
    <section className="w-full mt-5 sm:px-5">
      <Carousel loop autoplay nextArrow={() => false} prevArrow={() => false} navigation={() => false} className="rounded-xl xl:w-11/12 mx-auto  ">
      <img
        src="https://surabhiturf.com/wp-content/uploads/2020/07/turf1.jpg"
        alt=" 1"
        className="h-full w-full object-cover " 
      />
      <img
      src="https://surabhiturf.com/wp-content/uploads/2020/07/turf2.jpg"
        alt=" 2"
        className="h-full w-full object-cover "
      />
      <img
        alt=" 3"
        src="https://surabhiturf.com/wp-content/uploads/2020/07/ARE-YOU-READY-FOR-SOME-FOOTBALL-.jpg"
        className="h-full w-full object-cover "
      />
    </Carousel>
    </section>
    
  );
}