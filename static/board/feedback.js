document.addEventListener('DOMContentLoaded', () => {
  const button = document.createElement('button');
  button.textContent = 'Feedback Form';
  button.style.position = 'fixed';
  button.style.top = '20px';
  button.style.right = '20px';
  button.style.zIndex = '9999';

  button.addEventListener('click', () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSdHSn26B_jTOKIpTMI_91OSaqW-r8c6tk01xlRIMKMLRx9wtA/viewform?usp=sharing', '_blank');
  });

  document.body.appendChild(button);
});