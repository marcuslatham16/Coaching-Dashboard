// Add this to your js/active-coaching.js file (create it if it doesn't exist)

document.addEventListener('DOMContentLoaded', function () {
  setupChartInteractions();
  setupEndCoachingButton();

  // Safely bind reschedule buttons
  document.querySelectorAll('.reschedule-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      showToast('Reschedule', 'Opening calendar to reschedule coaching...', 'info');
    });
  });

  // Safely bind end buttons
  document.querySelectorAll('.end-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      if (confirm('Are you sure you want to end this coaching program? This action cannot be undone.')) {
        showToast('Coaching Ended', 'The coaching program has been successfully ended.', 'success');
        setTimeout(() => {
          window.location.href = 'coaching-history.html';
        }, 2000);
      }
    });
  });
});

/**
 * Set up interactions for the coaching progress chart
 */
function setupChartInteractions() {
  // Handle metric selector buttons
  const metricButtons = document.querySelectorAll('.metric-button');
  
  metricButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove selected class from all buttons
      metricButtons.forEach(btn => btn.classList.remove('selected'));
      
      // Add selected class to clicked button
      this.classList.add('selected');
      
      // In a real application, this would update the chart data
      // For demo purposes, we'll just show a toast
      const metricName = this.textContent.trim();
      showToast('Metric Changed', `Switched to ${metricName} metrics view`, 'info');
    });
  });
}

/**
 * Show a toast notification
 * @param {string} title - The toast title
 * @param {string} message - The toast message
 * @param {string} type - The toast type (info, success, warning, error)
 */
function showToast(title, message, type = 'info') {
  // Check if the toast function exists in main.js
  if (typeof window.showToast === 'function') {
    window.showToast(title, message, type);
  } else {
    // Fallback implementation if the global function is not available
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Get the appropriate icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    if (type === 'error') icon = 'exclamation-circle';
    
    toast.innerHTML = `
      <div class="toast-icon"><i class="fas fa-${icon}"></i></div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close notification"><i class="fas fa-times"></i></button>
    `;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Add close handler
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
      // Add the hiding class for animation
      toast.classList.add('hiding');
      
      // Remove after animation completes
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
      if (toast.parentElement && !toast.classList.contains('hiding')) {
        toast.classList.add('hiding');
        setTimeout(() => {
          if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
          }
        }, 300);
      }
    }, 5000);
  }
}