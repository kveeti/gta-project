import { Car } from "../interfaces/Car";
import { Garage } from "../interfaces/Garage";

export interface InitState {
  search: {
    input: {
      value: string;
      isEmpty: boolean;
    };

    cars: {
      cars: Car[];
    };

    garages: {
      garages: Garage[];
    };

    api: {
      loading: boolean;
      error: boolean;
      notFound: boolean;
    };
  };

  users: {
    me: {
      id: string;
      owner: string;
      email: string;
      cars: Car[];
      garages: Garage[];
      carCount: number;
      garageCount: number;
    };

    api: {
      loading: boolean;
      error: boolean;
    };
  };

  checked: {
    cars: string[];
    garages: string[];
  };

  new: {
    car: {
      inputs: {
        car: string;
        garage: string;
      };

      dialog: boolean;

      chosenCar: Car | null;
      chosenGarage: Garage | null;

      model: {
        cars: {
          matching: string[];
          api: {
            loading: boolean;
            error: boolean;
          };
        };
        garages: {
          matching: string[];
          api: {
            loading: boolean;
            error: boolean;
          };
        };
      };
    };

    garages: {
      chosenGarage: string | null;
      modelGarages: [];
      desc: string;
    };
  };
}

export const initState = {
  search: {
    input: {
      value: "",
      isEmpty: true,
    },

    cars: [],
    garages: [],

    api: {
      loading: false,
      error: false,
      notFound: false,
    },
  },

  users: {
    me: {
      id: null,
      owner: null,
      email: null,
      cars: [],
      garages: [],
      carCount: null,
      garageCount: null,
    },

    api: {
      loading: false,
      error: false,
    },
  },

  checked: {
    cars: [],
    garages: [],
  },

  new: {
    car: {
      inputs: {
        car: "",
        garage: "",
      },

      dialog: false,

      chosenCar: null,
      chosenGarage: null,

      model: {
        cars: {
          matching: [],
          api: {
            loading: false,
            error: false,
          },
        },
        garages: {
          matching: [],
          api: {
            loading: false,
            error: false,
          },
        },
      },
    },
    garage: {
      inputs: {
        garage: "",
        desc: "",
      },

      dialog: false,

      chosenGarage: null,
      modelGarages: [],
      desc: "",

      api: {
        loading: false,
        error: false,
      },
    },
  },
};
