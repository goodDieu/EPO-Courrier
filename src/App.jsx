import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import { ToastViewport } from './components/ui/Toast.jsx';
import { SccProvider } from './data/SccStore.jsx';
import { CircuitProvider } from './data/CircuitStore.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
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
import RemisesPage from './pages/liaison/RemisesPage.jsx';
import EnAttentePage from './pages/liaison/EnAttentePage.jsx';
import PostVisaPage from './pages/sp-dg/PostVisaPage.jsx';
import DashboardSPDG from './pages/sp-dg/DashboardSPDG.jsx';
import CourriersRecusPage from './pages/sp-dg/CourriersRecusPage.jsx';
import IntroductionPage from './pages/sp-dg/IntroductionPage.jsx';
import DashboardSPSG from './pages/sp-sg/DashboardSPSG.jsx';
import CourriersRecusSgPage from './pages/sp-sg/CourriersRecusSgPage.jsx';
import IntroductionSgPage from './pages/sp-sg/IntroductionSgPage.jsx';
import TriPage from './pages/sp-sg/TriPage.jsx';
import SuiviPage from './pages/sp-sg/SuiviPage.jsx';
import InstructionsPage from './pages/sp-sg/InstructionsPage.jsx';

export default function App() {
    // Les données de démonstration sont au-dessus des routes : elles restent
    // quand on se déconnecte pour changer de profil (sans recharger la page).
    return (
        <SccProvider>
        <CircuitProvider>
        <ToastViewport />
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />

            <Route path="/" element={<Navigate to="/login" replace />} />

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
                <Route path="/liaison/a-remettre" element={<Navigate to="/liaison/tournees" replace />} />
                <Route path="/liaison/remises" element={<RemisesPage />} />
                <Route path="/liaison/en-attente" element={<EnAttentePage />} />
                <Route path="/liaison/planning" element={<Navigate to="/liaison/tournees" replace />} />
                <Route path="/liaison/decharges" element={<Navigate to="/liaison/remises" replace />} />


                <Route path="/sp_sg/dashboard" element={<DashboardSPSG />} />
                <Route path="/sp_sg/courriers-recus" element={<CourriersRecusSgPage />} />
                <Route path="/sp_sg/introduction" element={<IntroductionSgPage />} />
                <Route path="/sp_sg/tri" element={<TriPage />} />
                <Route path="/sp_sg/suivi" element={<SuiviPage />} />
                <Route path="/sp_sg/instructions" element={<InstructionsPage />} />




                <Route path="/sp_dg/post-visa" element={<PostVisaPage />} />
                <Route path="/sp_dg/dashboard" element={<DashboardSPDG />} />
                <Route path="/sp_dg/courriers-recus" element={<CourriersRecusPage />} />
                <Route path="/sp_dg/introduction" element={<IntroductionPage />} />




            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </CircuitProvider>
        </SccProvider>
    );
}