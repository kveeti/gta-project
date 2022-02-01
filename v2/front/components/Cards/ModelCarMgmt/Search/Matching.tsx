import { useRouter } from "next/router";
import { ICar } from "../../../../interfaces/Car";
import { useISelector } from "../../../../state/hooks";
import { SingleGrid } from "../../../Styles/Grid";
import { Label } from "../../../Styles/Page-cards";
import Car from "../../Car";

interface Props {
  cars: ICar[];
}

export const MatchingCars = ({ cars }: Props) => {
  const router = useRouter();
  const bp = useISelector((state) => state.bp);

  const onCarClick = (car: ICar) => {
    router.push(`/management/model-cars/${car.id}`, `/management/model-cars/${car.id}`, {
      shallow: true,
    });
  };

  return (
    <>
      {bp > 1 && <Label />}
      <SingleGrid>
        {cars.map((car: ICar) => (
          <Car onClick={(car: ICar) => onCarClick(car)} key={car.id} car={car} />
        ))}
      </SingleGrid>
    </>
  );
};
