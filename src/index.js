import React, { lazy, Suspense } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import './index.scss';
import withRouter from './withRouter';
// TODO: call all these with lazyRouter
import SupplierAddProduct from './pages/dashboard/SupplierAddProduct';
import SupplierDashboardOutlet from './pages/dashboard/SupplierDashboardOutlet';
import SupplierProductListingOutlet from './pages/dashboard/SupplierProductListingOutlet';
import TicketsPage from './pages/TicketsPage';
import SupplierProfileOutlet from './pages/dashboard/SupplierProfileOutlet';
import SupplierSubscriptionOutlet from './pages/dashboard/SupplierSubscriptionOutlet';
import SupplierInquiriesOutlet from './pages/dashboard/SupplierInquiriesOutlet';
import SupplierCampaignsOutlet from './pages/dashboard/SupplierCampaignsOutlet';
import MyDealsOutlet from './pages/my/MyDealsOutlet';
import MyInquiriesOutlet from './pages/my/MyInquiriesOutlet';
import MyFavoritesOutlet from './pages/my/MyFavoritesOutlet';
import MyProfileOutlet from './pages/my/MyProfileOutlet';
import SupplierListingOutlet from './pages/my/SupplierListingOutlet';
import { ModalProvider } from './service/ModalService';


const lazyWithRouter = (importFunc) =>
  lazy(() =>
    importFunc().then((module) => ({
      default: withRouter(module.default),
    }))
  );

const ClientLayout = lazyWithRouter(() => import('./ClientLayout'));
const HomePage = lazyWithRouter(() => import('./pages/HomePage'));
const StorePage = lazyWithRouter(() => import('./pages/StorePage'));
const PricingPage = lazyWithRouter(() => import('./pages/PricingPage'));
const SearchPage = lazyWithRouter(() => import('./pages/SearchPage'));
const ProductPage = lazyWithRouter(() => import('./pages/ProductPage'));
const LoginPage = lazyWithRouter(() => import('./pages/LoginPage'));
const RegisterPage = lazyWithRouter(() => import('./pages/RegisterPage'));
const WishListingPage = lazyWithRouter(() => import('./pages/WishListingPage'));
const ClientDashboardLayout = lazyWithRouter(() => import('./ClientDashboardLayout'));
const AdminDashboardLayout = lazyWithRouter(() => import('./AdminDashboardLayout'));
const SupplierDashboardLayout = lazyWithRouter(() => import('./SupplierDashboardLayout'));
const BecomeMemberPage = lazyWithRouter(() => import('./pages/BecomeMemberPage'));
const ClaimBusinessPage = lazyWithRouter(() => import('./pages/ClaimBusinessPage'));
const CategoryPage = lazyWithRouter(() => import('./pages/CategoryPage'));
const HowItWorksBuyersPage = lazyWithRouter(() => import('./pages/HowItWorksBuyersPage'));
const PostRequirementPage = lazyWithRouter(() => import('./pages/PostRequirementPage'));
const HowItWorksSuppliersPage = lazyWithRouter(() => import('./pages/HowItWorksSuppliersPage'));
const MembershipPricingPage = lazyWithRouter(() => import('./pages/MembershipPricingPage'));
const HelpSupportPage = lazyWithRouter(() => import('./pages/HelpSupportPage'));
const ExhibitionsPage = lazyWithRouter(() => import('./pages/ExhibitionsPage'));
const AboutPage = lazyWithRouter(() => import('./pages/AboutPage'));
const ContactPage = lazyWithRouter(() => import('./pages/ContactPage'));
const TermsPage = lazyWithRouter(() => import('./pages/TermsPage'));
const PrivacyPage = lazyWithRouter(() => import('./pages/PrivacyPage'));
const SearchSuppliers = lazyWithRouter(() => import('./pages/SearchSuppliers'));


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Suspense>
      <Routes>
        <Route path="/" element={<ClientLayout />} >
          <Route index element={<HomePage />} />
          <Route path="/become-member" element={<BecomeMemberPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/m/:company-slug" element={<StorePage />} />
          <Route path="/m/:company-slug/claim" element={<ClaimBusinessPage />} />
          <Route path="/p/:product-slug" element={<ProductPage />} />
          <Route path="/p/:product-slug/:product-slug-2" element={<ProductPage />} />
          <Route path="/p/:product-slug/:product-slug-2/:product-slug-3" element={<ProductPage />} />

          <Route path="/c/:category-slug" element={<CategoryPage />} />
          <Route path="/c/:category-slug/:category-slug-2" element={<CategoryPage />} />
          <Route path="/c/:category-slug/:category-slug-2/:category-slug-3" element={<CategoryPage />} />
          <Route path="/my/wishes" element={<WishListingPage />} />

          {/* Footer Pages */}
          <Route path="/how-it-works" element={<HowItWorksBuyersPage />} />
          <Route path="/post-requirement" element={<PostRequirementPage />} />
          <Route path="/search-suppliers" element={<SearchSuppliers />} />
          <Route path="/suppliers/how-it-works" element={<HowItWorksSuppliersPage />} />
          <Route path="/membership-pricing" element={<MembershipPricingPage />} />
          <Route path="/help-support" element={<HelpSupportPage />} />
          <Route path="/exhibitions" element={<ExhibitionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Route>
        <Route path="/admin" element={<AdminDashboardLayout />} >
          <Route index element={<HomePage />} />

        </Route>
        <Route path="/my" element={<ClientDashboardLayout />} >
          <Route index element={<MyDealsOutlet />} />
          <Route path='inquiries' element={<MyInquiriesOutlet />} />
          <Route path='favorites' element={<MyFavoritesOutlet />} />
          <Route path='profile' element={<MyProfileOutlet />} />
          <Route path='support' element={<TicketsPage />} />
          <Route path='suppliers' element={<SupplierListingOutlet />} />

        </Route>
        <Route path="/dashboard" element={<SupplierDashboardLayout />} >
          <Route index element={<SupplierDashboardOutlet />} />
          <Route path='products' element={<SupplierProductListingOutlet />} />
          <Route path='products/add' element={<SupplierAddProduct />} />
          <Route path='support' element={<TicketsPage />} />
          <Route path='profile' element={<SupplierProfileOutlet />} />
          <Route path='subscription' element={<SupplierSubscriptionOutlet />} />
          <Route path='inquiries' element={<SupplierInquiriesOutlet />} />
          <Route path='campaigns' element={<SupplierCampaignsOutlet />} />

        </Route>

        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

      </Routes>
    </Suspense>
    <ModalProvider />
  </BrowserRouter>
);