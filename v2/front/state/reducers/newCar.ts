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
    API
    */
    case constants.new.car.set.api.SAVING:
      return {
        ...state,
        api: {
          ...state.api,
          saving: action.payload,
        },
      };

    case constants.new.car.set.api.ERROR:
      return {
        ...state,
        api: {
          ...state.api,
          error: action.payload,
        },
      };

    /*
    MODEL
    */
    case constants.new.car.set.cars.MATCHING:
      return {
        ...state,
        cars: {
          ...state.cars,
          matching: action.payload,
        },
      };

    case constants.new.car.set.garages.MATCHING:
      return {
        ...state,
        garages: {
          ...state.garages,
          matching: action.payload,
        },
      };

    case constants.new.car.set.cars.api.LOADING:
      return {
        ...state,
        cars: {
          ...state.cars,
          api: {
            ...state.cars.api,
            loading: action.payload,
          },
        },
      };

    case constants.new.car.set.cars.api.ERROR:
      return {
        ...state,
        cars: {
          ...state.cars,
          api: {
            ...state.cars.api,
            error: action.payload,
          },
        },
      };

    case constants.new.car.set.garages.api.LOADING:
      return {
        ...state,
        garages: {
          ...state.garages,
          api: {
            ...state.garages.api,
            loading: action.payload,
          },
        },
      };

    case constants.new.car.set.garages.api.ERROR:
      return {
        ...state,
        garages: {
          ...state.garages,
          api: {
            ...state.garages.api,
            error: action.payload,
          },
        },
      };

    /*
    RESET
    */
    case constants.new.car.RESET:
      return initState.new.car;

    default:
      return state;
  }
};

export default reducer;
