"use client";
import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';


const DocumentManagementLayer = () => {
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isLoading } = useUser();
  const router = useRouter();


  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('https://taxcompliancepoc-jhuochimpq-uc.a.run.app/documents')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch documents');
        return res.json();
      })
      .then(data => {
        if (data.status === 'success' && Array.isArray(data.data)) {
          const now = new Date();
          const processedPackages = data.data.map(pkg => {
            // Only check expiry_time if status is not 'approved' or 'rejected'
            if (
              pkg.expiry_time &&
              new Date(now) > new Date(pkg.expiry_time) &&
              pkg.status !== 'approved' &&
              pkg.status !== 'rejected'
            ) {
              return { ...pkg, status: 'expired' };
            }
            return pkg;
          });
          setPackages(processedPackages);
        } else {
          setPackages([]);
          setError('No data received from API');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Error fetching documents');
        setPackages([]);
        setLoading(false);
      });

      console.log(user);
      
  }, []);

  // 1. Toast state and component
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'info' }), 2500);
  };

  const getStatusBadge = (status, siActive) => {
    // If siActive is false, always show Expired
    if (siActive === false) {
      const config = {
        class: 'bg-neutral-100 text-neutral-700',
        text: 'Expired',
        icon: 'solar:clock-circle-outline',
      };
      return (
        <span className={`badge ${config.class} px-3 py-1 rounded-pill fw-medium`} title="Expired">
          <Icon icon={config.icon} className="me-1" />
          {config.text}
        </span>
      );
    }
    // Treat 'pending_signature' as 'Pending', 'approved' as 'Signed'
    let normalizedStatus = status;
    if (status === 'pending_signature') normalizedStatus = 'pending';
    if (status === 'approved') normalizedStatus = 'signed';
    const statusConfig = {
      uploaded: { class: 'bg-info-100 text-info-700 fs-16', text: 'Uploaded', icon: 'solar:upload-outline' },
      sent: { class: 'bg-warning-100 text-warning-700', text: 'Sent', icon: 'solar:send-outline' },
      signed: { class: 'bg-success-100 text-success-700', text: 'Signed', icon: 'solar:check-circle-outline' },
      rejected: { class: 'bg-danger-100 text-danger-700', text: 'Rejected', icon: 'solar:close-circle-outline' },
      expired: { class: 'bg-neutral-100 text-neutral-700', text: 'Expired', icon: 'solar:clock-circle-outline' },
      pending: { class: 'bg-warning-100 text-warning-700', text: 'Pending', icon: 'solar:clock-circle-outline' },
    };
    const config = statusConfig[normalizedStatus] || statusConfig.uploaded;
    return (
      <span className={`badge ${config.class} px-3 py-1 rounded-pill fw-medium`} title={normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)}>
        <Icon icon={config.icon} className="me-1" />
        {config.text}
      </span>
    );
  };

  const filteredPackages = packages.filter(pkg => {
    const matchesFilter = filter === 'all' || pkg.status === filter;
    const matchesSearch = (pkg.clientName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (pkg.packageName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (pkg.clientEmail?.toLowerCase() || '').includes(searchTerm.toLowerCase());
  return matchesFilter && matchesSearch;
});

  // Update statusCounts to treat siActive === false as 'expired', 'approved' as 'signed'
  const getStatusCounts = () => {
    return packages.reduce((acc, pkg) => {
      let status = pkg.status;
      if (pkg.siActive === false) status = 'expired';
      else if (status === 'pending_signature') status = 'pending';
      else if (status === 'approved') status = 'signed';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  };

  const statusCounts = getStatusCounts();

  const sendToClient = (packageId) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId 
        ? { ...pkg, status: 'sent', lastModified: new Date().toISOString() }
        : pkg
    ));
  };

  const generateDocViewerLink = (docId) => {
    return `${window.location.origin}/doc_viewer/id=${docId}`;
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  // Add page size selector state
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const pageSizeOptions = [5, 10, 20];
  const totalRows = filteredPackages.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const paginatedPackages = filteredPackages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  // Reset to first page when filter/search changes
  useEffect(() => { setCurrentPage(1); }, [filter, searchTerm]);

  return (
    <div className="row">
      {/* Statistics Cards with fade-in animation and skeleton */}
      <div className="col-12 mb-4">
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
          {[0,1,2,3,4].map((i) => (
            <div key={i} className={`col animate__animated animate__fadeInUp animate__delay-${i+1}s`} style={{animationDelay: `${0.1*i+0.1}s`}}>
              {loading ? (
                <div className="card border-0 shadow-sm bg-gradient-start-1 h-100 rounded-4">
                  <div className="card-body d-flex align-items-center justify-content-between p-20">
                    <div className="skeleton-box" style={{width: 80, height: 32, borderRadius: 8}} />
                    <div className="skeleton-box" style={{width: 48, height: 48, borderRadius: 24}} />
                  </div>
                </div>
              ) : (
                // ... existing card code for each stat, as previously refactored ...
                // (copy the card code for each stat here, as in the previous edit)
                i === 0 ? (
                  <div className="card border-0 shadow-sm bg-gradient-start-1 h-100 rounded-4">
                    <div className="card-body d-flex align-items-center justify-content-between p-20">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">Total Packages</p>
                        <h5 className="mb-0 fw-bold text-primary">{packages.length}</h5>
                      </div>
                      <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                        <Icon icon="solar:document-outline" className="text-white text-2xl mb-0" />
                      </div>
                    </div>
                  </div>
                ) : i === 1 ? (
                  <div className="card border-0 shadow-sm bg-gradient-start-2 h-100 rounded-4">
                    <div className="card-body d-flex align-items-center justify-content-between p-20">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">Pending</p>
                        <h5 className="mb-0 fw-bold text-yellow">{(statusCounts.uploaded || 0) + (statusCounts.sent || 0) + (statusCounts.pending || 0)}</h5>
                      </div>
                      <div className="w-50-px h-50-px bg-warning rounded-circle d-flex justify-content-center align-items-center">
                        <Icon icon="solar:clock-circle-outline" className="text-white text-2xl mb-0" />
                      </div>
                    </div>
                  </div>
                ) : i === 2 ? (
                  <div className="card border-0 shadow-sm bg-gradient-start-3 h-100 rounded-4">
                    <div className="card-body d-flex align-items-center justify-content-between p-20">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">Signed</p>
                        <h5 className="mb-0 fw-bold text-success">{statusCounts.signed || 0}</h5>
                      </div>
                      <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                        <Icon icon="solar:check-circle-outline" className="text-white text-2xl mb-0" />
                      </div>
                    </div>
                  </div>
                ) : i === 3 ? (
                  <div className="card border-0 shadow-sm bg-gradient-start-4 h-100 rounded-4">
                    <div className="card-body d-flex align-items-center justify-content-between p-20">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">Rejected</p>
                        <h5 className="mb-0 fw-bold text-danger">{statusCounts.rejected || 0}</h5>
                      </div>
                      <div className="w-50-px h-50-px bg-danger rounded-circle d-flex justify-content-center align-items-center">
                        <Icon icon="solar:close-circle-outline" className="text-white text-2xl mb-0" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="card border-0 shadow-sm bg-gradient-start-5 h-100 rounded-4">
                    <div className="card-body d-flex align-items-center justify-content-between p-20">
                      <div>
                        <p className="fw-medium text-primary-light mb-1">Expired</p>
                        <h5 className="mb-0 fw-bold text-secondary">{statusCounts.expired || 0}</h5>
                      </div>
                      <div className="w-50-px h-50-px bg-neutral-500 rounded-circle rounded-circle d-flex justify-content-center align-items-center">
                        <Icon icon="mdi:timer-off-outline" className="text-white text-2xl mb-0" />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Filter/Search Bar with animation */}
      <div className="col-12 position-sticky top-0 z-2 mt-4" style={{background: 'inherit'}}>
        <div className="bg-base rounded-3 p-3 shadow-sm animate__animated animate__fadeInDown animate__faster">
          <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
            {/* <div className="btn-group flex-wrap" role="group" aria-label="Package Status Filters">
              {['all','uploaded','sent','signed','rejected','expired'].map((type) => (
                <button
                  key={type}
                  className={`btn btn-pill btn-sm fw-semibold transition-all ${filter === type ? 'btn-primary shadow-sm scale-105' : 'btn-outline-primary'}`}
                  onClick={() => setFilter(type)}
                  style={{transition: 'all 0.2s'}}
                  aria-pressed={filter === type}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div> */}
          </div>
          <div className="row g-2 align-items-center justify-content-between">
            <div className="col-2">
              <div className="position-relative w-100">
                <input
                  type="text"
                  className="form-control form-control-sm ps-5 rounded-pill shadow-none transition-all"
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ minWidth: 220, boxShadow: '0 0 0 2px #e0e7ef' }}
                  onFocus={e => e.target.style.boxShadow = '0 0 0 3px #a5d8ff'}
                  onBlur={e => e.target.style.boxShadow = '0 0 0 2px #e0e7ef'}
                  aria-label="Search packages"
                />
                <Icon icon="solar:magnifer-outline" className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" />
              </div>
            </div>
            <div className="col-12 col-md-auto mt-2 mt-md-0 align-items-center pt-4">
              <Link href="/document-upload" className="btn btn-primary btn-sm d-flex align-items-center gap-2 animate__animated animate__pulse animate__infinite" title="Upload new packages" style={{fontWeight:600}}>
                <Icon icon="solar:add-circle-outline" /> Upload Packages
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Table with animation and skeleton */}
      <div className="col-12">
        <div className="card h-100 border-0 shadow-sm rounded-4 animate__animated animate__fadeIn animate__faster">
          <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between flex-wrap gap-2">
            <h6 className="text-lg fw-semibold mb-0">Packages</h6>
            {/* <div className="btn-group flex-wrap" role="group" aria-label="Package Status Filters">
              {['all','uploaded','sent','signed','rejected','expired'].map((type) => (
                <button
                  key={type}
                  className={`btn btn-pill btn-sm fw-semibold transition-all ${filter === type ? 'btn-primary shadow-sm scale-105' : 'btn-outline-primary'}`}
                  onClick={() => setFilter(type)}
                  style={{transition: 'all 0.2s'}}
                  aria-pressed={filter === type}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div> */}
          </div>
          <div className="card-body p-24">
            {loading ? (
              <div>
                {[...Array(5)].map((_,i) => (
                  <div key={i} className="skeleton-box mb-3" style={{height: 48, borderRadius: 8}} />
                ))}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover bordered-table align-middle">
                  {/* 2. Table header improvements */}
                  <thead>
                    <tr className="table-header-row">
                      <th className="fs-6 text-gray-700 fw-bold py-3 px-3 bg-base border-bottom">No.</th>
                      <th className="fs-6 text-gray-700 fw-bold py-3 px-3 bg-base border-bottom">Client</th>
                      <th className="fs-6 text-gray-700 fw-bold py-3 px-3 bg-base border-bottom">Package</th>
                      <th className="fs-6 text-gray-700 fw-bold py-3 px-3 bg-base border-bottom">Status</th>
                      <th className="fs-6 text-gray-700 fw-bold py-3 px-3 bg-base border-bottom">Created</th>
                      <th className="fs-6 text-gray-700 fw-bold py-3 px-3 bg-base border-bottom">Last Modified</th>
                      <th className="fs-6 text-gray-700 fw-bold py-3 px-3 bg-base border-bottom">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPackages.map((pkg, index) => (
                      <tr key={pkg.id} className="transition-all animate__animated animate__fadeInUp animate__faster" style={{animationDelay: `${0.05*index+0.1}s`}}>
                        <td>
                          <span className="text-md mb-0 fw-normal text-secondary-light">{(currentPage - 1) * rowsPerPage + index + 1}</span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1">
                              <span className="text-md mb-0 fw-normal text-secondary-light">{pkg.user_name || pkg.user_email || '-'}</span>
                              <br />
                              <span className="text-sm text-secondary-light">{pkg.user_email || '-'}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="text-md mb-0 fw-normal text-secondary-light">{pkg.package_type || pkg.file_name || '-'}</span>
                        </td>
                        <td>
                          <span title={pkg.status ? pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1) : ''}>
                            {getStatusBadge(pkg.status, pkg.siActive)}
                          </span>
                        </td>
                        <td>
                          <span className="text-md mb-0 fw-normal text-secondary-light">
                            {pkg.created_at ? new Date(pkg.created_at).toLocaleString() : '-'}
                          </span>
                        </td>
                        <td>
                          <span className="text-md mb-0 fw-normal text-secondary-light">
                            {pkg.updated_at ? new Date(pkg.updated_at).toLocaleString() : '-'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-sm btn-outline-primary px-3 py-1 transition-all shadow-sm d-flex align-items-center gap-1"
                              title="View Package"
                              tabIndex={0}
                              style={{transition: 'all 0.2s'}}
                              onClick={() => router.push(`/doc_viewer/id=${pkg.id}`)}
                            >
                              <Icon icon="solar:eye-outline" className="me-1" style={{marginBottom: '-2px'}} />
                              <span>View</span>
                            </button>
                            <button
                              className="btn btn-sm btn-info-600 px-3 py-1 transition-all shadow-sm"
                              title="Copy Doc Viewer Link"
                              onClick={() => {
                                const link = generateDocViewerLink(pkg.id);
                                navigator.clipboard.writeText(link);
                                showToast('Doc viewer link copied to clipboard!', 'success');
                              }}
                              tabIndex={0}
                              style={{transition: 'all 0.2s'}}
                            >
                              <Icon icon="solar:copy-outline" className="me-1" />
                              Copy
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Pagination Bar and Page Size Selector: only show if more than one page */}
            {!loading && totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center mt-4">
                <div className="card shadow-sm p-3 d-flex flex-row align-items-center gap-3" style={{ borderRadius: 24, background: '#fff', minWidth: 350 }}>
                  <nav aria-label="Table pagination">
                    <ul className="pagination pagination-sm mb-0 rounded-pill bg-base shadow-none p-2 gap-1 flex-wrap align-items-center">
                      <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}> 
                        <button className="page-link rounded-pill border-0" aria-label="Previous" onClick={() => handlePageChange(currentPage - 1)} tabIndex={0}>&laquo;</button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <li key={page} className={`page-item${currentPage === page ? ' d-flex align-items-center justify-content-center active' : ''}`}> 
                          <button className="page-link rounded-pill border-0 fw-semibold" aria-label={`Page ${page}`} onClick={() => handlePageChange(page)} tabIndex={0}>{page}</button>
                        </li>
                      ))}
                      <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}> 
                        <button className="page-link rounded-pill border-0" aria-label="Next" onClick={() => handlePageChange(currentPage + 1)} tabIndex={0}>&raquo;</button>
                      </li>
                    </ul>
                  </nav>
                  <div className="d-flex align-items-center gap-2 ms-2">
                    <span className="fw-semibold text-secondary-light" style={{fontSize: '0.95em'}}>
                      Showing {(currentPage - 1) * rowsPerPage + 1}
                      –{Math.min(currentPage * rowsPerPage, totalRows)} of {totalRows} packages
                    </span>
                    <label htmlFor="pageSizeSelect" className="form-label mb-0 text-secondary-light" style={{fontSize: '0.95em'}}>Rows per page:</label>
                    <select
                      id="pageSizeSelect"
                      className="form-select form-select-sm rounded-pill shadow-none"
                      style={{width: 70, minWidth: 70}}
                      value={rowsPerPage}
                      onChange={handlePageSizeChange}
                      aria-label="Rows per page"
                    >
                      {pageSizeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
            {/* Empty state illustration and CTA */}
            {!loading && paginatedPackages.length === 0 && (
              <div className="text-center py-5 animate__animated animate__fadeIn animate__faster">
                <Icon icon="solar:document-outline" className="text-secondary mb-3" style={{ fontSize: '48px' }} />
                <p className="text-secondary-light mb-2">No packages found matching your criteria.</p>
              </div>
            )}
            {error && (
              <div className="alert alert-danger mt-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-container position-fixed top-0 end-0 p-3 z-3`} style={{ minWidth: 240 }}>
          <div className={`toast show align-items-center text-bg-${toast.type} border-0 shadow`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body">{toast.message}</div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={() => setToast({ show: false, message: '', type: 'info' })}></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagementLayer;

