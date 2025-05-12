document.addEventListener("DOMContentLoaded", function() {
  // Get the current page filename
  const currentPage = window.location.pathname.split("/").pop();
  
  // Insert header
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = `
      <div class="header">
        <div class="header-left">
          <button class="mobile-menu-toggle" id="mobileMenuToggle">
            <i class="fas fa-bars"></i>
          </button>
          <div class="header-brand">
            <div class="header-logo">
              <i class="fas fa-headset"></i>
            </div>
            <div class="metro-logo-text">METRO</div>
            <div class="metro-logo-subtitle">Call Center Coach</div>
          </div>
        </div>
        <div class="header-right">
          <div class="header-search">
            <i class="fas fa-search search-icon"></i>
            <input type="text" class="search-input" placeholder="Search agents, behaviors...">
          </div>
          <div class="header-notification">
            <i class="fas fa-bell"></i>
            <div class="notification-indicator"></div>
          </div>
          <div class="header-avatar">
            SM
          </div>
        </div>
      </div>
    `;
  }
  
  // Insert sidebar
  const sidebarContainer = document.getElementById('sidebar-container');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = `
      <div class="sidebar" id="sidebar">
        <div class="sidebar-section">
          <div class="sidebar-title">Coaching</div>
          <ul class="sidebar-menu">
            <li>
              <a href="index.html" class="sidebar-item ${currentPage === 'index.html' || currentPage === '' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-tachometer-alt"></i></div>
                <div class="sidebar-label">Dashboard</div>
              </a>
            </li>
            <li>
              <a href="active-coaching.html" class="sidebar-item ${currentPage === 'active-coaching.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-play-circle"></i></div>
                <div class="sidebar-label">Active Coaching</div>
                <div class="sidebar-badge badge-accent">2</div>
              </a>
            </li>
            <li>
              <a href="upcoming-sessions.html" class="sidebar-item ${currentPage === 'upcoming-sessions.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-calendar-alt"></i></div>
                <div class="sidebar-label">Upcoming Sessions</div>
                <div class="sidebar-badge">3</div>
              </a>
            </li>
            <li>
              <a href="action-items.html" class="sidebar-item ${currentPage === 'action-items.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-clipboard-check"></i></div>
                <div class="sidebar-label">Action Items</div>
                <div class="sidebar-badge badge-accent">5</div>
              </a>
            </li>
            <li>
              <a href="coaching-opportunities.html" class="sidebar-item ${currentPage === 'coaching-opportunities.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-lightbulb"></i></div>
                <div class="sidebar-label">Coaching Opportunities</div>
              </a>
            </li>
            <li>
              <a href="team-huddles.html" class="sidebar-item ${currentPage === 'team-huddles.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-users"></i></div>
                <div class="sidebar-label">Team Huddles</div>
              </a>
            </li>
            <li>
              <a href="coaching-history.html" class="sidebar-item ${currentPage === 'coaching-history.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-history"></i></div>
                <div class="sidebar-label">Coaching History</div>
              </a>
            </li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Insights</div>
          <ul class="sidebar-menu">
            <li>
              <a href="agent-performance.html" class="sidebar-item ${currentPage === 'agent-performance.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-chart-line"></i></div>
                <div class="sidebar-label">Agent Performance</div>
              </a>
            </li>
            <li>
              <a href="coach-performance.html" class="sidebar-item ${currentPage === 'coach-performance.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-award"></i></div>
                <div class="sidebar-label">Coach Performance</div>
              </a>
            </li>
            <li>
              <a href="team-overview.html" class="sidebar-item ${currentPage === 'team-overview.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-user-friends"></i></div>
                <div class="sidebar-label">My Team</div>
              </a>
            </li>
            <li>
              <a href="reports.html" class="sidebar-item ${currentPage === 'reports.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-file-alt"></i></div>
                <div class="sidebar-label">Reports</div>
              </a>
            </li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">Resources</div>
          <ul class="sidebar-menu">
            <li>
              <a href="coaching-guides.html" class="sidebar-item ${currentPage === 'coaching-guides.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-book"></i></div>
                <div class="sidebar-label">Coaching Guides</div>
              </a>
            </li>
            <li>
              <a href="templates.html" class="sidebar-item ${currentPage === 'templates.html' ? 'active' : ''}">
                <div class="sidebar-icon"><i class="fas fa-file-download"></i></div>
                <div class="sidebar-label">Templates</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');
  const formOverlay = document.getElementById('formOverlay');
  
  if (mobileMenuToggle && sidebar && formOverlay) {
    mobileMenuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('show');
      formOverlay.classList.toggle('show');
    });
  }
});