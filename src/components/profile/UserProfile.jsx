import { useState, useEffect } from 'react'
import DataManager from '../../utils/dataManager'
import './UserProfile.css'

export default function UserProfile({ userId, onClose }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (userId) {
      const data = DataManager.getApplication(userId)
      if (data) {
        setProfile(data)
      }
    } else {
      const session = DataManager.getUserSession()
      if (session) {
        setProfile(session)
      }
    }
    setLoading(false)
  }, [userId])

  if (loading) {
    return <div className="profile-loading">Loading profile...</div>
  }

  if (!profile) {
    return <div className="profile-error">Profile not found</div>
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_review':
        return 'pending'
      case 'approved':
        return 'approved'
      case 'rejected':
        return 'rejected'
      default:
        return 'pending'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending_review':
        return 'Pending Review'
      case 'approved':
        return 'Approved ✓'
      case 'rejected':
        return 'Rejected'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="user-profile">
      <div className="profile-card">
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="profile-header">
          <div className="profile-avatar">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-intro">
            <h2>{profile.name}</h2>
            <p>{profile.email}</p>
          </div>
          <div className={`profile-status ${getStatusColor(profile.status)}`}>
            {getStatusText(profile.status)}
          </div>
        </div>

        <div className="profile-section">
          <h3>Application Details</h3>
          <div className="profile-details">
            <div className="detail-row">
              <span className="detail-label">Application ID</span>
              <span className="detail-value">{profile.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Applied On</span>
              <span className="detail-value">{new Date(profile.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Experience Level</span>
              <span className="detail-value capitalize">{profile.experience}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Markets of Interest</h3>
          <div className="markets-list">
            {profile.markets.map(market => (
              <span key={market} className="market-tag">{market}</span>
            ))}
          </div>
        </div>

        {profile.capitalRange && (
          <div className="profile-section">
            <h3>Trading Capital</h3>
            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">Capital Range</span>
                <span className="detail-value">{profile.capitalRange}</span>
              </div>
            </div>
          </div>
        )}

        <div className="profile-section">
          <h3>Why You Applied</h3>
          <p className="reason-text">{profile.reason}</p>
        </div>

        {profile.status === 'pending_review' && (
          <div className="profile-message pending-message">
            <div className="message-icon">⏱</div>
            <div className="message-content">
              <p className="message-title">Application Under Review</p>
              <p className="message-text">
                We're reviewing your application and will notify you within 24-48 hours. Check your email for updates.
              </p>
            </div>
          </div>
        )}

        {profile.status === 'approved' && (
          <div className="profile-message approved-message">
            <div className="message-icon">✓</div>
            <div className="message-content">
              <p className="message-title">Congratulations! You're Approved</p>
              <p className="message-text">
                You've been granted early access to ChartSentinel. Check your email for instructions to get started.
              </p>
              <button className="btn-launch">Launch  Platform →</button>
            </div>
          </div>
        )}

        {profile.status === 'rejected' && (
          <div className="profile-message rejected-message">
            <div className="message-icon">✕</div>
            <div className="message-content">
              <p className="message-title">Application Status Updated</p>
              <p className="message-text">
                Thank you for your interest in ChartSentinel. We couldn't accommodate your application this time, but we'd love to see you in the future.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
