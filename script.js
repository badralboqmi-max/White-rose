// ===== بيانات المنتجات =====
const products = {
    wedding: [
        { id: 'w1', name: 'فستان دانتيل A-Line', price: 1290, image: 'images/wedding-1.jpg', category: 'wedding' },
        { id: 'w2', name: 'فستان ساتان بايس', price: 980, image: 'images/wedding-2.jpg', category: 'wedding' },
        { id: 'w3', name: 'فستان أبليكيه زهور', price: 1590, image: 'images/wedding-3.jpg', category: 'wedding' }
    ],
    evening: [
        { id: 'e1', name: 'فستان حرير ميدي', price: 620, image: 'images/evening-1.jpg', category: 'evening' },
        { id: 'e2', name: 'فستان مخمل مطرز', price: 890, image: 'images/evening-2.jpg', category: 'evening' },
        { id: 'e3', name: 'فستان كريب بكتف واحد', price: 740, image: 'images/evening-3.jpg', category: 'evening' }
    ],
    kids: [
        { id: 'k1', name: 'فستان قطن للحفلات', price: 180, image: 'images/kids-1.jpg', category: 'kids' },
        { id: 'k2', name: 'فستان تول ميدي', price: 220, image: 'images/kids-2.jpg', category: 'kids' },
        { id: 'k3', name: 'فستان كتان بفيونكة', price: 160, image: 'images/kids-3.jpg', category: 'kids' }
    ]
};

// ===== عناصر DOM =====
const weddingContainer = document.getElementById('weddingProducts');
const eveningContainer = document.getElementById('eveningProducts');
const kidsContainer = document.getElementById('kidsProducts');
const cartSidebar = document.getElementById('cartSidebar');
const cartBtn = document.getElementById('cartBtn');
const cartClose = document.getElementById('cartClose');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartCount = document.getElementById('cartCount');
const clearCartBtn = document.getElementById('clearCartBtn');
const whatsappOrderBtn = document.getElementById('whatsappOrderBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');
const contactForm = document.getElementById('contactForm');

// ===== سلة التسوق =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ===== عرض المنتجات =====
function renderProducts() {
    renderCategory(products.wedding, weddingContainer);
    renderCategory(products.evening, eveningContainer);
    renderCategory(products.kids, kidsContainer);
}

function renderCategory(categoryProducts, container) {
    if (!container) return;
    container.innerHTML = '';
    categoryProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-price">$${product.price}</span>
            </div>
            <button class="product-add" data-id="${product.id}">
                <i class="fas fa-plus"></i>
            </button>
        `;
        container.appendChild(card);
    });
}

// ===== إضافة إلى السلة =====
function addToCart(productId) {
    let product = null;
    for (const category in products) {
        const found = products[category].find(p => p.id === productId);
        if (found) {
            product = found;
            break;
        }
    }
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    saveCart();
    openCart();
}

// ===== إزالة من السلة =====
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

// ===== تحديث الكمية =====
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
            saveCart();
        }
    }
}

// ===== عرض عناصر السلة =====
function renderCartItems() {
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>سلة التسوق فارغة</p>
                <span>تصفحي مجموعاتنا للعثور على فستانك المثالي</span>
            </div>
        `;
        cartFooter.style.display = 'none';
        return;
    }

    cartFooter.style.display = 'block';
    cartItemsContainer.innerHTML = '';
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <span class="cart-item-price">$${item.price}</span>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    // إضافة مستمعات الأحداث للأزرار
    document.querySelectorAll('.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            updateQuantity(id, -1);
        });
    });

    document.querySelectorAll('.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            updateQuantity(id, 1);
        });
    });

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            removeFromCart(id);
        });
    });
}

// ===== حساب المجموع =====
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// ===== تحديث واجهة السلة =====
function updateCart() {
    renderCartItems();
    const total = calculateTotal();
    cartTotalPrice.textContent = `$${total}`;
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}

// ===== حفظ السلة في localStorage =====
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// ===== فتح/إغلاق السلة =====
function openCart() {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== مسح السلة =====
function clearCart() {
    if (confirm('هل أنت متأكدة من مسح جميع الاختيارات؟')) {
        cart = [];
        updateCart();
        saveCart();
    }
}

// ===== طلب عبر واتساب =====
function orderViaWhatsApp() {
    if (cart.length === 0) {
        alert('سلة التسوق فارغة!');
        return;
    }

    let message = 'مرحباً الوردة البيضاء!\n\nأنا مهتمة بطلب:\n';
    cart.forEach(item => {
        message += `- ${item.name} ($${item.price}) x ${item.quantity}\n`;
    });
    const total = calculateTotal();
    message += `\nالمجموع: $${total}\n\nيرجى إبلاغي بالخطوات التالية.`;

    const encodedMessage = encodeURIComponent(message);
    const phone = '15550142282'; // رقم واتساب
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
}

// ===== القائمة المتنقلة =====
function toggleMobileMenu() {
    nav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// ===== إغلاق القائمة عند النقر على رابط =====
function closeMobileMenuOnLinkClick() {
    if (window.innerWidth <= 768) {
        nav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// ===== نموذج الاتصال =====
function handleContactForm(e) {
    e.preventDefault();
    alert('شكراً لتواصلك! سنرد عليك خلال يوم عمل واحد.');
    e.target.reset();
}

// ===== أحداث النقر على المنتجات =====
document.addEventListener('click', (e) => {
    const addButton = e.target.closest('.product-add');
    if (addButton) {
        e.preventDefault();
        const productId = addButton.dataset.id;
        addToCart(productId);
    }
});

// ===== تهيئة الصفحة =====
function init() {
    renderProducts();
    updateCart();

    // أحداث السلة
    cartBtn.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    overlay.addEventListener('click', closeCart);
    clearCartBtn.addEventListener('click', clearCart);
    whatsappOrderBtn.addEventListener('click', orderViaWhatsApp);

    // قائمة الجوال
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenuOnLinkClick);
    });

    // نموذج الاتصال
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // إغلاق القائمة عند تغيير حجم الشاشة
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// بدء التشغيل
document.addEventListener('DOMContentLoaded', init);