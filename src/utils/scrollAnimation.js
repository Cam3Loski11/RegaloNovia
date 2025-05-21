export function setupScrollAnimations() {
	const animatedElements = document.querySelectorAll(".scroll-animate");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("animated");
				}
			});
		},
		{
			threshold: 0.1,
		}
	);

	animatedElements.forEach((el) => {
		observer.observe(el);
	});
}
/*
<Layout>
  <section>
    <h1 class="scroll-animate">Mi Sitio Web</h1>
    <p class="scroll-animate" style="transition-delay: 200ms;">Con animaciones nativas</p>
  </section>
  
  <section>
    <div class="scroll-animate fade-right">
      <h2>Primera sección</h2>
      <p>Contenido animado</p>
    </div>
    
    <div class="scroll-animate fade-left" style="transition-delay: 300ms;">
      <h2>Segunda sección</h2>
      <p>Más contenido animado</p>
    </div>
  </section>
</Layout>
 */
