function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function addYears(dateStr, years) {
  const d = new Date(dateStr);
  d.setFullYear(d.getFullYear() + years);
  return d;
}

function addMonths(dateStr, months) {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d;
}

function isEligible(targetDate) {
  return new Date() >= targetDate;
}

function checkSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem('mmufos_user'));
    if (session) {
      showLoggedIn(session);
    }
  } catch (e) {}
}

function showLoggedIn(user) {
  const loginLink = document.getElementById('loginLink');
  const userWelcome = document.getElementById('userWelcome');
  const userName = document.getElementById('userName');

  if (loginLink) loginLink.closest('li').style.display = 'none';
  if (userWelcome) {
    userWelcome.style.display = 'flex';
    userName.textContent = user.name;
  }
}

function openLoginModal(e) {
  e.preventDefault();
  document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.remove('active');
}

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value.toLowerCase().trim();
  const password = document.getElementById('loginPassword').value;

  const userData = await authenticateUser(username, password);
  if (userData) {
    sessionStorage.setItem('mmufos_user', JSON.stringify(userData));
    closeLoginModal();
    showLoggedIn(userData);
  } else {
    alert('Invalid username or password. Try: demo / demo');
  }
}

function toggleDashboard(e) {
  e.preventDefault();
  try {
    const session = JSON.parse(sessionStorage.getItem('mmufos_user'));
    if (session) {
      const title = document.getElementById('dashboardTitle');
      const totalEl = document.getElementById('totalAdvance');
      const nonAllocEl = document.getElementById('nonAllocated');

      title.textContent = session.name + ' — Advance Summary';
      totalEl.textContent = '₹' + session.totalAdvance.toLocaleString('en-IN');
      nonAllocEl.textContent = '₹' + session.nonAllocated.toLocaleString('en-IN');

      const refundDateEl = document.getElementById('refundEligibleDate');
      const refundStatusEl = document.getElementById('refundStatus');
      if (refundDateEl && session.advanceDate) {
        const refundDate = addYears(session.advanceDate, 3);
        refundDateEl.textContent = formatDate(refundDate.toISOString().split('T')[0]);
        if (session.nonAllocated > 0) {
          if (isEligible(refundDate)) {
            refundStatusEl.textContent = 'Eligible for refund';
            refundStatusEl.className = 'refund-status eligible';
          } else {
            refundStatusEl.textContent = 'Not yet eligible';
            refundStatusEl.className = 'refund-status not-eligible';
          }
        } else {
          refundStatusEl.textContent = 'Fully allocated';
          refundStatusEl.className = 'refund-status eligible';
        }
      }

      const allocBody = document.getElementById('allocationBody');
      const rentNote = document.getElementById('rentNote');
      if (allocBody) {
        allocBody.innerHTML = '';
        if (session.allocations && session.allocations.length > 0) {
          session.allocations.forEach((a, idx) => {
            const exitDate = addMonths(a.allocatedDate, 24);
            const canExit = isEligible(exitDate);
            const tr = document.createElement('tr');
            tr.innerHTML =
              '<td>' + a.property + '</td>' +
              '<td>' + a.sqft + ' sq ft</td>' +
              '<td>₹' + a.amount.toLocaleString('en-IN') + '</td>' +
              '<td>₹' + a.rentPerMonth.toLocaleString('en-IN') + '</td>' +
              '<td>' + formatDate(exitDate.toISOString().split('T')[0]) +
              '<br><span class="exit-status ' + (canExit ? 'can-exit' : 'locked') + '">' +
              (canExit ? 'Can exit' : 'Locked') + '</span></td>' +
              '<td><button class="btn-cert" onclick="showCertificate(' + idx + ')">View</button></td>';
            allocBody.appendChild(tr);
          });
        } else {
          allocBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--color-text-light);">No allocations yet</td></tr>';
        }
      }
      if (rentNote) {
        rentNote.style.display = session.nonAllocated > 0 ? 'block' : 'none';
      }

      document.getElementById('dashboardModal').classList.add('active');
    }
  } catch (e) {}
}

function showCertificate(idx) {
  try {
    const session = JSON.parse(sessionStorage.getItem('mmufos_user'));
    if (!session || !session.allocations[idx]) return;

    const a = session.allocations[idx];
    const certModal = document.getElementById('certificateModal');
    const certBody = document.getElementById('certificateBody');

    certBody.innerHTML =
      '<div class="cert-header">' +
        '<div class="cert-logo">MMUFoS</div>' +
        '<div class="cert-org">Mediators Market of Universe</div>' +
        '<div class="cert-subtitle">Fractional Ownership of Space — Certificate</div>' +
      '</div>' +
      '<div class="cert-number">Certificate No: ' + a.certNo + '</div>' +
      '<div class="cert-content">' +
        '<p>Congratulations, your token advance has been allocated as advance for sale of this particular property:</p>' +
        '<div class="cert-property">' + a.property + '</div>' +
        '<div class="cert-details-grid">' +
          '<div class="cert-detail"><span class="cert-label">Owner</span><span class="cert-value">' + session.name + '</span></div>' +
          '<div class="cert-detail"><span class="cert-label">Space Owned</span><span class="cert-value">' + a.sqft + ' sq ft</span></div>' +
          '<div class="cert-detail"><span class="cert-label">Advance Allocated</span><span class="cert-value">₹' + a.amount.toLocaleString('en-IN') + '</span></div>' +
          '<div class="cert-detail"><span class="cert-label">Monthly Rent</span><span class="cert-value">₹' + a.rentPerMonth.toLocaleString('en-IN') + '</span></div>' +
          '<div class="cert-detail"><span class="cert-label">Allocated Date</span><span class="cert-value">' + formatDate(a.allocatedDate) + '</span></div>' +
          '<div class="cert-detail"><span class="cert-label">Earliest Exit</span><span class="cert-value">' + formatDate(addMonths(a.allocatedDate, 24).toISOString().split('T')[0]) + '</span></div>' +
        '</div>' +
        '<p class="cert-blocked">This property is blocked to you as the owner of the above fractional space.</p>' +
      '</div>' +
      '<div class="cert-footer">' +
        '<p class="cert-disclaimer">FoS (Fractional Ownership of Space) is not registered. Only UDS (Undivided Share of Land) will be registered. Token advances are in multiples of ₹500.</p>' +
        '<div class="cert-seal">Authorised by MMUFoS<br>Chennai, Tamil Nadu</div>' +
      '</div>';

    certModal.classList.add('active');
  } catch (e) {}
}

function closeCertificate() {
  document.getElementById('certificateModal').classList.remove('active');
}

function closeDashboard() {
  document.getElementById('dashboardModal').classList.remove('active');
}

function handleLogout() {
  sessionStorage.removeItem('mmufos_user');
  closeDashboard();
  const loginLink = document.getElementById('loginLink');
  const userWelcome = document.getElementById('userWelcome');
  if (loginLink) loginLink.closest('li').style.display = '';
  if (userWelcome) userWelcome.style.display = 'none';
}

function validateAdvanceMultiple(input) {
  const val = parseInt(input.value, 10);
  if (val && val % 500 !== 0) {
    input.setCustomValidity('Token advance must be in multiples of ₹500');
    input.reportValidity();
  } else {
    input.setCustomValidity('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  checkSession();

  const advanceInputs = document.querySelectorAll('input[data-advance-input]');
  advanceInputs.forEach(input => {
    input.setAttribute('step', '500');
    input.setAttribute('min', '500');
    input.addEventListener('change', () => validateAdvanceMultiple(input));
  });
});
