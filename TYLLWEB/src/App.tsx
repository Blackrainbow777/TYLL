/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StandardMode from './pages/StandardMode';
import AdvancedMode from './pages/AdvancedMode';
import ParentDashboard from './pages/ParentDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/standard" element={<StandardMode />} />
        <Route path="/advanced" element={<AdvancedMode />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
