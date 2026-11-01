/**
 * Abdullah Mohsin — Technology, Research & Innovation Portfolio (Static Edition)
 * Pure Vanilla JavaScript — High Performance, Zero Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const introVideo = document.querySelector('.intro-video video');
  const videoPlayPrompt = document.getElementById('videoPlayPrompt');
  const videoPlayStatus = document.getElementById('videoPlayStatus');

  if (introVideo && videoPlayPrompt && videoPlayStatus) {
    introVideo.defaultMuted = false;
    introVideo.muted = false;
    introVideo.volume = 1;

    const showPlayPrompt = message => {
      videoPlayPrompt.hidden = false;
      videoPlayStatus.textContent = message;
      videoPlayStatus.hidden = !message;
    };

    const startVideo = async () => {
      try {
        await introVideo.play();
        videoPlayPrompt.hidden = true;
        videoPlayStatus.textContent = '';
        videoPlayStatus.hidden = true;
      } catch (error) {
        const autoplayWasBlocked = error.name === 'NotAllowedError';
        showPlayPrompt(autoplayWasBlocked ? '' : 'The video could not start. Check the video file, then try again.');
        if (!autoplayWasBlocked) {
          console.error('The introduction video could not start.', error);
        }
      }
    };

    videoPlayPrompt.addEventListener('click', async () => {
      introVideo.muted = false;
      introVideo.volume = 1;
      await startVideo();
    });

    introVideo.addEventListener('error', () => {
      showPlayPrompt('The video could not load. Check the video file and try again.');
    });

    if (motionPreference.matches) {
      showPlayPrompt('');
    } else {
      void startVideo();
    }
  }

  // 0. Pointer spotlight and scroll reveals
  if (!motionPreference.matches) {
    const revealTargets = document.querySelectorAll(
      '.section-title-wrap, .bio-card, .disclaimer-card, .research-card, .vein-box, .simulator-wrap, .team-card, .link-card, .evidence-banner, .timeline-item, .dataset-frame-summary, .press-feature, .portfolio-card, .experience-item, .skill-card, .social-links a'
    );

    if ('IntersectionObserver' in window) {
      document.body.classList.add('js-motion');
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealTargets.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.transitionDelay = `${(index % 4) * 70}ms`;
        revealObserver.observe(element);
      });
    }

    if (window.matchMedia('(pointer: fine)').matches) {
      const cursorOrb = document.createElement('span');
      cursorOrb.className = 'cursor-orb';
      cursorOrb.setAttribute('aria-hidden', 'true');
      document.body.append(cursorOrb);

      let pointerX = 0;
      let pointerY = 0;
      let orbX = 0;
      let orbY = 0;
      let frameRequested = false;

      const moveOrb = () => {
        orbX += (pointerX - orbX) * 0.22;
        orbY += (pointerY - orbY) * 0.22;
        cursorOrb.style.transform = `translate3d(${orbX}px, ${orbY}px, 0) translate(-50%, -50%)`;
        frameRequested = false;

        if (Math.abs(pointerX - orbX) > 0.5 || Math.abs(pointerY - orbY) > 0.5) {
          frameRequested = true;
          window.requestAnimationFrame(moveOrb);
        }
      };

      const clearCursorState = () => {
        document.body.dataset.cursorActive = 'false';
        document.body.dataset.interacting = 'false';
      };

      document.addEventListener('pointermove', event => {
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;

        pointerX = event.clientX;
        pointerY = event.clientY;
        document.body.style.setProperty('--pointer-x', `${pointerX}px`);
        document.body.style.setProperty('--pointer-y', `${pointerY}px`);
        document.body.dataset.cursorActive = 'true';

        if (!frameRequested) {
          frameRequested = true;
          window.requestAnimationFrame(moveOrb);
        }
      });

      document.addEventListener('pointerover', event => {
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        const target = event.target instanceof Element ? event.target : null;
        document.body.dataset.interacting = target?.closest('a, button, video, input, textarea, select') ? 'true' : 'false';
      });
      document.addEventListener('pointerout', event => {
        if (event.relatedTarget === null) clearCursorState();
      });
      window.addEventListener('blur', clearCursorState);
    }
  }

  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    // Close mobile menu on clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Open navigation menu');
        mobileToggle.focus();
      }
    });
  }

  // 2. Interactive Vein Compression Simulator
  const simProbe = document.getElementById('simProbe');
  const simVein = document.getElementById('simVein');
  const simToggleBtn = document.getElementById('simToggleBtn');
  const simNormalBtn = document.getElementById('simNormalBtn');
  const simThrombusBtn = document.getElementById('simThrombusBtn');
  const simStatusText = document.getElementById('simStatusText');
  const simBadge = document.getElementById('simBadge');

  let isCompressed = false;
  let isThrombusMode = true;

  function updateSimulatorUI() {
    // Update probe position
    if (isCompressed) {
      simProbe.classList.add('applied');
      simToggleBtn.textContent = 'Release Probe Pressure';
    } else {
      simProbe.classList.remove('applied');
      simToggleBtn.textContent = 'Apply Transducer Compression';
    }

    // Update vein appearance
    if (isThrombusMode) {
      simVein.classList.add('thrombus-mode');

      if (isCompressed) {
        simVein.classList.add('thrombus-compressed');
        simVein.classList.remove('normal-compressed');
        simStatusText.textContent = 'Illustration: The modeled clot remains within the lumen while the surrounding vein is pressed.';
        simStatusText.style.color = '#fda4af';
        simBadge.textContent = 'Thrombus example under pressure';
        simBadge.className = 'badge badge-rose';
      } else {
        simVein.classList.remove('thrombus-compressed');
        simVein.classList.remove('normal-compressed');
        simStatusText.textContent = 'Illustrative example of a vein with a modeled intraluminal thrombus.';
        simStatusText.style.color = '#cbd5e1';
        simBadge.textContent = 'Thrombus example';
        simBadge.className = 'badge badge-rose';
      }
    } else {
      simVein.classList.remove('thrombus-mode');
      simVein.classList.remove('thrombus-compressed');

      if (isCompressed) {
        simVein.classList.add('normal-compressed');
        simStatusText.textContent = 'Illustration: The modeled vein walls move closer together when pressure is applied.';
        simStatusText.style.color = '#6ee7b7';
        simBadge.textContent = 'Compressible example under pressure';
        simBadge.className = 'badge badge-teal';
      } else {
        simVein.classList.remove('normal-compressed');
        simStatusText.textContent = 'Illustrative example of an open vein before pressure is applied.';
        simStatusText.style.color = '#cbd5e1';
        simBadge.textContent = 'Compressible vein example';
        simBadge.className = 'badge badge-cyan';
      }
    }
  }

  if (simToggleBtn) {
    simToggleBtn.addEventListener('click', () => {
      isCompressed = !isCompressed;
      updateSimulatorUI();
    });
  }

  if (simNormalBtn) {
    simNormalBtn.addEventListener('click', () => {
      isThrombusMode = false;
      isCompressed = false;
      simNormalBtn.className = 'btn btn-primary';
      simThrombusBtn.className = 'btn btn-secondary';
      simNormalBtn.setAttribute('aria-pressed', 'true');
      simThrombusBtn.setAttribute('aria-pressed', 'false');
      updateSimulatorUI();
    });
  }

  if (simThrombusBtn) {
    simThrombusBtn.addEventListener('click', () => {
      isThrombusMode = true;
      isCompressed = false;
      simThrombusBtn.className = 'btn btn-rose';
      simNormalBtn.className = 'btn btn-secondary';
      simThrombusBtn.setAttribute('aria-pressed', 'true');
      simNormalBtn.setAttribute('aria-pressed', 'false');
      updateSimulatorUI();
    });
  }

  // 3. Dataset Documentation Modal
  const docModal = document.getElementById('docModal');
  const openDocBtn = document.getElementById('openDocBtn');
  const closeDocBtn = document.getElementById('closeDocBtn');
  const printDocBtn = document.getElementById('printDocBtn');

  if (openDocBtn && docModal) {
    openDocBtn.addEventListener('click', (e) => {
      e.preventDefault();
      docModal.classList.add('active');
    });
  }

  if (closeDocBtn && docModal) {
    closeDocBtn.addEventListener('click', () => {
      docModal.classList.remove('active');
    });
  }

  if (printDocBtn) {
    printDocBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Close modal when clicking outside box
  if (docModal) {
    docModal.addEventListener('click', (e) => {
      if (e.target === docModal) {
        docModal.classList.remove('active');
      }
    });
  }

  // 4. Milestone Timeline Filtering
  const filterBtns = document.querySelectorAll('.timeline-filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('btn-primary'));
      filterBtns.forEach(b => b.classList.add('btn-secondary'));
      btn.classList.remove('btn-secondary');
      btn.classList.add('btn-primary');

      const filter = btn.getAttribute('data-filter');

      timelineItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 5. Copyable direct email address
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailFeedback = document.getElementById('copyEmailFeedback');

  if (copyEmailBtn && copyEmailFeedback) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.dataset.email;

      if (!email || !navigator.clipboard?.writeText) {
        copyEmailFeedback.textContent = 'Clipboard access is unavailable. Select the email address above to copy it.';
        return;
      }

      try {
        await navigator.clipboard.writeText(email);
        copyEmailFeedback.textContent = 'Email address copied.';
      } catch {
        copyEmailFeedback.textContent = 'Clipboard access was blocked. Select the email address above to copy it.';
      }
    });
  }
});
