// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM completamente carregado');

//     const headers = document.querySelectorAll('.accordion-header');
//     console.log('Headers encontrados:', headers);

//     headers.forEach(header => {
//         header.addEventListener('click', () => {
//             console.log('Cabeçalho clicado:', header);

//             const content = header.nextElementSibling;
//             const isActive = content.style.maxHeight !== null && content.style.maxHeight !== '';

//             console.log('isActive:', isActive);

//             document.querySelectorAll('.accordion-content').forEach(c => {
//                 console.log('Fechando conteúdo:', c);
//                 c.style.maxHeight = null;
//             });

//             content.style.maxHeight = isActive ? null : `${content.scrollHeight}rem`;

//             console.log('content.scrollHeight:', content.scrollHeight);
//         });
//     });
// });
