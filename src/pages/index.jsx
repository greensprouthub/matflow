import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const Layout = lazy(() => import('./Layout.jsx'));
const Dashboard = lazy(() => import('./Dashboard'));
const Members = lazy(() => import('./Members'));

const PAGES = {
  Dashboard: Dashboard,
  Members: Members,
};

function _getCurrentPage(url) {
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  let urlLastPart = url.split('/').pop();
  if (urlLastPart.includes('?')) {
    urlLastPart = urlLastPart.split('?')[0];
  }

  const pageName = Object.keys(PAGES).find((page) => page.toLowerCase() === urlLastPart.toLowerCase());
  return pageName || Object.keys(PAGES)[0];
}

function PagesContent() {
  const location = useLocation();
  const currentPage = _getCurrentPage(location.pathname);

  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <Layout currentPageName={currentPage}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Members" element={<Members />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default function Pages() {
  return (
    <Router>
      <PagesContent />
    </Router>
  );
}