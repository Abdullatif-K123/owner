import themeConstants from "../../../../constants/themeConstants";
import { FC } from "react";
import { BusChair, BusChairProps } from "./BusChair";
import { Gender } from "@/constants/enums";

export type ChairStatus = "Booked" | "Available" | "Selected";

export type ChairProps = {
  isView?: boolean;
  chairNumber: number | null | false;
  gender?: Gender;
  selected?: boolean;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isCompleted?: boolean;
  onToggleSelect?: () => void;
} & Omit<BusChairProps, "onClick" | "chairProperties">;
export const Chair: FC<ChairProps> = ({
  onToggleSelect,
  selected,
  gender,
  isView,
  isPrimary,
  isSecondary,
  isCompleted,
  ...props
}) => {
  const seatState: ChairStatus = getChairState(props.bookId, !!selected);
  const handleClick = () => {
    if (!props.clickable) return;
    if (isView) {
      onToggleSelect?.();
    } else if (
      (seatState === "Available" || seatState === "Selected") &&
      props.chairNumber
    ) {
      onToggleSelect?.();
    }
  };
  return (
    <BusChair
      chairProperties={
        ChairProperties(gender, isPrimary, isSecondary, isCompleted)[seatState]
      }
      onClick={handleClick}
      {...props}
    />
  );
};

export const getChairState = (
  bookId: string | undefined | null,
  selected: boolean
): ChairStatus => {
  if (selected) {
    return "Selected";
  } else if (bookId !== undefined) {
    return "Booked";
  } else {
    return "Available";
  }
};
export type ChairPropertiesParams = { discriminateGender: boolean };
export function ChairProperties(
  gender: Gender | undefined,
  isPrimary: boolean | undefined,
  isSecondary: boolean | undefined,
  isCompleted: boolean | undefined
) {
  return {
    Booked: {
      bgcolor: isCompleted
        ? themeConstants.primary
        : isPrimary
        ? "gold"
        : isSecondary
        ? "#872fc9"
        : themeConstants.secondary,
      color: "#fff",
    },
    Available: {
      bgcolor: "#f0f0f0",
      color: themeConstants.primary,
    },
    Selected: {
      bgcolor:
        gender !== undefined
          ? gender === Gender.Female
            ? "#E547A1"
            : "#029EF6"
          : themeConstants.primary,
      color: "#fff",
    },
  } satisfies {
    [key in ChairStatus]: { bgcolor: string; color: string };
  };
}
export default Chair;
