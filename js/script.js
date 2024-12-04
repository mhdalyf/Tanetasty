function loadProducts(page) {
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            const productList = document.querySelector(page === 'index' ? '.product-list' : '.product-list-detail');
            productList.innerHTML = '';

            products.forEach(product => {
                let productElement = '';
                if (page === 'index') {
                    productElement = `
                        <div class="product">
                            <h3>${product.name}</h3>
                            <img src="${product.image}" alt="${product.name}">
                            <p class="price">Rp ${product.price}</p> 
                            <a href="product-detail.html?id=${product.id}" class="button">Detail Produk</a>
                        </div>
                    `;
                } else if (page === 'product') {
                    productElement = `
                        <div class="product">
                            <h3>${product.name}</h3>
                            <img src="${product.image}" alt="${product.name}">
                            <p class="price">Rp ${product.price}</p> 
                            <button class="add-to-cart button" data-product-id="${product.id}">Beli</button> 
                            <a href="product-detail.html?id=${product.id}" class="button">Detail Produk</a>
                        </div>
                    `;
                }
                productList.innerHTML += productElement;
            });

            if (page === 'product') {
                const addToCartButtons = document.querySelectorAll('.add-to-cart');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const productId = parseInt(button.dataset.productId);
                        addToCart(productId);
                    });
                });
            }
        });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.productId === productId);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity++;
    } else {
        cart.push({productId: productId, quantity: 1});
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    console.log(`Produk dengan ID ${productId} ditambahkan ke keranjang.`);
    alert(`Produk dengan ID ${productId} ditambahkan ke keranjang.`);
}

function loadTestimonials(page) {
    fetch('data/testimonials.json')
        .then(response => response.json())
        .then(testimonials => {
            const testimonialList = document.querySelector(page === 'index' ? '.testimonial-list' : '.testimonial-list-detail');
            testimonialList.innerHTML = '';

            testimonials.forEach(testimonial => {
                const testimonialElement = `
                    <div class="testimonial">
                        <p>${testimonial.testimonial}</p>
                        <p><strong>${testimonial.name}</strong></p> 
                    </div>
                `;
                testimonialList.innerHTML += testimonialElement;
            });

            if (page === 'index' || page === 'testimonial') {

                new Swiper('.testimonial-list', {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                });
            }
        });
}


const heroText = document.querySelector('.hero-text h2');
const slogans = [
    "DENGAN RASA YANG AUTENTIK",
    "RASAKAN KENIKMATANNYA",
    "SAMBAL ASLI DARI DESA TANETE"
];
let currentSloganIndex = 0;

setInterval(() => {
    heroText.textContent = slogans[currentSloganIndex];
    currentSloganIndex = (currentSloganIndex + 1) % slogans.length;
}, 2000); 

if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
    loadProducts('index');
    loadTestimonials('index');
} else if (window.location.pathname.endsWith('product.html')) {
    loadProducts('product');
} else if (window.location.pathname.endsWith('testimonial.html')) {
    loadTestimonials('testimonial');
}

function toggleMobileMenu() {
    const burgerMenu = document.getElementById('burger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
    burgerMenu.classList.toggle('active');
}

const burgerMenu = document.getElementById('burger-menu');
if (burgerMenu) {
    burgerMenu.addEventListener('click', toggleMobileMenu);
}

const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    const mobileMenu = document.getElementById('mobile-menu'); 
    mobileMenu.classList.remove('active');
    burgerMenu.classList.remove('active');
  });
});