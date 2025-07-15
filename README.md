# Package-Mangement-System


## Features

- **Authentication**: Auth0-based login and route protection
- **Secure Document Upload**:
  - PDF-only, single file upload (API constraint)
  - Metadata fields: package type, expiry time (hours), recipient email, description
  - Client-side validation, error toasts, and progress feedback
- **Document Management Dashboard**:
  - List, filter, and manage uploaded packages
  - Real-time status, expiry, and user info
- **Client Review & E-Signature**:
  - Clients can review PDF packages via secure link
  - PDF viewer (iframe-based for SSR compatibility)
  - Signature pad for e-signature, approval/rejection workflow
  - Audit trail and status updates
- **Document Viewer**:
  - App Router page `/doc_viewer/[id]` fetches document data by ID
  - Displays PDF in iframe (CORS/content-disposition aware)
  - Shows recipient email, expiry date/time, and hours left
- **API Integration**:
  - Uploads and fetches handled via backend API
  - Uses signed URLs for secure PDF access
  - Proxy endpoint for CORS workarounds (if needed)
- **UI/UX Highlights**:
  - Toast notifications for errors/success
  - Field-level validation and feedback
  - Modern design with clear status indicators

---

## Data Flow

1. **User uploads PDF** via dashboard (with metadata)
2. **API stores file** and returns a signed URL for secure access
3. **Document viewer** fetches document data by ID, displays PDF via iframe
4. **Client review** link sent to recipient (with secure token)
5. **Client reviews and signs** PDF, status is updated via API
6. **Audit and status** info available in dashboard

---

## Technologies Used
- Next.js (App Router)
- React
- Auth0 (authentication)
- Bootstrap & custom CSS
- Google Cloud Storage (signed URLs)
- PDF.js (optional, fallback to iframe for SSR/CORS)
- Toastify/Toasts for notifications

---

## Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the dev server:**
   ```bash
   npm run dev
   ```
3. **Open** [http://localhost:3000](http://localhost:3000) in your browser
