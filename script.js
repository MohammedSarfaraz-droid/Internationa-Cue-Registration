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
// Mobile menu functionality
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const overlay = document.getElementById('overlay');
        const header = document.getElementById('header');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        overlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });


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




  // Function to submit wanted ad
        function salesWantedSubmitWantedAd(event) {
            event.preventDefault();
            
            const form = document.getElementById('sales-wanted-wanted-form');
            const formData = new FormData(form);
            
            // Get form values
            const cueBrand = formData.get('cueBrand');
            const cueModel = formData.get('cueModel');
            const priceRange = formData.get('priceRange');
            const contactName = formData.get('contactName');
            const description = formData.get('description');
            
            // Create new wanted ad card
            const wantedGrid = document.getElementById('sales-wanted-wanted-grid');
            const newWantedCard = document.createElement('div');
            newWantedCard.className = 'sales-wanted-card sales-wanted-wanted-card';
            
            const title = cueModel ? `${cueBrand} ${cueModel}` : cueBrand;
            const priceInfo = priceRange ? `<br><strong>Price Range:</strong> ${priceRange}` : '';
            
            newWantedCard.innerHTML = `
                <div class="sales-wanted-wanted-title">Looking for: ${title}</div>
                <div class="sales-wanted-wanted-details">
                    ${description}${priceInfo}
                </div>
                <div class="sales-wanted-contact-info">
                    <div class="sales-wanted-seller-name">Posted by: ${contactName}</div>
                </div>
                <span class="sales-wanted-status-badge sales-wanted-status-wanted">Wanted</span>
            `;
            
            // Add to top of wanted ads
            wantedGrid.insertBefore(newWantedCard, wantedGrid.firstChild);
            
            // Reset form
            form.reset();
            
            // Show success message (you can customize this)
            alert('Your wanted ad has been posted successfully!');
            
            // Add animation to new card
            newWantedCard.style.opacity = '0';
            newWantedCard.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                newWantedCard.style.transition = 'all 0.5s ease';
                newWantedCard.style.opacity = '1';
                newWantedCard.style.transform = 'translateY(0)';
            }, 100);
        }

        // Sample data arrays for dynamic content (for future use)
        const salesWantedSalesData = [
            {
                id: '001',
                name: 'McDermott G-Series',
                price: 850,
                buttLength: '29"',
                buttWeight: '19 oz',
                shaftLength: '29"',
                shaftWeight: '5.2 oz',
                shaftDiameter: '12.75 mm',
                manufacturer: '2019',
                description: 'Excellent condition McDermott cue with beautiful birdseye maple and intricate inlays. Well maintained, comes with original case.',
                seller: 'John Smith',
                status: 'Available'
            }
            // More entries can be added here
        ];

        const salesWantedWantedData = [
            {
                title: 'Meucci Original',
                description: 'Searching for a vintage Meucci Original from the 1980s-1990s. Prefer good condition with original case. Any weight considered.',
                poster: 'Robert Wilson'
            }
            // More entries can be added here
        ];

        // Function to load sales data dynamically (for future backend integration)
        function salesWantedLoadSalesData() {
            // This would typically fetch from your backend
            // For now, the sample data is already in HTML
        }

        // Function to load wanted data dynamically (for future backend integration)
        function salesWantedLoadWantedData() {
            // This would typically fetch from your backend
            // For now, the sample data is already in HTML
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            salesWantedLoadSalesData();
            salesWantedLoadWantedData();
        });




// Back to top button functionality
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
