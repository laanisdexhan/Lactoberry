document.addEventListener('DOMContentLoaded', function () {
    // Resaltar enlace activo en la navegación
    try {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a').forEach(a => {
            const href = a.getAttribute('href');
            if (href === current || (href === 'index.html' && current === '')) {
                a.classList.add('active');
            }
        });
    } catch (e) {
        // no-op
    }

    // Botón descubrir
    const btn = document.getElementById('btnDescubrir');
    if (btn) {
        btn.addEventListener('click', () => {
            window.location.href = 'productos.html';
        });
    }

    // Manejar envío de formularios de contacto (en todas las páginas)
    document.querySelectorAll('#contactForm').forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = form.querySelector('#name')?.value || '';
            alert(`Gracias ${name || ''}! Hemos recibido tu mensaje.`);
            form.reset();
        });
    });

    // Comentarios positivos dinámicos para la sección de productos
    const reviews = [
        { product: 'Lactoberry Original', comment: '¡Su sabor natural es increíble! Me siento con más energía cada mañana.', author: 'Carolina' },
        { product: 'Lactoberry Yogurt Pro', comment: 'Perfecto para mi rutina de entrenamiento: delicioso y suave con mi estómago.', author: 'Luis' },
        { product: 'Lactoberry Zero', comment: 'El mejor producto sin azúcares añadidos que he probado. Muy refrescante.', author: 'Sofía' },
        { product: 'Lactoberry Kids', comment: 'A mis hijos les encanta, y yo confío en sus ingredientes naturales.', author: 'María' }
    ];

    const reviewsContainer = document.getElementById('reviewsList');
    if (reviewsContainer) {
        reviews.forEach(review => {
            const card = document.createElement('article');
            card.className = 'review-card';
            card.innerHTML = `
                <p>"${review.comment}"</p>
                <span>${review.author} - ${review.product}</span>
            `;
            reviewsContainer.appendChild(card);
        });
    }

    // Animar nuevas tarjetas de presentación y comentarios cuando entren en pantalla
    const animatedCards = document.querySelectorAll('.showcase-card, .review-card');
    if (animatedCards.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        animatedCards.forEach(card => observer.observe(card));
    }

    // Interacción simple en tarjetas de producto
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const title = card.querySelector('h3')?.textContent || 'Producto';
            alert(`${title} — Más información próximamente.`);
        });
    });
});
