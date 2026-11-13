document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  window.sendWhatsApp = function(e) {
    e.preventDefault();
    const name = document.getElementById('cName').value;
    const email = document.getElementById('cEmail').value;
    const phone = document.getElementById('cPhone').value;
    const property = document.getElementById('cProperty').value;
    const amount = document.getElementById('cAmount').value;
    const message = document.getElementById('cMessage').value;

    const text = '*New MMUFoS Inquiry*\n\n' +
      '*Name:* ' + name + '\n' +
      '*Email:* ' + email + '\n' +
      '*Phone:* ' + phone + '\n' +
      '*Property:* ' + property + '\n' +
      '*Token Advance:* ₹' + Number(amount).toLocaleString('en-IN') + '\n' +
      (message ? '*Message:* ' + message : '');

    const url = 'https://wa.me/919940017933?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
    document.getElementById('contactForm').reset();
  };

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.about-card, .step, .property-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
