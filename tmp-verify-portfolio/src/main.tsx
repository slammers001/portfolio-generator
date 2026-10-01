import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { answers } from './answers';
import './theme.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Missing #root element in index.html');
}

createRoot(container).render(
  <StrictMode>
    <App answers={answers} />
  </StrictMode>
);
