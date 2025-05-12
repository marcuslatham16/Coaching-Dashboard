document.addEventListener('DOMContentLoaded', function() {
  // Tab switching functionality
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all tab content
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Show the corresponding tab content
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Checkbox functionality for follow-ups
  document.querySelectorAll('.custom-checkbox').forEach((checkbox, index) => {
    checkbox.addEventListener('click', function() {
      this.classList.toggle('checked');
      const titleId = `title${index + 1}`;
      document.getElementById(titleId).classList.toggle('completed');
    });
  });

  // Overlay click to close sidebars, modals, etc.
  const formOverlay = document.getElementById('formOverlay');
  if (formOverlay) {
    formOverlay.addEventListener('click', function() {
      formOverlay.classList.remove('show');
      
      // Close coaching form if open
      const coachingForm = document.getElementById('coachingForm');
      if (coachingForm) {
        coachingForm.classList.remove('show');
      }
      
      // Close sidebar if open
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.remove('show');
      }
    });
  }

  // Insights overlay
  const insightsOverlay = document.getElementById('insightsOverlay');
  if (insightsOverlay) {
    insightsOverlay.addEventListener('click', function() {
      insightsOverlay.classList.remove('show');
      
      // Close insights modal if open
      const insightsModal = document.getElementById('insightsModal');
      if (insightsModal) {
        insightsModal.classList.remove('show');
      }
    });
  }

  // Toggle session details panel
  document.querySelectorAll('.active-session-header').forEach(header => {
    header.addEventListener('click', function(event) {
      // Don't toggle if clicking on the continue button
      if (event.target.closest('.continue-btn')) {
        return;
      }

      const targetId = this.getAttribute('data-target');
      const detailsPanel = document.querySelector(targetId);
      
      // Toggle show class on the details panel
      detailsPanel.classList.toggle('show');
      
      // Toggle expanded class on the header for rotating the chevron
      this.classList.toggle('expanded');
    });
  });

  // Prevent continue button from toggling the panel when clicked
  document.querySelectorAll('.continue-btn').forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      alert('Continuing session...');
    });
  });

  // Reschedule button functionality
  const rescheduleBtn = document.getElementById('rescheduleBtn');
  if (rescheduleBtn) {
    rescheduleBtn.addEventListener('click', function() {
      alert('Rescheduling interface would open here. This button would typically open a calendar view to pick a new date/time.');
    });
  }
});