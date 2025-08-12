// checkpoint-gallery.js - Script untuk galeri foto pos checkpoint gerak jalan
(function () {
    'use strict';

    // Data foto pos checkpoint
    const checkpointPhotos = [
        {
            id: 1,
            title: 'Pos 1 - RT 008',
            description: 'Lokasi checkpoint pertama di RT 008',
            thumbnail: '../assets/img/pos1-thumb.jpg',
            fullsize: '../assets/img/pos1-full.jpg',
        },
        {
            id: 2,
            title: 'Pos 2 - RT 009',
            description: 'Lokasi checkpoint kedua di RT 009',
            thumbnail: '../assets/img/pos2-thumb.jpg',
            fullsize: '../assets/img/pos2-full.jpg',
        },
        {
            id: 3,
            title: 'Pos 3 - RT 002',
            description: 'Lokasi checkpoint ketiga di RT 002',
            thumbnail: '../assets/img/pos3-thumb.jpg',
            fullsize: '../assets/img/pos3-full.jpg',
        },
        {
            id: 4,
            title: 'Pos 4 - RT 003',
            description: 'Lokasi checkpoint keempat di RT 003',
            thumbnail: '../assets/img/pos4-thumb.jpg',
            fullsize: '../assets/img/pos4-full.jpg',
        },
    ];

    // Fungsi untuk inject CSS styles
    function injectStyles() {
        const styles = `
            .checkpoint-gallery {
                margin-top: 2rem;
                margin-bottom: 1.5rem;
            }
            
            .checkpoint-gallery h5 {
                font-weight: 700;
                color: var(--dark-green, #0e8a67);
                margin-bottom: 1rem;
                border-left: 4px solid var(--green, #15b788);
                padding-left: 1rem;
            }
            
            .gallery-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .gallery-item {
                position: relative;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                background: white;
            }
            
            .gallery-item:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }
            
            .gallery-item img {
                width: 100%;
                height: 160px;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .gallery-item:hover img {
                transform: scale(1.05);
            }
            
            .gallery-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
                color: white;
                padding: 1rem 0.75rem 0.75rem;
                transform: translateY(100%);
                transition: transform 0.3s ease;
            }
            
            .gallery-item:hover .gallery-overlay {
                transform: translateY(0);
            }
            
            .gallery-overlay h6 {
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 0.25rem;
            }
            
            .gallery-overlay p {
                font-size: 0.8rem;
                opacity: 0.9;
                margin-bottom: 0;
            }
            
            .gallery-badge {
                position: absolute;
                top: 0.75rem;
                left: 0.75rem;
                background: var(--green, #15b788);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 15px;
                font-size: 0.75rem;
                font-weight: 600;
                z-index: 2;
            }
            
            .gallery-zoom-icon {
                position: absolute;
                top: 0.75rem;
                right: 0.75rem;
                background: rgba(255, 255, 255, 0.9);
                color: var(--dark-green, #0e8a67);
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.9rem;
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.3s ease;
                z-index: 2;
            }
            
            .gallery-item:hover .gallery-zoom-icon {
                opacity: 1;
                transform: scale(1);
            }
            
            /* Mobile responsive */
            @media (max-width: 576px) {
                .gallery-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.75rem;
                }
                
                .gallery-item img {
                    height: 120px;
                }
                
                .gallery-overlay {
                    padding: 0.75rem 0.5rem 0.5rem;
                }
                
                .gallery-overlay h6 {
                    font-size: 0.8rem;
                }
                
                .gallery-overlay p {
                    font-size: 0.7rem;
                }
            }
            
            /* Lightbox customization */
            .lb-data .lb-caption {
                font-weight: 600;
                font-size: 1rem;
            }
            
            .lb-data .lb-number {
                color: #ccc;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    // Fungsi untuk membuat HTML galeri
    function createGalleryHTML() {
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'checkpoint-gallery';
        galleryContainer.setAttribute('data-aos', 'fade-up');
        galleryContainer.setAttribute('data-aos-delay', '300');

        galleryContainer.innerHTML = `
            <h5><i class="fa fa-camera me-2"></i>Foto Lokasi Pos Checkpoint</h5>
            <div class="gallery-grid" id="checkpointGalleryGrid">
                ${checkpointPhotos
                    .map(
                        (photo) => `
                    <div class="gallery-item">
                        <div class="gallery-badge">Pos ${photo.id}</div>
                        <div class="gallery-zoom-icon">
                            <i class="fa fa-search-plus"></i>
                        </div>
                        <a href="${photo.fullsize}" 
                           data-lightbox="checkpoint-gallery" 
                           data-title="${photo.title} - ${photo.description}">
                            <img src="${photo.thumbnail}" 
                                 alt="${photo.title}" 
                                 loading="lazy"
                                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjZjhmOWZhIi8+CjxwYXRoIGQ9Ik04MCA2MEMzNS44MiA2MCA2MCAzNS44MiA2MCA4MFMzNS44MiAxMDAgODAgMTAwUzEwMCA3NS4xOCAxMDAgNDBTMTI0LjE4IDYwIDgwIDYwWk04MCA4NEM3MS4xNiA4NCA2NCA3Ni44NCA2NCA2OFM3MS4xNiA1MiA4MCA1MlM5NiA1OS4xNiA5NiA2OFM4OC44NCA4NCA4MCA4NFoiIGZpbGw9IiM2Yzc1N2QiLz4KPHA+Tm8gSW1hZ2U8L3A+Cjwvc3ZnPgo='"/>
                        </a>
                        <div class="gallery-overlay">
                            <h6>${photo.title}</h6>
                            <p>${photo.description}</p>
                        </div>
                    </div>
                `
                    )
                    .join('')}
            </div>
        `;

        return galleryContainer;
    }

    // Fungsi untuk load Lightbox CSS dan JS
    function loadLightbox() {
        return new Promise((resolve, reject) => {
            // Check jika lightbox sudah ada
            if (typeof lightbox !== 'undefined') {
                resolve();
                return;
            }

            // Load CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.5/css/lightbox.min.css';
            cssLink.integrity = 'sha512-tiaHHfpKL4hg1ZhXPfQ4vCjNZNcmx+FnMH4aW9lCo/8jKqfxpfUZn5Q7qPjTFjTVgRzJHnbYIhNTq1u44CxnA==';
            cssLink.crossOrigin = 'anonymous';
            cssLink.referrerPolicy = 'no-referrer';
            document.head.appendChild(cssLink);

            // Load jQuery jika belum ada (required by lightbox)
            const loadjQuery = () => {
                return new Promise((resolveJQ, rejectJQ) => {
                    if (typeof jQuery !== 'undefined') {
                        resolveJQ();
                        return;
                    }

                    const jqScript = document.createElement('script');
                    jqScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js';
                    jqScript.onload = () => resolveJQ();
                    jqScript.onerror = () => rejectJQ(new Error('Failed to load jQuery'));
                    document.head.appendChild(jqScript);
                });
            };

            // Load jQuery terlebih dahulu, lalu lightbox
            loadjQuery()
                .then(() => {
                    // Load Lightbox JS
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.5/js/lightbox.min.js';
                    script.integrity = 'sha512-JclVQ6W8fMHFMYd5G5VRwVXZRNu4KVQxJYhxcvyQPHNNVBQI1gYdeCg/rvGBDMEMpS7VCvS7qrx4wR0ZZE/wQA==';
                    script.crossOrigin = 'anonymous';
                    script.referrerPolicy = 'no-referrer';

                    script.onload = () => {
                        // Wait a bit untuk lightbox fully initialize
                        setTimeout(() => {
                            // Configure lightbox options setelah loaded
                            if (typeof lightbox !== 'undefined') {
                                lightbox.option({
                                    resizeDuration: 200,
                                    wrapAround: true,
                                    fadeDuration: 300,
                                    imageFadeDuration: 300,
                                    showImageNumberLabel: true,
                                    albumLabel: 'Foto %1 dari %2',
                                    disableScrolling: true,
                                });
                            }
                            resolve();
                        }, 100);
                    };

                    script.onerror = () => reject(new Error('Failed to load Lightbox'));
                    document.head.appendChild(script);
                })
                .catch(reject);
        });
    }

    // Fungsi untuk insert galeri setelah map container
    function insertGallery() {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
            const gallery = createGalleryHTML();
            mapContainer.parentNode.insertBefore(gallery, mapContainer.nextSibling);

            // Setup event listeners untuk gallery items
            setupGalleryEvents();

            // Trigger AOS animation jika AOS tersedia
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        } else {
            console.warn('Map container tidak ditemukan, galeri tidak dapat ditambahkan');
        }
    }

    // Fungsi untuk setup event listeners
    function setupGalleryEvents() {
        // Wait a bit untuk DOM fully rendered
        setTimeout(() => {
            const galleryLinks = document.querySelectorAll('.gallery-item a[data-lightbox]');

            galleryLinks.forEach((link) => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    // Check if lightbox is available
                    if (typeof lightbox !== 'undefined') {
                        // Use lightbox native method
                        lightbox.start(this);
                    } else {
                        // Fallback: try to initialize lightbox first
                        console.warn('Lightbox not ready, attempting to initialize...');
                        setTimeout(() => {
                            if (typeof lightbox !== 'undefined') {
                                lightbox.start(this);
                            } else {
                                // Ultimate fallback - open in new window
                                window.open(this.href, '_blank');
                            }
                        }, 500);
                    }
                });
            });

            console.log(`Gallery events setup untuk ${galleryLinks.length} gambar`);
        }, 200);
    }

    // Fungsi untuk handle error loading gambar
    function handleImageErrors() {
        const images = document.querySelectorAll('.gallery-item img');
        images.forEach((img) => {
            img.addEventListener('error', function () {
                // Replace dengan placeholder SVG jika gambar tidak bisa dimuat
                this.src =
                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDIwMCAxNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTYwIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNkZWUyZTYiLz4KPGNpcmNsZSBjeD0iNzAiIGN5PSI2MCIgcj0iMTAiIGZpbGw9IiM2Yzc1N2QiLz4KPHBhdGggZD0iTTQwIDEwMEwxNjAgMTAwTDEyMCA2MEw4MCA4MEw0MCAxMDBaIiBmaWxsPSIjNmM3NTdkIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmM3NTdkIiBmb250LXNpemU9IjEyIj5Gb3RvIHRpZGFrIHRlcnNlZGlhPC90ZXh0Pgo8L3N2Zz4K';
                this.alt = 'Foto tidak tersedia';
            });
        });
    }

    // Fungsi untuk menambahkan lazy loading
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('.gallery-item img[data-src]').forEach((img) => {
                imageObserver.observe(img);
            });
        }
    }

    // Initialize function
    async function init() {
        try {
            // Inject custom styles
            injectStyles();

            console.log('Loading lightbox dependencies...');

            // Load lightbox dependencies
            await loadLightbox();

            console.log('Lightbox loaded, inserting gallery...');

            // Insert gallery into DOM
            insertGallery();

            // Setup image error handling
            setTimeout(() => {
                handleImageErrors();

                // Double check lightbox initialization
                if (typeof lightbox !== 'undefined') {
                    // Re-initialize lightbox untuk elemen baru
                    lightbox.init();
                    console.log('Lightbox re-initialized for gallery images');
                } else {
                    console.warn('Lightbox masih belum tersedia setelah loading');
                }
            }, 300);

            // Setup lazy loading if needed
            setupLazyLoading();

            console.log('Checkpoint gallery berhasil dimuat');
        } catch (error) {
            console.error('Error loading checkpoint gallery:', error);

            // Fallback: insert gallery tanpa lightbox
            console.log('Fallback: inserting gallery without lightbox...');
            injectStyles();
            insertGallery();
        }
    }

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export untuk penggunaan manual jika diperlukan
    window.checkpointGallery = {
        init: init,
        photos: checkpointPhotos,
    };
})();
