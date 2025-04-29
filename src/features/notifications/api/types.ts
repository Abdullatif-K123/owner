import { PaginationParams } from "../../../types/api";

export type NotificationGetALlParams = PaginationParams & {
  isGeneral: boolean;
};

export type Notification = {
  id: string;
  date: string;
  title: string;
  body: string;
  objectId: string;
  notificationType: NotificationType;
  userCount: number;
  isRead: boolean;
};

export type NotificationReadParams =
  | {
      isAll: false;
      notificationUserId: string;
    }
  | {
      isAll: true;
      isGeneral: boolean;
    };
export enum NotificationType {
  General,
  TourAccepted,
  TourArriver,
  TourDeparture,
  NewTour,
  TourCanceled,
  TourRate,
  Information,
}
export type FirebaseData = {
  Id: string;
  title: string;
  body: string;
  NotificationType: keyof typeof NotificationType;
};
