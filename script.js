document.addEventListener('DOMContentLoaded', () => {
  // --- MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  const menuLinks = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Animate burger menu lines
      const spans = menuToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile menu when a link is clicked
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // --- HEADER SCROLL ACTION ---
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- SCROLLSPY / ACTIVE NAV LINKS ---
  const sections = document.querySelectorAll('section, header');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').slice(1) === current) {
        item.classList.add('active');
      }
    });
  });

  // --- CONTACT FORM HANDLER ---
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalBtnText = submitBtn.innerHTML;
      
      // Simple validation
      const name = document.getElementById('formName').value.trim();
      const message = document.getElementById('formMessage').value.trim();
      const subject = document.getElementById('formSubject').value.trim() || 'Belirtilmedi';

      if (!name || !message) {
        showStatus('Lütfen tüm zorunlu alanları doldurun.', 'error');
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff" style="animation: rotate 1s linear infinite; margin-right: 8px;">
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
              <path d="M36 18c0-9.94-8.06-18-18-18"></path>
            </g>
          </g>
        </svg> Yönlendiriliyor...
      `;

      // Construct WhatsApp message and redirect
      setTimeout(() => {
        const formattedMsg = `*Yeni Klima Servis Talebi - Onur Klima*\n\n` +
                             `*Ad Soyad:* ${name}\n` +
                             `*Hizmet Konusu:* ${subject}\n` +
                             `*Mesaj:* ${message}`;
        
        const encodedMsg = encodeURIComponent(formattedMsg);
        const whatsappUrl = `https://wa.me/905051888590?text=${encodedMsg}`;
        
        window.open(whatsappUrl, '_blank');
        
        showStatus('Bilgileriniz WhatsApp mesajı olarak yönlendirildi! Yavuz Bey ile sohbet penceresi açılıyor.', 'success');
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 1000);
    });
  }

  function showStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 5000);
  }
});

// Keyframe rotation for loading spinner injected dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes rotate {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Hizmet WhatsApp Popup

const wpModal = document.getElementById("wpModal");
const wpServiceTitle = document.getElementById("wpServiceTitle");
const wpName = document.getElementById("wpName");

let selectedService = "";

document.querySelectorAll(".whatsapp-service").forEach(btn => {

    btn.addEventListener("click", function(e){

        e.preventDefault();

        selectedService = this.dataset.service;

        wpServiceTitle.innerHTML =
        "<strong>"+selectedService+"</strong> için bilgi almak istiyorsunuz.";

        wpModal.classList.add("active");

    });

});

document.getElementById("closeWpModal").onclick=function(){

    wpModal.classList.remove("active");

}

window.onclick=function(e){

    if(e.target==wpModal){

        wpModal.classList.remove("active");

    }

}

document.getElementById("sendWpMessage").onclick=function(){

    const name=wpName.value.trim();

    if(name==""){

        alert("Lütfen adınızı yazınız.");

        return;

    }

    const message=
`Merhaba Yavuz Bey.

Adım ${name}

${selectedService} hizmeti hakkında bilgi almak istiyorum.

Müsait olduğunuzda dönüş sağlayabilir misiniz?`;

    window.open(
        "https://wa.me/905051888590?text="+encodeURIComponent(message),
        "_blank"
    );

    wpName.value="";

    wpModal.classList.remove("active");

}