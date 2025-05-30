document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const agent = urlParams.get('agent') || 'Agent';
  const behavior = urlParams.get('behavior') || 'Coaching';

  const agentNameSpan = document.getElementById('agentName');
  const formAgentName = document.getElementById('formAgentName');
  const formBehavior = document.getElementById('formBehavior');
  const formOverlay = document.getElementById('formOverlay');
  const coachingForm = document.getElementById('coachingForm');

  if (agentNameSpan) agentNameSpan.textContent = agent;
  if (formAgentName) formAgentName.value = agent;
  if (formBehavior) formBehavior.value = behavior;
  if (formOverlay) formOverlay.classList.add('show');

  // Save/Submit buttons
  const saveFormDraft = document.getElementById('saveFormDraft');
  if (saveFormDraft) {
    saveFormDraft.addEventListener('click', function () {
      alert('Coaching form draft saved successfully!');
    });
  }

  const submitForm = document.getElementById('submitForm');
  if (submitForm) {
    submitForm.addEventListener('click', function () {
      alert('Coaching session completed successfully!');
      formOverlay.classList.remove('show');
      coachingForm.classList.remove('show');
    });
  }

  // Close button
  const formClose = document.getElementById('formClose');
  if (formClose) {
    formClose.addEventListener('click', function () {
      formOverlay.classList.remove('show');
      coachingForm.classList.remove('show');
    });
  }
});


  // Add item functionality for lists
  function setupAddButton(buttonId, listId, placeholder) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    
    button.addEventListener('click', function() {
      const list = document.getElementById(listId);
      if (!list) return;
      
      const newItem = document.createElement('li');
      newItem.className = 'input-list-item';
      newItem.innerHTML = `
        <input type="text" class="input-list-field" placeholder="${placeholder}">
        <button class="input-list-remove"><i class="fas fa-times"></i></button>
      `;
      
      // Add remove functionality to the new button
      newItem.querySelector('.input-list-remove').addEventListener('click', function() {
        list.removeChild(newItem);
      });
      
      list.appendChild(newItem);
      
      // Focus the new input
      newItem.querySelector('.input-list-field').focus();
    });
  }

  // Setup add buttons for each list
  setupAddButton('addGoal', 'goalsList', 'Enter a goal...');
  setupAddButton('addObstacle', 'obstaclesList', 'Enter an obstacle...');
  setupAddButton('addStrategy', 'strategiesList', 'Enter a strategy...');
  setupAddButton('addAction', 'actionsList', 'Enter an action item...');

  // Add remove functionality to existing list items
  document.querySelectorAll('.input-list-remove').forEach(button => {
    button.addEventListener('click', function() {
      const listItem = this.parentElement;
      const list = listItem.parentElement;
      list.removeChild(listItem);
    });
  });

  // Save draft and submit form functionality
  const saveFormDraft = document.getElementById('saveFormDraft');
  if (saveFormDraft) {
    saveFormDraft.addEventListener('click', function() {
      alert('Coaching form draft saved successfully!');
    });
  }

  const submitForm = document.getElementById('submitForm');
  if (submitForm) {
    submitForm.addEventListener('click', function() {
      alert('Coaching session completed successfully!');
      formOverlay.classList.remove('show');
      coachingForm.classList.remove('show');
    });
  }