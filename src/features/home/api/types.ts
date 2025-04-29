export type HomeGet = {
  upComingTours: {
    pageNumber: number;
    totalPages: number;
    totalDataCount: number;
    data: [
      {
        id: string;
        tourStatus: number;
        name: string;
        branchName: string;
        leaveDate: string;
        arriveDate: string;
        rate: number;
        ratedCustomerCount: number;
        cities: string[];
        chairsCount: number;
        chairsBlockedCount: number;
        chairsFreeCount: number;
      }
    ];
  };
  branches: [
    {
      id: string;
      name: string;
    }
  ];
  toursChart: {
    Weekly: number[];
    Monthly: number[];
    Year: number[];
  };
  notificationCount: number;
  isBlocked: boolean;
  recordType: number;
};

export type ToursChart = {
  Weekly: number[];
  Monthly: number[];
  Year: number[];
};
