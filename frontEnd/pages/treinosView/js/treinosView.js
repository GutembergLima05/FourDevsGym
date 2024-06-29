document.addEventListener('DOMContentLoaded', () => {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionContent = header.nextElementSibling;

            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
            } else {
                document.querySelectorAll('.accordion-content').forEach(content => {
                    content.style.maxHeight = null;
                });
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            }
        });
    });
});
