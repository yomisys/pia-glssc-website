document.addEventListener('DOMContentLoaded', function () {

  // ── Hamburger navigation ──────────────────────────────────────────────────
  var hamburger = document.querySelector('.nav-hamburger');
  var navLinks  = document.querySelector('.nav-links');

  function openMenu() {
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Toggle navigation');
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      if (navLinks.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when any nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    // Close when clicking outside the nav
    document.addEventListener('click', function (e) {
      if (!e.target.closest('nav')) closeMenu();
    });
  }

  // ── Application Form ──────────────────────────────────────────────────────
  const form        = document.getElementById('application-form');
  const successMsg  = document.getElementById('form-success');
  const errorBanner = document.getElementById('form-error-banner');

  if (!form || !successMsg) return;

  // Fields that must be filled before submission
  const REQUIRED = [
    { name: 'first-name', label: 'First name' },
    { name: 'last-name',  label: 'Last name'  },
    { name: 'email',      label: 'Email address', type: 'email' },
    { name: 'company',    label: 'Company name'  },
    { name: 'industry',   label: 'Industry'      },
    { name: 'level',      label: 'Certification level' },
  ];

  function field(name)  { return form.querySelector('[name="' + name + '"]'); }
  function errEl(name)  { return document.getElementById('error-' + name);    }

  function showError(name, msg) {
    var el  = field(name);
    var err = errEl(name);
    if (el)  el.closest('.form-group').classList.add('has-error');
    if (err) err.textContent = msg;
  }

  function clearError(name) {
    var el  = field(name);
    var err = errEl(name);
    if (el)  el.closest('.form-group').classList.remove('has-error');
    if (err) err.textContent = '';
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function validate() {
    var valid = true;
    REQUIRED.forEach(function (f) {
      var el  = field(f.name);
      if (!el) return;
      var val = el.value.trim();
      if (!val) {
        showError(f.name, f.label + ' is required.');
        valid = false;
      } else if (f.type === 'email' && !isValidEmail(val)) {
        showError(f.name, 'Please enter a valid email address.');
        valid = false;
      } else {
        clearError(f.name);
      }
    });
    return valid;
  }

  // Clear each field's error as the user types or changes selection
  REQUIRED.forEach(function (f) {
    var el = field(f.name);
    if (!el) return;
    var evt = el.tagName === 'SELECT' ? 'change' : 'input';
    el.addEventListener(evt, function () { clearError(f.name); });
  });

  // ── Form submit ───────────────────────────────────────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset banner from any previous attempt
    errorBanner.hidden = true;
    errorBanner.textContent = '';

    if (!validate()) {
      // Scroll first error into view
      var firstBad = form.querySelector('.has-error');
      if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    var btn      = form.querySelector('.submit-btn');
    var origText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled    = true;

    fetch(form.action, {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    new FormData(form),
    })
      .then(function (res) {
        if (res.ok) {
          // Success — swap form for confirmation
          var firstName = field('first-name').value.trim();
          var nameEl    = successMsg.querySelector('.js-applicant-name');
          if (nameEl) nameEl.textContent = firstName;
          form.style.display = 'none';
          successMsg.classList.add('visible');
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          return res.json().then(function (data) {
            throw new Error(
              (data.errors && data.errors.map(function (e) { return e.message; }).join(', ')) ||
              data.error ||
              'Submission failed.'
            );
          });
        }
      })
      .catch(function (err) {
        btn.textContent = origText;
        btn.disabled    = false;
        errorBanner.textContent = err.message ||
          'Something went wrong. Please check your connection and try again.';
        errorBanner.hidden = false;
        errorBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
  });

  // ── Smooth-scroll nav links (belt-and-suspenders for older browsers) ─────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
