const btnDarkMode = document.querySelector('button.btn-darkmode');
const footer = document.querySelector('footer');

btnDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('darkmode-active');
    footer.classList.toggle('bg-darker-color');
    btnDarkMode.classList.toggle('btn-darkmode-clicked');
});

const btnBuy = document.querySelectorAll('.btn-buy');
const productName = document.querySelectorAll('.name');
const cart = document.querySelector('.cart');
const cartContent = document.querySelector('.cart span'); // Pilih elemen DOM sekali untuk kinerja yang lebih baik
const cartItems = []; // Array untuk menyimpan informasi produk yang dipilih

btnBuy.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const productSelect = productName[index].innerText;
        const quantity = parseInt(btn.parentElement.querySelector('input[type="number"]').value);
        const price = getPrice(index);

        if (quantity > 0) {
            const item = { product: productSelect, quantity: quantity, price: price };
            cartItems.push(item);
            updateCartDisplay();
        } else {
            alert('Please enter a valid quantity.');
        }
    });
});

// Fungsi untuk mendapatkan harga berdasarkan indeks
function getPrice(index) {
    switch (index) {
        case 0:
            return 299000;
        case 1:
            return 259000;
        case 2:
            return 399000;
        // Tambahkan case lainnya sesuai dengan jumlah produk yang Anda miliki
        default:
            return 0;
    }
}

// Fungsi untuk memperbarui tampilan keranjang belanja
function updateCartDisplay() {
    let cartHTML = '';

    cartItems.forEach((item, index) => {
        cartHTML += `
            <div>
                ${item.product} - Qty: ${item.quantity} - Price: Rp ${item.price.toLocaleString()}
                <button class="btn-remove" data-index="${index}">Cancel</button>
            </div>
        `;
    });

    cartContent.innerHTML = cartHTML;

    // Menambahkan event listener ke setiap tombol "Hapus"
    const btnRemove = document.querySelectorAll('.btn-remove');
    btnRemove.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            cartItems.splice(index, 1); // Hapus item dari array
            updateCartDisplay(); // Perbarui tampilan keranjang
        });
    });


// Mengirim data produk ke halaman checkout saat mengklik tombol "CHECKOUT"
const checkoutBtn = document.getElementById('c');
checkoutBtn.addEventListener('click', () => {
    // Simpan data produk di sessionStorage untuk diakses di halaman checkout
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Arahkan pengguna ke halaman checkout
    window.location.href = 'checkout.html';
});
}

// Menampilkan keranjang saat tombol "Cart" di navbar diklik
const cartBtn = document.querySelector('nav li a[href="#cart"]');
cartBtn.addEventListener('click', () => {
    cart.style.display = 'flex';
});

// Menyembunyikan keranjang saat tombol "x" di keranjang diklik
const btnX = document.querySelector('.cart #x');
btnX.addEventListener('click', () => {
    cart.style.display = 'none';
});

// Mengarahkan pengguna ke halaman checkout saat tombol "CHECKOUT" diklik
const checkoutBtn = document.getElementById('c');
checkoutBtn.addEventListener('click', () => {
    window.location.href = 'checkout.html'; // Ganti 'checkout.html' dengan URL halaman checkout yang sesuai
});

// Memastikan bahwa input kuantitas tidak boleh kurang dari 0
const quantityInputs = document.querySelectorAll('input[type="number"]');
quantityInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value < 0) {
            input.value = 0;
        }
    });
});
