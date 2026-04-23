import { useState, useEffect } from 'react'
import DataManager from '../../utils/dataManager'
import './AdminPanel.css'

export default function AdminPanel() {
  const [applications, setApplications] = useState([])
  const [stats, setStats] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchEmail, setSearchEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Simple admin authentication
  const ADMIN_PASSWORD = 'ChartSentinel2024'

  useEffect(() => {
    // Check if already authenticated from session
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true'
    if (isAuth) {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const loadData = () => {
    const allApplications = DataManager.getAllApplications()
    const stats = DataManager.getApplicationStats()
    setApplications(allApplications)
    setStats(stats)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      loadData()
      setAdminPassword('')
    } else {
      alert('Invalid password')
      setAdminPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('admin_authenticated')
    setApplications([])
    setStats(null)
  }

  const handleApprove = (id) => {
    DataManager.updateApplicationStatus(id, 'approved')
    loadData()
  }

  const handleReject = (id) => {
    DataManager.updateApplicationStatus(id, 'rejected')
    loadData()
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      DataManager.deleteApplication(id)
      loadData()
    }
  }

  const getFilteredApplications = () => {
    let filtered = applications
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(app => app.status === filterStatus)
    }
    
    if (searchEmail) {
      filtered = filtered.filter(app => 
        app.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
        app.name.toLowerCase().includes(searchEmail.toLowerCase())
      )
    }
    
    return filtered
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h1>ChartSentinel Admin Panel</h1>
          <p>Secure Access Required</p>
          
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Enter admin password"
              className="login-input"
            />
            <button type="submit" className="login-button">Access Admin Panel</button>
          </form>
        </div>
      </div>
    )
  }

  const filteredApps = getFilteredApplications()

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Admin Dashboard</h1>
          <p id="z1xpre" className="early-access-badge">EARLY ACCESS • LIMITED AVAILABILITY</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Stats Overview */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-label">Total Applications</div>
          <div className="stat-value">{stats?.total || 0}</div>
        </div>
        <div className="stat-card pending">
          <div className="stat-label">Pending Review</div>
          <div className="stat-value">{stats?.pending || 0}</div>
        </div>
        <div className="stat-card approved">
          <div className="stat-label">Approved</div>
          <div className="stat-value">{stats?.approved || 0}</div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-label">Rejected</div>
          <div className="stat-value">{stats?.rejected || 0}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <div className="filter-group">
          <label>Filter by Status</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Applications</option>
            <option value="pending_review">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Search Users</label>
          <input
            type="text"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Search by name or email..."
            className="filter-input"
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Experience</th>
              <th>Markets</th>
              <th>Status</th>
              <th>Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length > 0 ? (
              filteredApps.map(app => (
                <tr key={app.id} className={`status-${app.status}`}>
                  <td className="name-cell">{app.name}</td>
                  <td className="email-cell">{app.email}</td>
                  <td className="experience-cell">{app.experience}</td>
                  <td className="markets-cell">{app.markets.join(', ')}</td>
                  <td className="status-cell">
                    <span className={`status-badge ${app.status}`}>
                      {app.status === 'pending_review' && 'Pending'}
                      {app.status === 'approved' && 'Approved'}
                      {app.status === 'rejected' && 'Rejected'}
                    </span>
                  </td>
                  <td className="date-cell">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="actions-cell">
                    {app.status === 'pending_review' && (
                      <>
                        <button 
                          onClick={() => handleApprove(app.id)}
                          className="btn-approve"
                          title="Approve"
                        >
                          ✓
                        </button>
                        <button 
                          onClick={() => handleReject(app.id)}
                          className="btn-reject"
                          title="Reject"
                        >
                          ✕
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => handleDelete(app.id)}
                      className="btn-delete"
                      title="Delete"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-state">No applications found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-footer">
        <p>Total showing: {filteredApps.length} of {applications.length} applications</p>
      </div>
    </div>
  )
}
