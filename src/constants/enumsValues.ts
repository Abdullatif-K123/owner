export const recordTypesVal = ["قيد الانتظار", "مقبول", "مرفوض"];

export const tourStatusVal = ["منتهية", "جارية", "قادمة"];

type EnumTranslate = { [key: string]: { [key: number]: string } };

export const enumTourTranslate: EnumTranslate = {
  TourStatus: { 0: "منتهية", 1: "جارية", 2: "قادمة" },
  PaidType: { 0: "غير مدفوع", 1: "مدفوع" },
};

export const enumPaidTranslate = {};
