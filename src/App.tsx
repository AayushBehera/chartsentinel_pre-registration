/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Background } from './components/Background';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Terminal } from './pages/Terminal';
import { Screening } from './pages/Screening';
import { Interrogation } from './pages/Interrogation';
import { Pipeline } from './pages/Pipeline';
import { Trust } from './pages/Trust';
import { Success } from './pages/Success';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-[#d946ef] selection:text-white font-sans relative">
        <Background />
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/screening" element={<Screening />} />
          <Route path="/interrogation" element={<Interrogation />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </div>
    </Router>
  );
}
