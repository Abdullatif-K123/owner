export enum Gender {
  Male,
  Female,
}
export enum RecordType {
  Pending,
  Accepted,
  Rejected,
}
export enum TourStatus {
  Finished,
  Ongoing,
  UpComing,
}

export enum BookingType {
  App,
  Office,
}

export const BookingTypeAr: { [key: string]: string } = {
  App: "من التطبيق",
  Office: "من المكتب",
};

export enum PaidType {
  UnPaid,
  Paid,
}

export enum UserKind {
  Owner = "Owner",
  OwnerStaff = "OwnerStaff",
  BranchManager = "BranchManager",
}

export enum FinanceType {
  AtCash,
  AtManager,
  AtOwner,
}

export enum PaymentType {
  Office,
  App,
  Mtn,
  Syr,
  Fatora,
}
