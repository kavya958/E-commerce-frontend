import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// ❌ REMOVE or COMMENT THIS LINE
// import { AppProvider } from "./Context/Context.jsx";

// ❌ REMOVE or COMMENT THIS LINE
// Wrap with AppProvider only if context is used
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <AppProvider>
//       <App />
//     </AppProvider>
//   </React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);