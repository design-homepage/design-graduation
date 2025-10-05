import { Router } from '@/router';
import { ModalProvider } from './contexts/ModalContext';

const App = () => {
  return (
    <ModalProvider>
      <Router />
    </ModalProvider>
  );
};

export default App;
