import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import MainLayout from './components/layout/MainLayout.jsx';
import DashboardSG from './pages/sg/DashboardSG.jsx';
import CourriersEntrantsSG from './pages/sg/CourriersEntrantsSG.jsx';
import CourriersSortantsSG from './pages/sg/CourriersSortantsSG.jsx';
import RedactionCourrierSG from './pages/sg/RedactionCourrierSG.jsx';
import DashboardRSC from './pages/scc/DashboardRSC.jsx';
import RechercheAvancee from './pages/recherche/RechercheAvancee.jsx';
import StructurePage from './pages/structure/StructurePage.jsx';
import StatistiquesPage from './pages/statistiques/StatistiquesPage.jsx';
import EcheancesPage from './pages/echeances/EcheancesPage.jsx';
import ActesPage from './pages/actes/ActesPage.jsx';
import TransmissionsPage from './pages/transmissions/TransmissionsPage.jsx';
import MonParametragePage from './pages/parametrage/MonParametragePage.jsx';
import ArriveesPage from './pages/scc/ArriveesPage.jsx';
import DepartsPage from './pages/scc/DepartsPage.jsx';
import DispatchPage from './pages/scc/DispatchPage.jsx';
import ScanPage from './pages/scc/ScanPage.jsx';
import LiaisonsPage from './pages/scc/LiaisonsPage.jsx';
import DashboardDG from './pages/dg/DashboardDG.jsx';
import ASignerPage from './pages/dg/ASignerPage.jsx';
import AValiderPage from './pages/dg/AValiderPage.jsx';
import ConfidentielPage from './pages/dg/ConfidentielPage.jsx';
import RejetesPage from './pages/dg/RejetesPage.jsx';
import ActesSignesPage from './pages/dg/ActesSignesPage.jsx';
import EcheancesDgPage from './pages/dg/EcheancesDgPage.jsx';
import DashboardLiaison from './pages/liaison/DashboardLiaison.jsx';
import TourneesPage from './pages/liaison/TourneesPage.jsx';
import ARemettrePage from './pages/liaison/ARemettrePage.jsx';
import RemisesPage from './pages/liaison/RemisesPage.jsx';
import EnAttentePage from './pages/liaison/EnAttentePage.jsx';
import PlanningPage from './pages/liaison/PlanningPage.jsx';
import DechargesPage from './pages/liaison/DechargesPage.jsx';

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<MainLayout />}>
                <Route path="/sg/dashboard" element={<DashboardSG />} />
                <Route path="/sg/courriers-entrants" element={<CourriersEntrantsSG />} />
                <Route path="/sg/courriers-sortants" element={<CourriersSortantsSG />} />
                <Route path="/sg/courriers-sortants/:id" element={<RedactionCourrierSG />} />
                <Route path="/sg/recherche-avancee" element={<RechercheAvancee />} />
                <Route path="/sg/structures" element={<StructurePage />} />
                <Route path="/sg/statistiques" element={<StatistiquesPage />} />
                <Route path="/sg/echeances" element={<EcheancesPage />} />
                <Route path="/sg/transmissions" element={<TransmissionsPage />} />
                <Route path="/sg/parametrage" element={<MonParametragePage />} />
                <Route path="/sg/actes" element={<ActesPage />} />

                <Route path="/scc/dashboard" element={<DashboardRSC />} />
                <Route path="/scc/arrivees" element={<ArriveesPage />} />
                <Route path="/scc/departs" element={<DepartsPage />} />
                <Route path="/scc/dispatch" element={<DispatchPage />} />
                <Route path="/scc/scan" element={<ScanPage />} />
                <Route path="/scc/liaisons" element={<LiaisonsPage />} />

                <Route path="/dg/dashboard" element={<DashboardDG />} />
                <Route path="/dg/a-signer" element={<ASignerPage />} />
                <Route path="/dg/a-valider" element={<AValiderPage />} />
                <Route path="/dg/confidentiel" element={<ConfidentielPage />} />
                <Route path="/dg/rejetes" element={<RejetesPage />} />
                <Route path="/dg/actes-signes" element={<ActesSignesPage />} />
                <Route path="/dg/echeances" element={<EcheancesDgPage />} />

                <Route path="/liaison/dashboard" element={<DashboardLiaison />} />
                <Route path="/liaison/tournees" element={<TourneesPage />} />
                <Route path="/liaison/a-remettre" element={<ARemettrePage />} />
                <Route path="/liaison/remises" element={<RemisesPage />} />
                <Route path="/liaison/en-attente" element={<EnAttentePage />} />
                <Route path="/liaison/planning" element={<PlanningPage />} />
                <Route path="/liaison/decharges" element={<DechargesPage />} />


            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}