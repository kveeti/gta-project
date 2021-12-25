import { ICar } from "../interfaces/Car";
import { IGarage } from "../interfaces/Garage";

export interface InitState {
  bp: number;

  search: {
    input: {
      value: string;
      isEmpty: boolean;
    };

    cars: ICar[];
    garages: IGarage[];

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
      cars: ICar[];
      garages: IGarage[];
      carCount: number;
      garageCount: number;
    };

    api: {
      loading: boolean;
      error: boolean;
    };
  };

  checkedCars: ICar[];

  new: {
    car: {
      api: {
        saving: boolean;
        error: boolean;
      };

      inputs: {
        car: string;
        garage: string;
      };

      chosenCar: ICar | null;
      chosenGarage: IGarage | null;

      cars: {
        matching: ICar[];
        api: {
          loading: boolean;
          error: boolean;
        };
      };
      garages: {
        matching: IGarage[];
        api: {
          loading: boolean;
          error: boolean;
        };
      };
    };
    garage: {
      api: {
        saving: boolean;
        error: boolean;
      };

      inputs: {
        garage: string;
        desc: string;
      };

      chosenGarage: IGarage | null;

      garages: {
        matching: IGarage[];
        api: {
          loading: boolean;
          error: boolean;
        };
      };
    };
  };
}

export const initState: InitState = {
  bp: 3,

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

  checkedCars: [],

  new: {
    car: {
      api: {
        saving: false,
        error: false,
      },

      inputs: {
        car: "",
        garage: "",
      },

      chosenCar: null,
      chosenGarage: null,

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
    garage: {
      api: {
        saving: false,
        error: false,
      },

      inputs: {
        garage: "",
        desc: "",
      },

      chosenGarage: null,

      garages: {
        matching: [],
        api: {
          loading: false,
          error: false,
        },
      },
    },
  },
};
