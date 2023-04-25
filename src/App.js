import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';

const initialState = {
  buttonData: {}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'BUTTON_CLICKED':
      const { buttonName } = action.payload;
      const clickCount = state.buttonData[buttonName]
        ? state.buttonData[buttonName].clickCount + 1
        : 1;
      return {
        ...state,
        buttonData: {
          ...state.buttonData,
          [buttonName]: { clickCount }
        }
      };
    default:
      return state;
  }
}

const store = createStore(rootReducer);

function Button({ name }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: 'BUTTON_CLICKED',
      payload: { buttonName: name }
    });
  };

  return <button onClick={handleClick}>{name}</button>;
}

function ButtonList() {
  const buttons = [];
  for (let i = 1; i <= 30; i++) {
    buttons.push(<Button key={i} name={`Button ${i}`} />);
  }
  return <div>{buttons}</div>;
}

function Table() {
  const buttonData = useSelector(state => state.buttonData);

  const rows = Object.keys(buttonData).map(buttonName => {
    const { clickCount } = buttonData[buttonName];
    return (
      <tr key={buttonName}>
        <td>{buttonName}</td>
        <td>{clickCount}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Button Name</th>
          <th>Click Count</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div>
        <ButtonList />
        <Table />
      </div>
    </Provider>
  );
}

export default App;
