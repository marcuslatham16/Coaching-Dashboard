// Add this to your js/active-coaching.js file (create it if it doesn't exist)

document.addEventListener('DOMContentLoaded', function () {
  setupChartInteractions();

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

function setupChartInteractions() {
  const metricButtons = document.querySelectorAll('.metric-button');

  metricButtons.forEach(button => {
    button.addEventListener('click', function () {
      metricButtons.forEach(btn => btn.classList.remove('selected'));
      this.classList.add('selected');

      const metricName = this.textContent.trim();
      showToast('Metric Changed', `Switched to ${metricName} metrics view`, 'info');
    });
  });
}
   