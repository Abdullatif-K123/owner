let API_ROUTES = {
  REGISTRATION: {
    root: "BasicRegistration",
    REGISTER: "RegisterMobileNumber",
    VERIFICATION: "RegisterVerficationCode",
    LOGOUT: "Logout",
    REMOVE_ACCOUNT: "DeleteAccount",
  },
  OWNER: {
    root: "Owner",
    FIRST_STEP_REGISTRATION: "FirstStepRegisteration",
    SECOND_STEP_REGISTRATION: "Register",
  },
  CITY: {
    root: "City",
    GET_ALL: "GetAll",
    GET_SELECT: "GetCitiesByCountry",
    GET: "GetDetails",
    ACTION: "Action",
    REMOVE: "Remove",
  },
  REGION: {
    root: "region",
    GET_REGION: "GetRegionsByCity",
  },
  BRANCH: {
    root: "Branch",
    GET: "GetBranchDetails",
    GET_ALL: "GetBranchs",
    GET_LOGO: "GetBranchLogo",
    PENDING_COUNTS: "GetPendingResultRealTime",
    GET_SELECT: "GetBranchsSelectByOwnerId",
    CHANCE_RECORD_TYPE: "ChangeRecordTypeBranch",
    REMOVE: "RemoveBranch",
    ACTION: "Action",
  },
  BUS: {
    root: "Bus",
    ACTION: "Action",
    GET_ALL: "GetBusess",
    GET: "GetBusDetails",
    BUSSES_SELECT: "GetSelectBuses",
    REMOVE: "RemoveBus",
  },
  MODEL: {
    root: "Model",
    GET_ALL: "GetAll",
  },
  TOUR: {
    root: "Tour",
    ACTION: "Action",
    GET_ALL: "GetAll",
    GET_DETAILS: "GetTourDetails",
    REMOVE: "Remove",
    Downloadfile: "ExportClientsToExcel",
    ChangeTime: "ChangeTime",
    ChangeBusName: "ChangeTime"
  },
  VIRTUAL_TOUR: {
    root: "VirtualTour",
    GET_ALL: "GetAll",
    GET_DETAILS: "GetDetails",
    REMOVE: "Remove",
    ACTION: "Action",
  },
  CUSTOMER_TOUR: {
    root: "Tour",
    GET: "GetTourDetailsForCustomer",
    GET_CUSTOMERS: "GetTourCustomersByTourId",
    GET_CUSTOMERS_LIST: "GetTourCustomersList",
    REMOVE_CUSTOMER: "RemoveCustomerFromTour",
    ACTION_CUSTOMER: "ActionCustomerInTour",
    ACTION_CUSTOMER_LIST: "ActionCustomerListInTour",
    GET_CUSTOMER_CHAIRS_REALTIME: "GetCustomerChairsRealTime",
    REFUND: "CancelBookingWithRefund",
  },
  NOTIFICATION: {
    root: "Notification",
    GET_ALL: "GetUserNotification",
    GET_COUNT: "GetUserNotificationCount",
    READ: "Read",
  },
  Home: {
    root: "Owner",
    GET_HOME_DATA: "getHomeData",
  },
  ACCOUNTING: {
    root: "Accounting",
    GET_ALL: "GetToursFinance",
    GET: "GetTourOwnerStaffs",
    GET_TOUR: "GetTourOwnerStaffDetails",
    ACTION: "ActionSandook",
    GET_BOXES_DETAILS: "GetTourSandookDetails",
    GET_GENERAL_BOXES: "GetGeneralSandook",
    RECIVE_GENERAL_BOXES: "RecievedGeneralSandook",
    GET_ANALYTICS: "GetToursFinanceAnalytcs",
    GET_RECIEVED: "GetRecievedTourAmount",
    GET_CASHED: "GetCashedTourAmount",
    CASHED_ACTION: "ActionCashedToursSandook",
    RECIEVED_ACTION: "ActionRecievedToursSandook",
    RECIEVE_TOURS: "FinishedTours",
    COMPANY_ALL: "GetFiannce",
    COMPANY_ALL_CASH: "GetFiannceCash",
    COMPANY_ACTION: "OwnerConfirm",
    COMPANY_DETAILS: "GetTourFiannce",
    REMOVE_SANDOOK_TOOR: "RemoveSandookTour",
    OWNER_RECIEVED_ACTION: "RecievedOwnerGeneralSandook",
    OWNER_FINISHED_ACTION: "FinishedOwnerGeneralSandook",
    GET_TOUR_SANDOOK_DETAILS_ASEXCEL: "GetTourSandookDetailsAsExcel",
    GET_TOUR_OWNER_STAFF_DETAILS_ASEXCEL: "GetTourOwnerStaffDetailsAsExcel", 
    GET_TOUR_OWNER_STAFFS_ASEXCEL: "GetTourOwnerStaffsAsExcel", 
    GET_TOUR_FINANCE_ASEXCEL: "GetToursFinanceAsExcel", 
    GET_GENERAL_SANDOOK_ASEXCEL: "GetGeneralSandookAsExcel"
  },
  OwnerStaff: {
    root: "OwnerStaff",
    LOGIN: "Login",
    GET_ALL: "GetOwnerStaffs",
    GET: "GetDetails",
    REMOVE: "Remove",
    ACTION: "Action",
    GET_SELECT: "GetOwnerStaffSelect",
  },
  Managers: {
    root: "OwnerStaff",
    GET_ALL: "GetBranchManagers",
    GET: "GetDetails",
    REMOVE: "Remove",
    ACTION: "ActionBranchManager",
    GET_SELECT: "GetBranchSelect",
  },
};

const controllersArr = Object.entries(API_ROUTES).map(
  ([controllerKey, { root, ...routes }]) => {
    const routesArr = Object.entries(routes);
    const routesPrefixed = Object.fromEntries(
      routesArr.map(([routeKey, route]) => [routeKey, `${root}/${route}`])
    );
    return [controllerKey, { ...routesPrefixed, root }];
  }
);
API_ROUTES = Object.fromEntries(controllersArr) as typeof API_ROUTES;

export default API_ROUTES;

// api/BasicRegistration/RegisterMobileNumber
