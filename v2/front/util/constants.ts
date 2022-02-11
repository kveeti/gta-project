export const msgs = {
  error: {
    failedServerConnection: "Failed connecting to the server, please try again later.",
    serverError: "Server error, please try again later.",
    somethingWentWrong: "Something went wrong, no changes were made.",

    fillAllFields: "Please fill all fields.",
    passNoMatch: "Passwords do not match.",

    noCarsSelected: "No cars selected",
    noGarageSelected: "No garage selected",

    nothingChanged: "Nothing has changed",
  },

  success: {
    carAdded: {
      singular: "Car added successfully!",
      plural: "Cars added successfully!",
    },
    carMoved: {
      singular: "Car moved successfully!",
      plural: "Cars moved successfully!",
    },
    carDeleted: {
      singular: "Car deleted successfully!",
      plural: "Cars deleted successfully!",
    },

    modelCarUpdated: "Model car updated successfully!",

    garageAdded: "Garage added successfully!",
    garageDeleted: "Garage deleted successfully!",
    garageUpdated: "Garage updated successfully!",

    passChanged: "Password changed successfully!",
  },
};

export const paths = {
  home: () => "/",

  newCar: () => "/new/cars",
  newGarage: () => "/new/garage",

  garagePage: (id: string) => `/garage/${id}`,

  profile: () => "/me",
  deleteAccount: () => "/me/delete",
  changeEmail: () => "/me/change/email",
  changePassword: () => "/me/change/password",

  signin: () => "/signin",
  register: () => "/register",

  initPasswordReset: () => "/init-password-reset",

  mgmtModelCarIndex: () => `/management/model-cars`,
  mgmtModelCarNew: () => `/management/model-cars/new`,
  mgmtModelCarEdit: (carId: string) => `/management/model-cars/${carId}`,

  mgmtModelGarageIndex: () => `/management/model-garages`,
  mgmtModelGarageNew: () => `/management/model-garages/new`,
  mgmtModelGarageEdit: (garageId: string) => `/management/model-garages/${garageId}`,
};
