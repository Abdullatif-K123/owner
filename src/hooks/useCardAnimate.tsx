import { RefObject, useEffect } from "react";
import { Step } from "../features/login/Signup";

const useAnimateCard = (
  step: Step,
  slideContainer: RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const width = window.innerWidth;
    if (step.num === 2) {
      if (slideContainer.current) {
        if (width > 600) slideContainer.current.style.width = "40rem";
        else slideContainer.current.style.width = "100%";
      }
    } else if (step.num === 3) {
      if (slideContainer.current) {
        if (width > 600) slideContainer.current.style.width = "50rem";
        else slideContainer.current.style.width = "100%";
      }
    }
  }, [step]);
};

export default useAnimateCard;
