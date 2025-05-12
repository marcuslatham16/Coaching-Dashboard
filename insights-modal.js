document.addEventListener('DOMContentLoaded', function() {
  // Insights modal functionality
  const insightsOverlay = document.getElementById('insightsOverlay');
  const insightsModal = document.getElementById('insightsModal');
  const insightsClose = document.getElementById('insightsClose');
  const insightsAgentName = document.getElementById('insightsAgentName');

  // Open insights when chart icon is clicked
  document.querySelectorAll('.insights-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const agent = this.getAttribute('data-agent');
      
      // Update insights with agent info
      if (insightsAgentName) insightsAgentName.textContent = agent;
      
      // Show insights and overlay
      if (insightsOverlay) insightsOverlay.classList.add('show');
      if (insightsModal) insightsModal.classList.add('show');
    });
  });

  // Close insights when close button is clicked
  if (insightsClose) {
    insightsClose.addEventListener('click', function() {
      insightsOverlay.classList.remove('show');
      insightsModal.classList.remove('show');
    });
  }

  // Metrics selector functionality
  document.querySelectorAll('.metric-button').forEach(button => {
    button.addEventListener('click', function() {
      // Remove selected class from all buttons
      document.querySelectorAll('.metric-button').forEach(btn => {
        btn.classList.remove('selected');
      });
      
      // Add selected class to clicked button
      this.classList.add('selected');
      
      // Here you would typically update the chart data
      // For demo purposes we're just alerting about the change
      const metricType = this.textContent.trim();
      console.log(`Switched to ${metricType} metrics`);
      
      // In a real application, you would update the chart here
      // updateChart(metricType);
    });
  });
});