import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import useSuccessSnackbar from "../../../hooks/useSuccessSnackbar";
import useDateToIso from "@/hooks/useDateToIso";

type Props = {
  isScanning: boolean;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  setFirstName: (s: string) => void;
  setLastname: (s: string) => void;
  setNationalNumber: (s: string) => void;
  setFatherName: (s: string) => void;
  setMotherName: (s: string) => void;
  setRegistration: (s: string) => void;
  setBirthDate: (s: string) => void;
};

const BarcodeReader = ({
  isScanning,
  setIsScanning,
  setFirstName,
  setLastname,
  setFatherName,
  setMotherName,
  setRegistration,
  setBirthDate,
  setNationalNumber,
}: Props) => {
  // const [isScanning, setIsScanning] = useState(false);
  const succesSnackbar = useSuccessSnackbar();

  const ref = useRef<HTMLInputElement>(null);

  const eventHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value: string = (e.target as any).value;
    // extra check.. if there is no one '#' at least it may be a keyboard typing, do nothing
    // if (!value.includes("#")) return;

    const dataArray = value.split("#");
    // We can wait until the array has all the elements and then set the values:
    // if (dataArray.length > 6) {
    //   setFirstName(dataArray[0]);
    //   setLastname(dataArray[1]);
    //   setNationalNumber(dataArray[5]);
    //   e.currentTarget.blur();
    //   succesSnackbar("تمت قراءة البيانات بنجاح");
    // }
    if (isScanning) {
      // But we did it this way to make the user see that we are reading the data:
      if (dataArray[0]) setFirstName(dataArray[0]);
      if (dataArray[1]) setLastname(dataArray[1]);
      if (dataArray[2]) setFatherName(dataArray[2]);
      if (dataArray[3]) setMotherName(dataArray[3]);
      // removing the city from it
      let birthDate = new Date();
      if (dataArray[4]) {
        const arr = dataArray[4].split(" ");
        let reversedBirthPlace = "";
        for (let i = arr.length - 1; i >= 0; i--) {
          if (i === arr.length - 1) {
            var date = arr[i].split("-");
            var stringDate = date[1] + "-" + date[0] + "-" + date[2];
            birthDate = new Date(stringDate);
            console.log(birthDate);
          } else {
            reversedBirthPlace += arr[i] + " ";
          }
        }
        const birthPlace = reversedBirthPlace.split(" ").reverse().join(" ");
        setBirthDate(useDateToIso(birthDate.toString()));
        setRegistration(birthPlace);
      }
      if (dataArray[5]) setNationalNumber(dataArray[5]);
      if (dataArray.length > 6) {
        e.currentTarget.blur();
        succesSnackbar("تمت قراءة البيانات بنجاح");
      }
    }
  };

  useEffect(() => {
    ref.current?.focus();
    setIsScanning(true);
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          ref.current?.focus();
          setIsScanning(true);
        }}
        variant="contained"
        disabled={isScanning}
      >
        {isScanning ? "في انتظار المسح..." : "مسح البيانات بالباركود"}
      </Button>
      <input
        style={{ opacity: 0 }}
        ref={ref}
        onInput={eventHandler}
        onBlur={(e) => {
          setIsScanning(false);
          e.target.value = "";
        }}
      />
    </>
  );
};

export default BarcodeReader;
