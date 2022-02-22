import { useRouter } from "next/router";
import { ICar } from "../../../../../interfaces/Car";
import { useISelector } from "../../../../../state/hooks";
import { paths } from "../../../../../util/constants";
import { SingleGrid } from "../../../../Common/Grids";
import { Label } from "../../../../Common/Text";
import { Car } from "../../../Car";

interface Props {
  cars: ICar[];
}

export const MatchingCars = ({ cars }: Props) => {
  const router = useRouter();
  const bp = useISelector((state) => state.bp);

  const onCarClick = (car: ICar) => {
    router.push(paths.mgmtModelCarEdit(car.id));
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
