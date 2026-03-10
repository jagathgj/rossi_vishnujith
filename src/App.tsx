import { Theme } from '@carbon/react';
import IBMHeader from './Header';

const App = () => {
  return (
    <Theme theme="g100">
      <div className="container">
        <IBMHeader />
        <div className="wrapper">
          <h5>Carbon Template</h5>
        </div>
      </div>
    </Theme>
  );
};

export default App;