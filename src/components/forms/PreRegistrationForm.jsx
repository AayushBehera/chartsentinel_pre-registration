import { useState } from 'react'
import DataManager from '../../utils/dataManager'
import { validateForm } from '../../utils/validation'
import './PreRegistrationForm.css'

export default function PreRegistrationForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    markets: [],
    capitalRange: '',
    reason: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleMarketToggle = (market) => {
    setFormData(prev => ({
      ...prev,
      markets: prev.markets.includes(market)
        ? prev.markets.filter(m => m !== market)
        : [...prev.markets, market]
    }))
    if (errors.markets) {
      setErrors(prev => ({ ...prev, markets: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Check if email already exists
    if (DataManager.applicationExists(formData.email)) {
      setErrors({ email: 'This email is already registered' })
      setIsSubmitting(false)
      return
    }

    // Validate form
    const validation = validateForm(formData)
    if (!validation.valid) {
      setErrors(validation.errors)
      setIsSubmitting(false)
      return
    }

    // Add to applications
    const result = DataManager.addApplication(formData)
    
    if (result) {
      // Save user session
      DataManager.setUserSession(result.id, result)

      setSubmitStatus({
        type: 'success',
        userId: result.id,
        message: 'Application submitted successfully!'
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        experience: '',
        markets: [],
        capitalRange: '',
        reason: ''
      })
      setErrors({})

      // Call onSuccess callback
      if (onSuccess) {
        setTimeout(() => {
          onSuccess(result)
        }, 1500)
      }
    } else {
      setSubmitStatus({
        type: 'error',
        message: 'Error submitting application. Please try again.'
      })
    }

    setIsSubmitting(false)
  }

  return (
    <div className="pre-registration-form">
      <div className="form-container">
        <div className="form-header">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Join Early Access
          </h2>
          <p className="text-sl text-slate-400 mb-4">
            Be among the first to experience ChartSentinel's advanced trading platform
          </p>
          <div className="availability-badge">
            Limited slots available • GET NOTIFIED
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your full name"
              className={`form-input ${errors.name ? 'error' : ''}`}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your@email.com"
              className={`form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          {/* Experience Level */}
          <div className="form-group">
            <label htmlFor="experience" className="form-label">Trading Experience *</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className={`form-input ${errors.experience ? 'error' : ''}`}
            >
              <option value="">Select your experience level</option>
              <option value="beginner">Beginner (Just starting out)</option>
              <option value="intermediate">Intermediate (1-3 years)</option>
              <option value="advanced">Advanced (3-5 years)</option>
              <option value="professional">Professional (5+ years)</option>
            </select>
            {errors.experience && <span className="form-error">{errors.experience}</span>}
          </div>

          {/* Markets Selection */}
          <div className="form-group">
            <label className="form-label">Markets of Interest *</label>
            <div className="markets-grid">
              {['Forex', 'Crypto', 'Stocks', 'Commodities'].map(market => (
                <label key={market} className="market-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.markets.includes(market)}
                    onChange={() => handleMarketToggle(market)}
                  />
                  <span>{market}</span>
                </label>
              ))}
            </div>
            {errors.markets && <span className="form-error">{errors.markets}</span>}
          </div>

          {/* Capital Range */}
          <div className="form-group">
            <label htmlFor="capitalRange" className="form-label">Trading Capital Range (Optional)</label>
            <select
              id="capitalRange"
              name="capitalRange"
              value={formData.capitalRange}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Not specified</option>
              <option value="1k-10k">$1,000 - $10,000</option>
              <option value="10k-50k">$10,000 - $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="100k+">$100,000+</option>
            </select>
          </div>

          {/* Reason for Applying */}
          <div className="form-group">
            <label htmlFor="reason" className="form-label">Why ChartSentinel? *</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Tell us why you'd like to join our early access program..."
              className={`form-input form-textarea ${errors.reason ? 'error' : ''}`}
              rows="4"
            />
            {errors.reason && <span className="form-error">{errors.reason}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-submit"
          >
            {isSubmitting ? 'Submitting...' : 'Apply for Early Access'}
          </button>

          {submitStatus && (
            <div className={`form-status ${submitStatus.type}`}>
              {submitStatus.type === 'success' ? (
                <div>
                  <div className="status-icon">✓</div>
                  <p>{submitStatus.message}</p>
                  <p className="user-id">Application ID: {submitStatus.userId}</p>
                </div>
              ) : (
                <div>
                  <div className="status-icon">✕</div>
                  <p>{submitStatus.message}</p>
                </div>
              )}
            </div>
          )}
        </form>

        <div className="form-footer">
          <p className="text-xs text-slate-500">
            Your data is secure and used only for early access notifications. We never share your information.
          </p>
        </div>
      </div>
    </div>
  )
}
