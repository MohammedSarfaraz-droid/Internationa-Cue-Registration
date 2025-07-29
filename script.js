let currentSlideIndex = 0;
const slides = document.querySelectorAll( '.carousel-slide' );
const indicators = document.querySelectorAll( '.indicator' );
let autoSlideInterval;
let touchStartX = 0;
let touchEndX = 0;

function showSlide( index ) {
    // Hide all slides
    slides.forEach( slide => slide.classList.remove( 'active' ) );
    indicators.forEach( indicator => indicator.classList.remove( 'active' ) );

    // Show current slide
    slides[ index ].classList.add( 'active' );
    indicators[ index ].classList.add( 'active' );
}

function changeSlide( direction ) {
    currentSlideIndex += direction;

    if ( currentSlideIndex >= slides.length ) {
        currentSlideIndex = 0;
    } else if ( currentSlideIndex < 0 ) {
        currentSlideIndex = slides.length - 1;
    }

    showSlide( currentSlideIndex );
}

function currentSlide( index ) {
    currentSlideIndex = index - 1;
    showSlide( currentSlideIndex );
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval( () => {
        changeSlide( 1 );
    }, 5000 );
}

function resetAutoSlide() {
    clearInterval( autoSlideInterval );
    startAutoSlide();
}

// Touch gesture support
function handleTouchStart( e ) {
    touchStartX = e.changedTouches[ 0 ].screenX;
}

function handleTouchEnd( e ) {
    touchEndX = e.changedTouches[ 0 ].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if ( Math.abs( diff ) > swipeThreshold ) {
        if ( diff > 0 ) {
            // Swipe left - next slide
            changeSlide( 1 );
        } else {
            // Swipe right - previous slide
            changeSlide( -1 );
        }
        resetAutoSlide();
    }
}

// Initialize carousel
document.addEventListener( 'DOMContentLoaded', function () {
    startAutoSlide();

    // Add touch event listeners
    const carouselContainer = document.querySelector( '.carousel-container' );
    carouselContainer.addEventListener( 'touchstart', handleTouchStart, false );
    carouselContainer.addEventListener( 'touchend', handleTouchEnd, false );

    // Pause auto-slide on hover (desktop)
    carouselContainer.addEventListener( 'mouseenter', () => {
        clearInterval( autoSlideInterval );
    } );

    carouselContainer.addEventListener( 'mouseleave', () => {
        startAutoSlide();
    } );

    // Keyboard navigation
    document.addEventListener( 'keydown', ( e ) => {
        if ( e.key === 'ArrowLeft' ) {
            changeSlide( -1 );
            resetAutoSlide();
        } else if ( e.key === 'ArrowRight' ) {
            changeSlide( 1 );
            resetAutoSlide();
        }
    } );

    // Navigation button event listeners
    document.querySelector( '.carousel-btn.prev' ).addEventListener( 'click', () => {
        changeSlide( -1 );
        resetAutoSlide();
    } );

    document.querySelector( '.carousel-btn.next' ).addEventListener( 'click', () => {
        changeSlide( 1 );
        resetAutoSlide();
    } );
} );

// Handle visibility change (pause when tab is not active)
document.addEventListener( 'visibilitychange', () => {
    if ( document.hidden ) {
        clearInterval( autoSlideInterval );
    } else {
        startAutoSlide();
    }
} );



// Mobile menu functionality
const hamburger = document.getElementById( 'hamburger' );
const mobileMenu = document.getElementById( 'mobileMenu' );
const overlay = document.getElementById( 'overlay' );
const header = document.getElementById( 'header' );

// Toggle mobile menu
hamburger.addEventListener( 'click', () => {
    hamburger.classList.toggle( 'active' );
    mobileMenu.classList.toggle( 'active' );
    overlay.classList.toggle( 'active' );
    document.body.style.overflow = mobileMenu.classList.contains( 'active' ) ? 'hidden' : '';
} );

// Close mobile menu when overlay is clicked
overlay.addEventListener( 'click', () => {
    hamburger.classList.remove( 'active' );
    mobileMenu.classList.remove( 'active' );
    overlay.classList.remove( 'active' );
    document.body.style.overflow = '';
} );

// Close mobile menu when a link is clicked
const mobileLinks = mobileMenu.querySelectorAll( 'a' );
mobileLinks.forEach( link => {
    link.addEventListener( 'click', () => {
        hamburger.classList.remove( 'active' );
        mobileMenu.classList.remove( 'active' );
        overlay.classList.remove( 'active' );
        document.body.style.overflow = '';
    } );
} );

// Header scroll effect
window.addEventListener( 'scroll', () => {
    if ( window.scrollY > 50 ) {
        header.classList.add( 'scrolled' );
    } else {
        header.classList.remove( 'scrolled' );
    }
} );

// Smooth scrolling for anchor links
document.querySelectorAll( 'a[href^="#"]' ).forEach( anchor => {
    anchor.addEventListener( 'click', function ( e ) {
        e.preventDefault();
        const target = document.querySelector( this.getAttribute( 'href' ) );
        if ( target ) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo( {
                top: targetPosition,
                behavior: 'smooth'
            } );
        }
    } );
} );

// Add keyboard navigation
document.addEventListener( 'keydown', ( e ) => {
    if ( e.key === 'Escape' && mobileMenu.classList.contains( 'active' ) ) {
        hamburger.classList.remove( 'active' );
        mobileMenu.classList.remove( 'active' );
        overlay.classList.remove( 'active' );
        document.body.style.overflow = '';
    }
} );



// Add some interactivity for better UX
        document.addEventListener('DOMContentLoaded', function() {
            // File upload feedback
            const fileInputs = document.querySelectorAll('input[type="file"]');
            fileInputs.forEach(input => {
                input.addEventListener('change', function() {
                    const label = this.nextElementSibling;
                    const fileCount = this.files.length;
                    if (fileCount > 0) {
                        label.style.color = '#10b981';
                        label.innerHTML = label.innerHTML.replace(/📷|📄/, fileCount > 1 ? '✅' : '✅');
                    }
                });
            });

            // Form submission handling
            const form = document.querySelector('form');
            const submitBtn = document.querySelector('.submit-btn');
            
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';
                
                // Simulate form submission
                setTimeout(() => {
                    alert('Form submitted successfully!');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Submit Cue Listing';
                }, 2000);
            });
        });


        // Testimonial slider functionality

(() => {
    const track = document.getElementById("testimonialTrackUnique");
    const prevBtn = document.getElementById("testimonialBtnPrevUnique");
    const nextBtn = document.getElementById("testimonialBtnNextUnique");
    const dots = document.querySelectorAll("#testimonialDotsUnique .dot");
    const slides = document.querySelectorAll("#testimonialTrackUnique .testimonial-slide");

    let currentIndex = 0;
    let autoPlayInterval;
    const totalSlides = slides.length;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateCarousel() {
      const slideWidth = track.clientWidth;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

      dots.forEach(dot => dot.classList.remove("active"));
      if (dots[currentIndex]) dots[currentIndex].classList.add("active");
    }

    function goToSlide(index) {
      currentIndex = index;
      if (currentIndex >= totalSlides) currentIndex = 0;
      if (currentIndex < 0) currentIndex = totalSlides - 1;
      updateCarousel();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    dots.forEach((dot, idx) => {
      dot.addEventListener("click", () => goToSlide(idx));
    });

    function startAutoplay() {
      autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      clearInterval(autoPlayInterval);
    }

    // Swipe support
    track.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 50) {
        diff < 0 ? nextSlide() : prevSlide();
      }
    });

    // Initialize
    updateCarousel();
    startAutoplay();

    track.addEventListener("mouseenter", stopAutoplay);
    track.addEventListener("mouseleave", startAutoplay);
    window.addEventListener("resize", updateCarousel);
  })();