import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { HomePage } from './pages/HomePage';
import { RouteOptionsPage } from './pages/RouteOptionsPage';
import { ActiveRoutePage } from './pages/ActiveRoutePage';
import { ArrivalPage } from './pages/ArrivalPage';
import { FeedPage } from './pages/FeedPage';
import { NewOccurrencePage } from './pages/NewOccurrencePage';
import { PanicDialog } from './components/PanicDialog';

const AppShell: React.FC = () => {
  const { toast } = useApp();

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-[#e8e3ee] sm:p-4">
      {/* Viewport mobile-first 390×844 fiel ao Figma */}
      <div className="relative h-[100dvh] w-full overflow-hidden bg-white shadow-2xl sm:h-[844px] sm:max-h-[95dvh] sm:w-[390px] sm:rounded-[32px] sm:border sm:border-[#d8d1df]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rotas" element={<RouteOptionsPage />} />
          <Route path="/percurso" element={<ActiveRoutePage />} />
          <Route path="/chegada" element={<ArrivalPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/nova-ocorrencia" element={<NewOccurrencePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Modal de emergência acionado pelo botão Pânico da NavBar */}
        <PanicDialog />

        {/* Toast global acessível */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-none absolute inset-x-4 top-[88px] z-50 flex justify-center"
          >
            <div className="rounded-2xl bg-[#211d29] px-4 py-2.5 text-center text-[12.5px] font-medium text-white shadow-lg">
              {toast}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
