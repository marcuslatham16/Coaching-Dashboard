/**
 * Call Center Coaching Tool - Main JavaScript
 * 
 * This file contains the core functionality for the application
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  setupMobileMenu();
  
  // Tabs
  setupTabs();

  // Checkboxes
  setupCheckboxes();
  
  // Session expansion
  setupSessionExpansion();
  
  // Session action buttons
  setupActionButtons();
  
  // Set up form interactions
  setupCoachingForm();
  
  // Set up insights modal
  setupInsightsModal();
  
  // Show a welcome toast on first load
  showToast('Welcome back!', 'You have 3 upcoming coaching sessions today.', 'info');
});

/**
 * Mobile menu functionality
 */
function setupMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('formOverlay');
  
  if (!mobileMenuToggle || !sidebar || !overlay) return;
  
  mobileMenuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('show');
  });
  
  // Close sidebar when overlay is clicked
  overlay.addEventListener('click', function(e) {
    // Only close sidebar if we're not clicking on a modal
    if (!e.target.closest('.coaching-form-container') && 
        !e.target.closest('.insights-container')) {
      sidebar.classList.remove('show');
      
      // Only hide overlay if no other modals are open
      if (!document.querySelector('.coaching-form-container.show') && 
          !document.querySelector('.insights-container.show')) {
        overlay.classList.remove('show');
      }
    }
  });
}

/**
 * Tab switching functionality
 */
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all tab content
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(content => {
        content.classList.remove('active');
      });
      
      // Show the corresponding tab content
      const tabId = this.getAttribute('data-tab');
      const activeContent = document.getElementById(tabId);
      if (activeContent) {
        activeContent.classList.add('active');
        activeContent.classList.add('fade-in');
        // Remove the animation class after it plays
        setTimeout(() => {
          activeContent.classList.remove('fade-in');
        }, 300);
      }
    });
  });
}

/**
 * Checkbox functionality
 */
function setupCheckboxes() {
  const checkboxes = document.querySelectorAll('.custom-checkbox');
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', function() {
      this.classList.toggle('checked');
      const isChecked = this.classList.contains('checked');
      
      // Update ARIA attribute
      this.setAttribute('aria-checked', isChecked ? 'true' : 'false');
      
      // Find associated title if any
      const itemId = this.id;
      if (itemId) {
        const titleId = itemId.replace('checkbox', 'title');
        const titleElement = document.getElementById(titleId);
        if (titleElement) {
          titleElement.classList.toggle('completed', isChecked);
        }
      }
    });
    
    // Keyboard support for checkboxes
    checkbox.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

/**
 * Expandable session panels
 */
function setupSessionExpansion() {
  const sessionHeaders = document.querySelectorAll('.active-session-header');
  
  sessionHeaders.forEach(header => {
    header.addEventListener('click', function(event) {
      // Don't toggle if clicking on the continue button
      if (event.target.closest('.continue-btn')) {
        return;
      }
      
      const targetId = this.getAttribute('data-target');
      const detailsPanel = document.querySelector(targetId);
      
      if (!detailsPanel) return;
      
      // Toggle show class on the details panel
      detailsPanel.classList.toggle('show');
      
      // Toggle expanded class on the header for rotating the chevron
      this.classList.toggle('expanded');
      
      // Update ARIA attributes
      const expanded = detailsPanel.classList.contains('show');
      this.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      detailsPanel.setAttribute('aria-hidden', expanded ? 'false' : 'true');
    });
    
    // Keyboard support for session expansion
    header.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Prevent continue button from toggling the panel when clicked
  document.querySelectorAll('.continue-btn').forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      showToast('Session Continued', 'Redirecting to active coaching session...', 'info');
      // In a real application, this would redirect to the session page
    });
  });
}

/**
 * Action buttons (coach, prepare, schedule)
 */
function setupActionButtons() {
  // Reschedule button
  const rescheduleBtn = document.getElementById('rescheduleBtn');
  if (rescheduleBtn) {
    rescheduleBtn.addEventListener('click', function() {
      showToast('Rescheduling', 'Opening calendar to reschedule session...', 'info');
      // In a real application, this would open a scheduling modal
    });
  }
  
  // Coach and Prepare buttons
  document.querySelectorAll('.session-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const agent = this.getAttribute('data-agent');
      const behavior = this.getAttribute('data-behavior');
      
      if (this.textContent.trim().includes('Coach')) {
        openCoachingForm(agent, behavior);
      } else if (this.textContent.trim().includes('Prepare')) {
        showToast('Preparation', `Opening preparation materials for ${agent}'s ${behavior} session...`, 'info');
        // In a real application, this would open preparation materials
      } else if (this.textContent.trim().includes('Schedule')) {
        showToast('Scheduling', `Opening calendar to schedule session with ${agent}...`, 'info');
        // In a real application, this would open a scheduling modal
      }
    });
  });
  
  // Insights icons
  document.querySelectorAll('.insights-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const agent = this.getAttribute('data-agent');
      openInsightsModal(agent);
    });
    
    // Keyboard support for insights icons
    icon.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

/**
 * Coaching form functionality
 */
function setupCoachingForm() {
  const formOverlay = document.getElementById('formOverlay');
  const coachingForm = document.getElementById('coachingForm');
  const formClose = document.getElementById('formClose');
  const saveFormDraft = document.getElementById('saveFormDraft');
  const submitForm = document.getElementById('submitForm');
  
  if (!formOverlay || !coachingForm || !formClose) return;
  
  // Close form when close button is clicked
  formClose.addEventListener('click', function() {
    closeCoachingForm();
  });
  
  // Form action buttons
  if (saveFormDraft) {
    saveFormDraft.addEventListener('click', function() {
      showToast('Draft Saved', 'Your coaching form draft has been saved.', 'success');
    });
  }
  
  if (submitForm) {
    submitForm.addEventListener('click', function() {
      showToast('Session Completed', 'Your coaching session has been completed and saved.', 'success');
      closeCoachingForm();
      // In a real application, this would submit the form data
    });
  }
  
  // Add item functionality for lists
  setupAddButtons();
  
  // Add remove functionality to existing list items
  setupRemoveButtons();
}

/**
 * Open the coaching form
 */
function openCoachingForm(agent, behavior) {
  const formOverlay = document.getElementById('formOverlay');
  const coachingForm = document.getElementById('coachingForm');
  const agentNameSpan = document.getElementById('agentName');
  const formAgentName = document.getElementById('formAgentName');
  const formBehavior = document.getElementById('formBehavior');
  
  // Update form with agent info
  if (agentNameSpan) agentNameSpan.textContent = agent;
  if (formAgentName) formAgentName.value = agent;
  if (formBehavior) formBehavior.value = behavior;
  
  // Show form and overlay
  if (formOverlay) formOverlay.classList.add('show');
  if (coachingForm) {
    coachingForm.classList.add('show');
    // Set focus to the first input after the form is visible
    setTimeout(() => {
      const firstInput = coachingForm.querySelector('input:not([readonly])');
      if (firstInput) firstInput.focus();
    }, 100);
  }
}

/**
 * Close the coaching form
 */
function closeCoachingForm() {
  const formOverlay = document.getElementById('formOverlay');
  const coachingForm = document.getElementById('coachingForm');
  const sidebar = document.getElementById('sidebar');
  
  if (coachingForm) coachingForm.classList.remove('show');
  
  // Only hide overlay if sidebar is not showing
  if (formOverlay && !sidebar.classList.contains('show')) {
    formOverlay.classList.remove('show');
  }
}

/**
 * Setup add buttons for form lists
 */
function setupAddButtons() {
  setupAddButton('addGoal', 'goalsList', 'Enter a goal...');
  setupAddButton('addObstacle', 'obstaclesList', 'Enter an obstacle...');
  setupAddButton('addStrategy', 'strategiesList', 'Enter a strategy...');
  setupAddButton('addAction', 'actionsList', 'Enter an action item...');
}

/**
 * Add button functionality for a specific list
 */
function setupAddButton(buttonId, listId, placeholder) {
  const button = document.getElementById(buttonId);
  if (!button) return;
  
  button.addEventListener('click', function() {
    const list = document.getElementById(listId);
    if (!list) return;
    
    const newItem = document.createElement('li');
    newItem.className = 'input-list-item fade-in';
    newItem.innerHTML = `
      <input type="text" class="input-list-field" placeholder="${placeholder}">
      <button class="input-list-remove" aria-label="Remove item"><i class="fas fa-times"></i></button>
    `;
    
    // Add remove functionality to the new button
    const removeButton = newItem.querySelector('.input-list-remove');
    removeButton.addEventListener('click', function() {
      list.removeChild(newItem);
    });
    
    list.appendChild(newItem);
    
    // Focus the new input
    const newInput = newItem.querySelector('.input-list-field');
    newInput.focus();
    
    // Remove animation class after it plays
    setTimeout(() => {
      newItem.classList.remove('fade-in');
    }, 300);
  });
}

/**
 * Setup remove buttons for existing list items
 */
function setupRemoveButtons() {
  document.querySelectorAll('.input-list-remove').forEach(button => {
    button.addEventListener('click', function() {
      const listItem = this.parentElement;
      const list = listItem.parentElement;
      list.removeChild(listItem);
    });
  });
}

/**
 * Insights modal functionality
 */
function setupInsightsModal() {
  const insightsOverlay = document.getElementById('insightsOverlay');
  const insightsModal = document.getElementById('insightsModal');
  const insightsClose = document.getElementById('insightsClose');
  
  if (!insightsOverlay || !insightsModal || !insightsClose) return;
  
  // Close insights when close button is clicked
  insightsClose.addEventListener('click', function() {
    closeInsightsModal();
  });
  
  // Close insights when overlay is clicked
  insightsOverlay.addEventListener('click', function(e) {
    if (!e.target.closest('.insights-container')) {
      closeInsightsModal();
    }
  });
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (insightsModal.classList.contains('show')) {
        closeInsightsModal();
      }
      if (document.getElementById('coachingForm').classList.contains('show')) {
        closeCoachingForm();
      }
    }
  });
}

/**
 * Open the insights modal for a specific agent
 */
function openInsightsModal(agent) {
  const insightsOverlay = document.getElementById('insightsOverlay');
  const insightsModal = document.getElementById('insightsModal');
  const insightsAgentName = document.getElementById('insightsAgentName');
  
  // Update insights with agent info
  if (insightsAgentName) insightsAgentName.textContent = agent;
  
  // Show insights and overlay
  if (insightsOverlay) insightsOverlay.classList.add('show');
  if (insightsModal) {
    insightsModal.classList.add('show');
    // Set focus to the close button after the modal is visible
    setTimeout(() => {
      const closeButton = insightsModal.querySelector('#insightsClose');
      if (closeButton) closeButton.focus();
    }, 100);
  }
}

/**
 * Close the insights modal
 */
function closeInsightsModal() {
  const insightsOverlay = document.getElementById('insightsOverlay');
  const insightsModal = document.getElementById('insightsModal');
  const sidebar = document.getElementById('sidebar');
  
  if (insightsModal) insightsModal.classList.remove('show');
  
  // Only hide overlay if sidebar is not showing
  if (insightsOverlay && !sidebar.classList.contains('show')) {
    insightsOverlay.classList.remove('show');
  }
}

/**
 * Toast notification system
 */
function showToast(title, message, type = 'info') {
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
  closeButton.addEventListener('click', () => closeToast(toast));
  
  // Auto close after 5 seconds
  setTimeout(() => closeToast(toast), 5000);
}

/**
 * Close a toast notification
 */
function closeToast(toast) {
  // Don't try to close it twice
  if (toast.classList.contains('hiding')) return;
  
  // Add the hiding class for animation
  toast.classList.add('hiding');
  
  // Remove after animation completes
  setTimeout(() => {
    if (toast.parentElement) {
      toast.parentElement.removeChild(toast);
    }
  }, 300);
}