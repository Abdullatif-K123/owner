import {
  Navigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

import useIsoToArabicDate from "@/hooks/useIsoToArabicDate";
import Loading from "@/components/feedback/Loading";
import safra from "./safraLogo.png";
import { Box } from "@mui/material";
import { TourCustomer } from "@/API/tour/types";
import branchQueries from "@/API/branches/queries";
import { useEffect, useState } from "react";

const SecurityListPage = () => {
  const [searchParams] = useSearchParams();
  const [imagePreview, setImagePreview] = useState(safra);

  const branchId = searchParams.get("branchId");
  const name = searchParams.get("name");
  const date = searchParams.get("date");
  const bus = searchParams.get("bus");
  const driverName = searchParams.get("busDriver");
  const driverBro = searchParams.get("busBro");
  const formattedDate = useIsoToArabicDate(date ?? "");
  const formatDate = (dateString) => {
    const [datePart] = dateString.split(",");
    return datePart.trim();
  };

  const dateLeave = formatDate(formattedDate);
  const namesArray = name ? name.split("-") : [];
  const fromdist = namesArray[0];
  const todist = namesArray[1];

  const { data } = branchQueries.useGetLogoQuery(branchId ?? "");
  useEffect(() => {
    if (data) {
      setImagePreview(`https://file.dev.safra-binakra.com/wwwroot/${data}`);
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [data]);
  if (!data) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const { state } = useLocation();
  const { id } = useParams();
  if (!state) return <Navigate to={id ? `/security-list/${id}` : "/tours"} />;

  return (
    <Box
      sx={{
        "@media print": {
          fontSize: "10px",
          margin: "0",
          padding: "0px",
          lineHeight: "1.2",
          img: {
            maxHeight: "6em", // Smaller image for printing
          },
          table: {
            fontSize: "9px", // Smaller table text
            borderCollapse: "collapse",
            width: "100%",
          },
          th: {
            padding: "2px 5px",
          },
          td: {
            padding: "2px 5px",
          },
          h1: {
            fontSize: "1.2em", // Smaller header
          },
          ".flex-container": {
            flexWrap: "wrap", // Wrap long flex layouts
            gap: "10px", // Adjust spacing
          },
          ".avoid-break": {
            pageBreakInside: "avoid", // Keep elements together
          },
        },
        background: "white",
        fontSize: "12px",
      }}
      style={{
        direction: "rtl",
        padding: "10px",
      }}
    >
      <span
        style={{
          fontWeight: "bold",
          display: "block",
          width: "fit-content",
          transform: "translateX(-66%)",
          marginInline: "auto",
          marginBottom: "2em",
          fontSize: "1.2em",
        }}
      >
        شوهد الباص في الكراج
      </span>
      <div style={{ position: "relative" }} className="avoid-break">
        <h1
          style={{
            fontSize: " 1.6em",
            padding: " 0.2em 0.4em",
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
            margin: "auto",
            borderRadius: "10px",
          }}
        >
          قائمة المسافرين
        </h1>
        <div
          style={{
            top: "50%",
            width: "calc(50% - 61px)",
            position: "absolute",
            textAlign: "center",
            transform: "translateY(-60%)",
          }}
        >
          <img
            style={{ maxWidth: "calc(100% - 20px)", maxHeight: "10em" }}
            src={imagePreview}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: "2.5em",
          display: "flex",
          justifyContent: "spaceBetween",
          gap: "0px",
          marginBottom: "5px",
        }}
        className="flex-container avoid-break"
      >
        <div
          style={{ flex: "1", display: "flex", gap: "5px", fontSize: "13px" }}
        >
          <span style={{ fontWeight: "bold" }}>رقم المركبة:</span>
          <span style={{ borderBottom: "1px dotted", flex: 1 }}>{bus}</span>
        </div>
        <div
          style={{ flex: "1", display: "flex", gap: "5px", fontSize: "13px" }}
        >
          <span style={{ fontWeight: "bold" }}>السائق:</span>
          <span style={{ borderBottom: "1px dotted", flex: 1 }}>
            {driverName}
          </span>
        </div>
        <div
          style={{ flex: "1", display: "flex", gap: "5px", fontSize: "13px" }}
        >
          <span style={{ fontWeight: "bold" }}>التاريخ:</span>
          <span style={{ borderBottom: "1px dotted", flex: 1 }}>
            {dateLeave}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "spaceBetween",
          gap: "30px",
          fontSize: "13px",
        }}
      >
        <div style={{ flex: "1", display: "flex", gap: "5px" }}>
          <span style={{ fontWeight: "bold" }}>من:</span>
          <span style={{ borderBottom: "1px dotted", flex: 1 }}>
            {fromdist}
          </span>
        </div>

        <div
          style={{ flex: "1", display: "flex", gap: "5px", fontSize: "13px" }}
        >
          <span style={{ fontWeight: "bold" }}>إلى:</span>
          <span style={{ borderBottom: "1px dotted", flex: 1 }}>{todist}</span>
        </div>
        <div style={{ flex: "1", display: "flex", gap: "5px" }}>
          <span style={{ fontWeight: "bold" }}>المرافق:</span>
          <span style={{ borderBottom: "1px dotted", flex: 1 }}>
            {driverBro}
          </span>
        </div>
        <div style={{ flex: "1", display: "flex", gap: "5px" }}>
          <span style={{ fontWeight: "bold" }}>ساعة المغادرة:</span>
          <span style={{ borderBottom: "1px dotted", flex: 1 }}></span>
        </div>
      </div>
      <table
        style={{
          marginTop: "15px",
          border: "1px solid black",
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          fontSize: "0.9em",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}></th>
            <th style={{ border: "1px solid black" }}>الاسم والشهرة</th>
            <th style={{ border: "1px solid black" }}>اسم الأب</th>
            <th style={{ border: "1px solid black" }}>اسم الأم</th>
            <th style={{ border: "1px solid black" }}>تولد</th>
            <th style={{ border: "1px solid black" }}>رقم الهوية</th>
            <th style={{ border: "1px solid black" }}>مكان القيد</th>
            <th style={{ border: "1px solid black" }}>الملصوقة رقم</th>
          </tr>
        </thead>
        <tbody>
          {(state as TourCustomer[]).map((item, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid black" }}>{idx + 1}</td>
              <td style={{ border: "1px solid black", textAlign: "right" }}>
                {item.firstName} {item.lastName}
              </td>
              <td style={{ border: "1px solid black" }}>{item.fatherName}</td>
              <td style={{ border: "1px solid black" }}>{item.motherName}</td>
              <td style={{ border: "1px solid black" }}>
                {item.birthDate === "0001-01-01T00:00:00"
                  ? ""
                  : useIsoToArabicDate(item.birthDate, "dd/MM/yyyy")}
              </td>
              <td style={{ border: "1px solid black" }}>
                {item.nationalNumber}
              </td>
              <td style={{ border: "1px solid black" }}>{item.city}</td>
              <td style={{ border: "1px solid black" }}></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ margin: "10px 0 0", fontWeight: "bold" }}>السائق</p>
          <p style={{ margin: "10px 0 0" }}></p>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ margin: "10px 0 0", fontWeight: "bold" }}>الموظف</p>
          <p style={{ margin: "10px 0 0" }}></p>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <p style={{ margin: "10px 0 0", fontWeight: "bold" }}>المرافق</p>
          <p style={{ margin: "10px 0 0" }}></p>
        </div>
      </div>
    </Box>
  );
};

export default SecurityListPage;
