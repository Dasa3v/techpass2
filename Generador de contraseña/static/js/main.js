document.addEventListener('DOMContentLoaded', function() {
    const lengthSlider = document.getElementById('lengthRange');
    const lengthValue = document.getElementById('lengthValue');
    const marks = document.querySelectorAll('.slider-mark');
    
    // Actualizar slider
    if (lengthSlider && lengthValue) {
        lengthSlider.addEventListener('input', function(e) {
            const value = e.target.value;
            lengthValue.textContent = value;
            
            // Actualizar marcas activas
            marks.forEach(mark => {
                mark.classList.toggle('active', mark.dataset.value <= value);
            });
            
            // Animación
            lengthValue.style.transform = 'scale(1.2)';
            setTimeout(() => {
                lengthValue.style.transform = 'scale(1)';
            }, 200);
        });
    }
});

function copyPassword() {
    const passwordField = document.getElementById('passwordField');
    const copyBtn = document.querySelector('.copy-btn');
    
    if (!passwordField || !copyBtn) return;
    
    passwordField.select();
    document.execCommand('copy');
    
    // Feedback visual
    copyBtn.innerHTML = '<i class="fas fa-check me-1"></i> Copiado!';
    copyBtn.style.backgroundColor = 'var(--tech-green)';
    copyBtn.style.borderColor = 'var(--tech-green)';
    
    setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy me-1"></i> Copiar';
        copyBtn.style.backgroundColor = 'var(--tech-blue)';
        copyBtn.style.borderColor = 'var(--tech-blue)';
    }, 2000);
}