export const loadState = () => {

  try {

    let unserialisedState = localStorage.getItem("state");

    console.log(unserialisedState);

    if(unserialisedState === null) {
      return undefined;
    }

    return JSON.parse(unserialisedState);

  } catch (err) {
    return undefined;
  }

};


export const saveState = (state) => {

  try {
    localStorage.setItem("state", JSON.stringify(state))
  } catch (err) {
    console.error(err);
  }

};