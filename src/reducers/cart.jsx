export const cartInitialState = JSON.parse(localStorage.getItem("cart")) || [];

export const CAR_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};
export const updateLocalStorage = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};

const UPDATE_STATE_BY_ACTIONS = {
  [CAR_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload;
    const productInCartIndex = state.findIndex((item) => item.id === id);

    if (productInCartIndex >= 0) {
      //USANDO structuredCLone
      //   const newState = structuredClone(state);
      //   newState[productInCartIndex].quantity += 1;

      //usando el map
    //   const newState = state.map((item) => {
    //     if (item.id === id) {
    //       return {
    //         ...item,
    //         quantity: item.quantity + 1,
    //       };
    //     }
    //   });
      
      //  usando el spread operatory slice
      const newState = [
        ...state.slice(0,productInCartIndex),
        {...state[productInCartIndex], quantity: state[productInCartIndex].quantity+1},
        ...state.slice(productInCartIndex+1)
      ]
      updateLocalStorage(newState);
      return newState;
    }
    const newState = [
      ...state,
      {
        ...action.payload,
        quantity: 1,
      },
    ];
    updateLocalStorage(newState);
    return newState;
  },
  [CAR_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload;
    const newState = state.filter((item) => item.id !== id);
    updateLocalStorage(newState);
    return newState;
  },
  [CAR_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([]);
    return [];
  },
};

export const cartReducer = (state, action) => {
  const { type: actionType } = action;

  const updateState = UPDATE_STATE_BY_ACTIONS[actionType];
  return updateState ? updateState(state, action) : state;
};
