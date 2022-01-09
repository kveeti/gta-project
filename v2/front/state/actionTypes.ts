export const constants = {
  SET_BREAKPOINT: "SET_BREAKPOINT",

  search: {
    SET_INPUT: "SEARCH__SET_INPUT",

    SET_CARS: "SEARCH__SET_CARS",
    SET_GARAGES: "SEARCH__SET_GARAGES",

    api: {
      SET_LOADING: "SEARCH__API_SET_LOADING",
      SET_ERROR: "SEARCH__API_SET_ERROR",
      SET_NOT_FOUND: "SEARCH__API_SET_NOT_FOUND",
      RESET: "SEARCH__API_RESET",
    },
  },

  users: {
    SET_ME: "USERS__SET_ME",

    api: {
      SET_LOADING: "USERS__API_SET_LOADING",
      SET_ERROR: "USERS__API_SET_ERROR",
    },
  },

  checked: {
    SET_CHECKED_CARS: "CHECKED__SET_CHECKED_CARS",
    SET_SHOW: "CHECKED__SET_SHOW",
    CHECK_CAR: "CHECK__CAR",
    RESET: "RESET_CHECKED_CARS",
    removeApi: {
      REMOVING: "REMOVE_CHECKED_CARS__API_REMOVING",
      ERROR: "REMOVE_CHECKED_CARS__API_ERROR",
    },
  },

  move: {
    set: {
      GARAGE_INPUT: "MOVE__SET_GARAGE_INPUT",
      CHOSEN_GARAGE: "MOVE__SET_CHOSEN_GARAGE",
    },

    matchingGarages: {
      SET: "MOVE__MATCHING_GARAGES_SET",
      api: {
        SET_LOADING: "MOVE__MATCHING_GARAGES_API_SET_LOADING",
        SET_SUCCESS: "MOVE__MATCHING_GARAGES_API_SET_SUCCESS",
        SET_ERROR: "MOVE__MATCHING_GARAGES_API_SET_ERROR",
      },
    },

    api: {
      SET_SAVING: "MOVE__API_SET_SAVING",
      SET_SUCCESS: "MOVE__API_SET_SUCCESS",
      SET_ERROR: "MOVE__API_SET_ERROR",
    },

    RESET: "MOVE__RESET",
  },

  new: {
    car: {
      set: {
        chosen: {
          CAR: "NEW_CAR__SET_CHOSEN_CAR",
          GARAGE: "NEW_CAR__SET_CHOSEN_GARAGE",
        },
        cars: {
          MATCHING: "NEW_CAR__SET_MODEL_CARS_MATCHING",
          api: {
            LOADING: "NEW_CAR__SET_MODEL_CARS_API_LOADING",
            ERROR: "NEW_CAR__SET_MODEL_CARS_API_ERROR",
          },
        },
        garages: {
          MATCHING: "NEW_CAR__SET_MODEL_GARAGES_MATCHING",
          api: {
            LOADING: "NEW_CAR__SET_MODEL_GARAGES_API_LOADING",
            ERROR: "NEW_CAR__SET_MODEL_GARAGES_API_ERROR",
          },
        },
        input: {
          CAR: "NEW_CAR__SET_INPUT_CAR",
          GARAGE: "NEW_CAR__SET_INPUT_GARAGE",
        },

        api: {
          SAVING: "NEW_CAR__SET_API_SAVING",
          ERROR: "NEW_CAR__SET_API_ERROR",
        },
      },
      RESET: "NEW_CAR__RESET",
    },

    garage: {
      set: {
        CHOSEN_GARAGE: "NEW_GARAGE__SET_CHOSEN_GARAGE",

        garages: {
          MATCHING: "NEW_GARAGE__SET_MATCHING_GARAGES",
          api: {
            LOADING: "NEW_GARAGE__SET_MATCHING_GARAGES_API_LOADING",
            ERROR: "NEW_GARAGE__SET_MATCHING_GARAGES_API_ERROR",
          },
        },
        input: {
          GARAGE: "NEW_GARAGE__SET_INPUT_GARAGE",
          DESC: "NEW_GARAGE__SET_INPUT_DESC",
        },
        api: {
          SAVING: "NEW_GARAGE__SET_API_SAVING",
          ERROR: "NEW_GARAGE__SET_API_ERROR",
        },
      },
      RESET: "NEW_GARAGE__RESET",
    },
  },
};
