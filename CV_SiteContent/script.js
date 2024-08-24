document.addEventListener("DOMContentLoaded", function() {
    function drawChart(ctx, percentage) {
        var scale = window.devicePixelRatio || 1;
        var size = 150;
        ctx.canvas.width = size * scale;
        ctx.canvas.height = size * scale;
        ctx.scale(scale, scale);

        var centerX = size / 2;
        var centerY = size / 2;
        var radius = (size - 20) / 2;
        var startAngle = -0.5 * Math.PI;
        var endAngle = (percentage / 100) * 2 * Math.PI + startAngle;

        // Hintergrundkreis
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.lineWidth = 10;
        ctx.strokeStyle = '#e6e6e6';
        ctx.stroke();

        // Fortschrittskreis animieren
        let currentAngle = startAngle;
        function animate() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            // Hintergrundkreis neu zeichnen
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#e6e6e6';
            ctx.stroke();

            // Fortschrittskreis
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, currentAngle);
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#00aaff';
            ctx.stroke();

            if (currentAngle < endAngle) {
                currentAngle += 0.05;  // Geschwindigkeit der Animation
                requestAnimationFrame(animate);
            }
        }

        animate();
    }

    function animatePercentage(element, targetPercentage) {
        let currentPercentage = 0;
        let interval = setInterval(function() {
            if (currentPercentage < targetPercentage) {
                currentPercentage++;
                element.textContent = currentPercentage + '%';
            } else {
                clearInterval(interval);
            }
        }, 15);  // Geschwindigkeit des Hochzählens
    }

    function handleIntersection(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let canvasId = entry.target.querySelector('canvas').id;
                let percentageElement = entry.target.querySelector('.percentage');
                let percentage = parseInt(percentageElement.textContent);

                // Starten der Animationen
                drawChart(entry.target.querySelector('canvas').getContext('2d'), percentage);
                animatePercentage(percentageElement, percentage);

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