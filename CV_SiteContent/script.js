document.addEventListener("DOMContentLoaded", function() {
    function animateStars(starElements, rating) {
        let filledStars = 0;
        const interval = setInterval(() => {
            if (filledStars < rating) {
                starElements[filledStars].classList.add('filled');
                filledStars++;
            } else {
                clearInterval(interval);
            }
        }, 200);  // Geschwindigkeit der Animation
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stars = entry.target.querySelectorAll('.star');
                const rating = entry.target.getAttribute('data-rating');
                
                // Starten der Sterne-Animation
                animateStars(stars, rating);

                // Unobserve the entry
                observer.unobserve(entry.target);
            }
        });
    }

    let observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
});