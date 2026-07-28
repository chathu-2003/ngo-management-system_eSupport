const BASE_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong.');
  return data;
};

// Auth
export const register = (body) =>
  fetch(`${BASE_URL}/auth/register`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

export const login = (body) =>
  fetch(`${BASE_URL}/auth/login`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

export const getMe = () =>
  fetch(`${BASE_URL}/auth/me`, { headers: getHeaders() }).then(handleResponse);

// Contacts
export const submitContact = (body) =>
  fetch(`${BASE_URL}/contacts`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// Volunteers
export const submitVolunteer = (body) =>
  fetch(`${BASE_URL}/volunteers`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// Causes
export const getCauses = () =>
  fetch(`${BASE_URL}/causes`, { headers: getHeaders() }).then(handleResponse);

// Events
export const getEvents = (upcoming = false) =>
  fetch(`${BASE_URL}/events${upcoming ? '?upcoming=true' : ''}`, { headers: getHeaders() }).then(handleResponse);

// Donations
export const submitDonation = (body) =>
  fetch(`${BASE_URL}/donations`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

export const getMyDonations = () =>
  fetch(`${BASE_URL}/donations/my-donations`, { headers: getHeaders() }).then(handleResponse);

// Gallery
export const getGallery = (category) =>
  fetch(`${BASE_URL}/gallery${category ? `?category=${category}` : ''}`, { headers: getHeaders() }).then(handleResponse);

// Blog
export const getBlogs = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/blogs${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const getBlogBySlug = (slug) =>
  fetch(`${BASE_URL}/blogs/${slug}`, { headers: getHeaders() }).then(handleResponse);

// Marketplace
export const getMarketplace = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/marketplace${query ? `?${query}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};

export const createMarketplaceItem = (body) =>
  fetch(`${BASE_URL}/marketplace`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// ── Admin ──────────────────────────────────────────────────────────────────
export const getAdminStats = () =>
  fetch(`${BASE_URL}/admin/stats`, { headers: getHeaders() }).then(handleResponse);

// Admin – Contacts
export const adminGetContacts = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/contacts${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminUpdateContactStatus = (id, status) =>
  fetch(`${BASE_URL}/contacts/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ status }) }).then(handleResponse);
export const adminDeleteContact = (id) =>
  fetch(`${BASE_URL}/contacts/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Volunteers
export const adminGetVolunteers = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/volunteers${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminUpdateVolunteerStatus = (id, status) =>
  fetch(`${BASE_URL}/volunteers/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ status }) }).then(handleResponse);
export const adminDeleteVolunteer = (id) =>
  fetch(`${BASE_URL}/volunteers/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Causes
export const adminGetCauses = () =>
  fetch(`${BASE_URL}/causes`, { headers: getHeaders() }).then(handleResponse);
export const adminCreateCause = (body) =>
  fetch(`${BASE_URL}/causes`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminUpdateCause = (id, body) =>
  fetch(`${BASE_URL}/causes/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminDeleteCause = (id) =>
  fetch(`${BASE_URL}/causes/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Events
export const adminGetEvents = () =>
  fetch(`${BASE_URL}/events`, { headers: getHeaders() }).then(handleResponse);
export const adminCreateEvent = (body) =>
  fetch(`${BASE_URL}/events`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminUpdateEvent = (id, body) =>
  fetch(`${BASE_URL}/events/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminDeleteEvent = (id) =>
  fetch(`${BASE_URL}/events/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Donations
export const adminGetDonations = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/donations${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};

// Admin – Members
export const adminGetMembers = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/members${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminUpdateMemberRole = (id, role) =>
  fetch(`${BASE_URL}/admin/members/${id}/role`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ role }) }).then(handleResponse);
export const adminUpdateMemberStatus = (id, isActive) =>
  fetch(`${BASE_URL}/admin/members/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ isActive }) }).then(handleResponse);
export const adminDeleteMember = (id) =>
  fetch(`${BASE_URL}/admin/members/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Gallery
export const adminGetGallery = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/gallery${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminCreateGallery = (body) =>
  fetch(`${BASE_URL}/admin/gallery`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminUpdateGallery = (id, body) =>
  fetch(`${BASE_URL}/admin/gallery/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminDeleteGallery = (id) =>
  fetch(`${BASE_URL}/admin/gallery/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Marketplace
export const adminGetMarketplace = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/marketplace${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminUpdateMarketplaceStatus = (id, isAvailable) =>
  fetch(`${BASE_URL}/admin/marketplace/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ isAvailable }) }).then(handleResponse);
export const adminDeleteMarketplaceItem = (id) =>
  fetch(`${BASE_URL}/admin/marketplace/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Blog
export const adminGetBlogs = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/blogs${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminCreateBlog = (body) =>
  fetch(`${BASE_URL}/admin/blogs`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminUpdateBlog = (id, body) =>
  fetch(`${BASE_URL}/admin/blogs/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminDeleteBlog = (id) =>
  fetch(`${BASE_URL}/admin/blogs/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Newsletter
export const adminGetNewsletter = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/newsletter${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminUpdateNewsletterStatus = (id, isActive) =>
  fetch(`${BASE_URL}/admin/newsletter/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ isActive }) }).then(handleResponse);
export const adminDeleteNewsletter = (id) =>
  fetch(`${BASE_URL}/admin/newsletter/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Tasks
export const adminGetTasks = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/tasks${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminCreateTask = (body) =>
  fetch(`${BASE_URL}/admin/tasks`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminUpdateTask = (id, body) =>
  fetch(`${BASE_URL}/admin/tasks/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminDeleteTask = (id) =>
  fetch(`${BASE_URL}/admin/tasks/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Loans
export const adminGetLoans = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/loans${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminUpdateLoanStatus = (id, body) =>
  fetch(`${BASE_URL}/admin/loans/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminDeleteLoan = (id) =>
  fetch(`${BASE_URL}/admin/loans/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Inquiries
export const adminGetInquiries = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/inquiries${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminUpdateInquiryStatus = (id, body) =>
  fetch(`${BASE_URL}/admin/inquiries/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminDeleteInquiry = (id) =>
  fetch(`${BASE_URL}/admin/inquiries/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Partners
export const adminGetPartners = () =>
  fetch(`${BASE_URL}/admin/partners`, { headers: getHeaders() }).then(handleResponse);
export const adminCreatePartner = (body) =>
  fetch(`${BASE_URL}/admin/partners`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminUpdatePartner = (id, body) =>
  fetch(`${BASE_URL}/admin/partners/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminDeletePartner = (id) =>
  fetch(`${BASE_URL}/admin/partners/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Testimonials
export const adminGetTestimonials = () =>
  fetch(`${BASE_URL}/admin/testimonials`, { headers: getHeaders() }).then(handleResponse);
export const adminCreateTestimonial = (body) =>
  fetch(`${BASE_URL}/admin/testimonials`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminUpdateTestimonial = (id, body) =>
  fetch(`${BASE_URL}/admin/testimonials/${id}`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);
export const adminDeleteTestimonial = (id) =>
  fetch(`${BASE_URL}/admin/testimonials/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Site Settings
export const adminGetSettings = () =>
  fetch(`${BASE_URL}/admin/settings`, { headers: getHeaders() }).then(handleResponse);
export const adminUpdateSettings = (body) =>
  fetch(`${BASE_URL}/admin/settings`, { method: 'PUT', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// Admin – Financial Reports
export const adminGetReports = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/reports${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminCreateReport = (formData) =>
  fetch(`${BASE_URL}/admin/reports`, { method: 'POST', headers: getAuthHeaders(), body: formData }).then(handleResponse);
export const adminUpdateReport = (id, formData) =>
  fetch(`${BASE_URL}/admin/reports/${id}`, { method: 'PUT', headers: getAuthHeaders(), body: formData }).then(handleResponse);
export const adminDeleteReport = (id) =>
  fetch(`${BASE_URL}/admin/reports/${id}`, { method: 'DELETE', headers: getHeaders() }).then(handleResponse);

// Admin – Orders
export const adminGetOrders = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/orders${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminUpdateOrderStatus = (id, body) =>
  fetch(`${BASE_URL}/admin/orders/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify(body) }).then(handleResponse);

// Admin – Task Applications
export const adminGetTaskApplications = (params = {}) => {
  const q = new URLSearchParams(params).toString();
  return fetch(`${BASE_URL}/admin/task-applications${q ? `?${q}` : ''}`, { headers: getHeaders() }).then(handleResponse);
};
export const adminUpdateTaskApplicationStatus = (id, status) =>
  fetch(`${BASE_URL}/admin/task-applications/${id}/status`, { method: 'PATCH', headers: getHeaders(), body: JSON.stringify({ status }) }).then(handleResponse);

// Admin – Event Registrations
export const adminGetEventRegistrations = (eventId) =>
  fetch(`${BASE_URL}/admin/events/${eventId}/registrations`, { headers: getHeaders() }).then(handleResponse);
