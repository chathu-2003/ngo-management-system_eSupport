import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import Causes from './pages/Causes';
import Gallery from './pages/Gallery';
import Marketplace from './pages/Marketplace';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Stories from './pages/Stories';
import News from './pages/News';
import Projects from './pages/Projects';
import Programe from './pages/Programe';

import Dashboard from './pages/admin/Dashboard';
import AdminContacts from './pages/admin/AdminContacts';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminCauses from './pages/admin/AdminCauses';
import AdminEvents from './pages/admin/AdminEvents';
import AdminDonations from './pages/admin/AdminDonations';
import AdminMembers from './pages/admin/AdminMembers';
import AdminGallery from './pages/admin/AdminGallery';
import AdminMarketplace from './pages/admin/AdminMarketplace';
import AdminBlog from './pages/admin/AdminBlog';
import AdminNewsletter from './pages/admin/AdminNewsletter';
import AdminTasks from './pages/admin/AdminTasks';
import AdminLoans from './pages/admin/AdminLoans';
import AdminInquiries from './pages/admin/AdminInquiries';
import AdminPartners from './pages/admin/AdminPartners';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminOrders from './pages/admin/AdminOrders';
import AdminTaskApplications from './pages/admin/AdminTaskApplications';
import AdminSettings from './pages/admin/AdminSettings';
import AdminReports from './pages/admin/AdminReports';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Events />} />
          <Route path="/causes" element={<Causes />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/success-stories" element={<Stories />} />
          <Route path="/news" element={<News />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/programe" element={<Programe />} />

          {/* Admin routes */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/contacts" element={<ProtectedRoute adminOnly><AdminContacts /></ProtectedRoute>} />
          <Route path="/admin/volunteers" element={<ProtectedRoute adminOnly><AdminVolunteers /></ProtectedRoute>} />
          <Route path="/admin/causes" element={<ProtectedRoute adminOnly><AdminCauses /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute adminOnly><AdminEvents /></ProtectedRoute>} />
          <Route path="/admin/donations" element={<ProtectedRoute adminOnly><AdminDonations /></ProtectedRoute>} />
          <Route path="/admin/members" element={<ProtectedRoute adminOnly><AdminMembers /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute adminOnly><AdminGallery /></ProtectedRoute>} />
          <Route path="/admin/marketplace" element={<ProtectedRoute adminOnly><AdminMarketplace /></ProtectedRoute>} />
          <Route path="/admin/blog" element={<ProtectedRoute adminOnly><AdminBlog /></ProtectedRoute>} />
          <Route path="/admin/newsletter" element={<ProtectedRoute adminOnly><AdminNewsletter /></ProtectedRoute>} />
          <Route path="/admin/tasks" element={<ProtectedRoute adminOnly><AdminTasks /></ProtectedRoute>} />
          <Route path="/admin/loans" element={<ProtectedRoute adminOnly><AdminLoans /></ProtectedRoute>} />
          <Route path="/admin/inquiries" element={<ProtectedRoute adminOnly><AdminInquiries /></ProtectedRoute>} />
          <Route path="/admin/partners" element={<ProtectedRoute adminOnly><AdminPartners /></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute adminOnly><AdminTestimonials /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute adminOnly><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/task-applications" element={<ProtectedRoute adminOnly><AdminTaskApplications /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute adminOnly><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute adminOnly><AdminReports /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
