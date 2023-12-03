import {
  Card,
  CardHeader,
  CardBody,
  // CardFooter,
  Typography,
  // Button,
} from "@material-tailwind/react";
import { BASEURL }  from '../Constants/baseUrl.js'
import { useNavigate } from "react-router-dom";

export function CardOne({ title, courts }) {
  const navigate = useNavigate();
  return (
    <section className="mt-20">
      <div className="flex justify-center my-10"><span className="font-bold text-3xl ">{title}</span></div>
      <div className=" flex flex-wrap justify-center gap-y-10 gap-x-20 ">
        {
          courts.map((court, i) => (
            <Card className="mt-6 w-80" key={i} onClick={() => navigate(`/openCourt/${court._id}`)}>
              <CardHeader color="blue-gray" className="relative h-56">
                <img
                  src={`${BASEURL}/images/${court.image}`}
                  alt={`card-${i}`}
                  width="100%"
                  className="h-full"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {court.name}
                </Typography>
                <Typography>
                  {court.about}
                </Typography>
              </CardBody>
              {/* <CardFooter className="pt-0">
                <Button className="border border-orange-500 text-orange-500  bg-white hover:text-white hover:bg-orange-500">Read More</Button>
              </CardFooter> */}
            </Card>
          ))
        }

      </div>
    </section>

  );
}