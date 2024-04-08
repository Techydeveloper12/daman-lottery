import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Activity from './Pages/Activity';
import Promotion from './Pages/Promotion';
import Account from './Pages/Account';
import Wallet from './Pages/Wallet';
import Head from './Game/Head'
import LotteryApp from './Game/5d';
import LotteryAppk from './Game/K3';
import LotteryAppt from './Game/Trx';
import { useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Timer from './Components/Timer';
import WinGo from './Admin/Components/WinGo';
import Members from './Admin/Components/Member';
import PasswordProtectedRoute from './Components/Hoc';
import Level from './Admin/Components/Level';
import Salary from './Admin/Components/Salary';
import RechargeMain from './Components/RechargeMain';
import WithdrawMain from './Components/WithDrawMain';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Withdraw from './Admin/Components/Withdraw';
import DepositRequest from './Admin/Components/DepositRequest';
import DepositHistory from './Pages/DepositHistory';
import BetHistory from './Pages/BetHistory';
import WithdrawHistory from './Pages/WithdrawHistory';
import Transaction from './Pages/Transaction';
import CommisionDetailsMain from './Components/CommisionDetailsMain';
import SubordinateDataMain from './Components/SubordinateDataMain';
import Coupen from './Admin/Components/coupen';
import CoupenUser from './Pages/CoupenUser';
import Search from './Admin/Components/Search';
import Invite from './Pages/Invite';
import PaymentComponent from './Components/WowPayment';
import InvitiationRules from './Pages/InvitiationRules';
import Messages from './Pages/Messages';
import Settings from './Pages/Settings'
import Language from './Pages/Language'

const App = () => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/members" element={
          <PasswordProtectedRoute>
            <Members />
          </PasswordProtectedRoute>
        } />
        <Route path="/wingo" element={
          <PasswordProtectedRoute>
            <WinGo />
          </PasswordProtectedRoute>
        } />
        <Route path="/deposit-request" element={
          <PasswordProtectedRoute>
            <DepositRequest />
          </PasswordProtectedRoute>
        } />
        <Route path="/coupen" element={
          <PasswordProtectedRoute>
            <Coupen />
          </PasswordProtectedRoute>
        } />
        <Route path="/level" element={
          <PasswordProtectedRoute>
            <Level />
          </PasswordProtectedRoute>
        } />
        <Route path="/withdraw-request" element={
          <PasswordProtectedRoute>
            <Withdraw />
          </PasswordProtectedRoute>
        } />
        <Route path="/salary" element={
          <PasswordProtectedRoute>
            <Salary />
          </PasswordProtectedRoute>
        } />

        <Route path="/search" element={
          <PasswordProtectedRoute>
            <Search />
          </PasswordProtectedRoute>
        } />

        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activity" element={isAuthenticated ? <Activity /> : <Navigate to="/login" />} />
        <Route path="/coupen-user" element={isAuthenticated ? <CoupenUser /> : <Navigate to="/login" />} />
        <Route path="/transaction" element={isAuthenticated ? <Transaction /> : <Navigate to="/login" />} />
        <Route path="/5d" element={isAuthenticated ? <LotteryApp /> : <Navigate to="/login" />} />
        <Route path="/k3" element={isAuthenticated ? <LotteryAppk /> : <Navigate to="/login" />} />
        <Route path="/trx" element={isAuthenticated ? <LotteryAppt /> : <Navigate to="/login" />} />
        <Route path="/subordinate-data" element={isAuthenticated ? <SubordinateDataMain /> : <Navigate to="/login" />} />
        <Route path="/commision-details" element={isAuthenticated ? <CommisionDetailsMain /> : <Navigate to="/login" />} />
        <Route path="/bet-history" element={isAuthenticated ? <BetHistory /> : <Navigate to="/login" />} />
        <Route path="/deposit-history" element={isAuthenticated ? <DepositHistory /> : <Navigate to="/login" />} />
        <Route path="/withdraw-history" element={isAuthenticated ? <WithdrawHistory /> : <Navigate to="/login" />} />
        <Route path="/withdraw" element={isAuthenticated ? <WithdrawMain /> : <Navigate to="/login" />} />
        <Route path="/recharge" element={isAuthenticated ? <RechargeMain /> : <Navigate to="/login" />} />
        <Route path="/promotion" element={isAuthenticated ? <Promotion /> : <Navigate to="/login" />} />
        <Route path="/account" element={isAuthenticated ? <Account /> : <Navigate to="/login" />} />
        <Route path="/wallet" element={isAuthenticated ? <Wallet /> : <Navigate to="/login" />} />
        <Route path="/Head" element={isAuthenticated ? <Head /> : <Navigate to="/login" />} />
        <Route path="/invite" element={isAuthenticated ? <Invite /> : <Navigate to="/login" />} />
        <Route path="/payment" element={isAuthenticated ? <PaymentComponent /> : <Navigate to="/login" />} />
        <Route path="/invitation-rules" element={isAuthenticated ? <InvitiationRules /> : <Navigate to="/login" />} />
        <Route path="/messages" element={isAuthenticated ? <Messages /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/language" element={isAuthenticated ? <Language /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;