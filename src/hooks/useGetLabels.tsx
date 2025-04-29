import { days, months } from "../constants/timestamps";

const useGetLabels = (data: number[]) => {
  let labels = [""];
  if (data.length === 12) {
    labels = months;
  } else if (data.length === 7) {
    labels = days;
  } else {
    const month = new Date().getMonth();
    labels = data.map(
      (_item: number, index: number) => `${index + 1}/${month + 1}`
    );
  }
  return labels;
};
export default useGetLabels;
