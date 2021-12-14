import { constants } from "../actionTypes";
import { initState } from "../InitState";

const reducer = (state = initState.new.car, action: any) => {
  switch (action.type) {
    /*
    INPUTS
    */
    case constants.new.car.set.input.CAR:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          car: action.payload,
        },
      };

    case constants.new.car.set.input.GARAGE:
      return {
        ...state,
        inputs: {
          ...state.inputs,
          garage: action.payload,
        },
      };

    /*
    CHOSEN
    */
    case constants.new.car.set.chosen.CAR:
      return {
        ...state,
        chosenCar: action.payload,
      };

    case constants.new.car.set.chosen.GARAGE:
      return {
        ...state,
        chosenGarage: action.payload,
      };

    /*
    MODEL
    */
    case constants.new.car.set.model.cars.MATCHING:
      return {
        ...state,
        model: {
          ...state.model,
          cars: {
            ...state.model.cars,
            matching: action.payload,
          },
        },
      };

    case constants.new.car.set.model.garages.MATCHING:
      return {
        ...state,
        model: {
          ...state.model,
          garages: {
            ...state.model.garages,
            matching: action.payload,
          },
        },
      };

    case constants.new.car.set.model.cars.api.LOADING:
      return {
        ...state,
        model: {
          ...state.model,
          cars: {
            ...state.model.cars,
            api: {
              ...state.model.cars.api,
              loading: action.payload,
            },
          },
        },
      };

    case constants.new.car.set.model.cars.api.ERROR:
      return {
        ...state,
        model: {
          ...state.model,
          cars: {
            ...state.model.cars,
            api: {
              ...state.model.cars.api,
              error: action.payload,
            },
          },
        },
      };

    case constants.new.car.set.model.garages.api.LOADING:
      return {
        ...state,
        model: {
          ...state.model,
          garage: {
            ...state.model.garages,
            api: {
              ...state.model.garages.api,
              loading: action.payload,
            },
          },
        },
      };

    case constants.new.car.set.model.garages.api.ERROR:
      return {
        ...state,
        model: {
          ...state.model,
          garage: {
            ...state.model.garages,
            api: {
              ...state.model.garages.api,
              error: action.payload,
            },
          },
        },
      };

    /*
    RESET
    */
    case constants.new.car.RESET:
      return initState.new.car;

    /*
    DIALOG
    */
    case constants.new.car.set.dialog.OPEN:
      return {
        ...state,
        dialog: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
