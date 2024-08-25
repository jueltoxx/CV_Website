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

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");
    const closePopupButton = document.getElementById("closePopup");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const subject = formData.get("subject");
        const message = formData.get("message");

        fetch("/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ subject, message })
        })
        .then(response => {
            if (response.ok) {
                showPopup("E-Mail erfolgreich gesendet!");
            } else {
                showPopup("Fehler beim Senden der E-Mail");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            showPopup("Fehler beim Senden der E-Mail");
        });
    });

    closePopupButton.addEventListener("click", function() {
        popup.style.display = "none";
    });

    function showPopup(message) {
        popupMessage.textContent = message;
        popup.style.display = "block";
    }
});