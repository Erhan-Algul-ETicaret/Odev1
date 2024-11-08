let products = []; // Ürünleri saklamak için dizi oluşturduk.

document.addEventListener("DOMContentLoaded", () => {
  // Sayfa yüklendiğinde çalışacak fonksiyon(lar)
  const loadingMessage = document.getElementById("loading");
  const productContainer = document.getElementById("product-container");
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const filterButton = document.getElementById("filter-button");

  fetch("https://fakestoreapi.com/products") // Ürünleri API'den çeker
    .then((response) => response.json()) // API'den gelen veriyi json formatına çevirir
    .then((data) => {
      products = data; // Gelen ürünleri/datayı products(let ile en başta oluşturduk) dizinine gönderiyoruz.
      loadingMessage.style.display = "none"; // Loading mesajını gizle
      displayProducts(products); // Ürünleri ekrana göster
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      loadingMessage.textContent =
        "Error fetching products. Please try again later.";
      // Hata mesajını hem consola hem ekrana yazdırıyoruz. (hata olursa tabii)
    });

  searchInput.addEventListener("input", () => {
    // Arama inputunda her değişiklikte çalışacak fonskiyon
    const searchTerm = searchInput.value.toLowerCase(); // Aramaya girilen değeri küçük harflere çeviriyoruz.
    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    ); // Aranan değeri içeren ürünleri filtrele (başlığa göre)
    displayProducts(filteredProducts); // Filtrelenen ürünleri ekrana göster
  });

  filterButton.addEventListener("click", () => {
    // Filtreleme butonuna tıklandığında çalışacak fonskiyon
    const category = categoryFilter.value; // Seçilen kategoriyi alıyoruz.
    const minPrice = parseFloat(minPriceInput.value) || 0; // Seçilen minimum fiyatı alıyoruz.
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity; // Seçilen maksimum fiyatı alıyoruz. (Infinity-yeni öğrendim)
  
    const filteredProducts = products.filter((product) => {
      const categoryMatch = category ? product.category === category : true;
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;
      return categoryMatch && priceMatch;
    });
    displayProducts(filteredProducts); // Filtrelenenleri ekrana yazdır.
  });
});

function displayProducts(products) {
  // Ürünleri ekrana yazdıran fonksiyon
  const productContainer = document.getElementById("product-container"); // Urunlerin ekrana yazdırılacagı container yapısı
  productContainer.innerHTML = ""; // Containerın içini temizle
  products.forEach((product) => {
    const productCard = createProductCard(product); // her ürünün bir kartı olacak
    productContainer.appendChild(productCard); // Ürün kartını kapsayıcıya (container) ekliyoruz.
  });
}

function createProductCard(product) {
  // Ürün kartı oluşturduğumuz fonksiyon
  const card = document.createElement("div"); // div oluşturduk
  card.classList.add("product-card"); // oluşturduğumuz div için class ekliyoruz.

  card.innerHTML = `
    <h3>${product.title}</h3>
    <div class="image-container">
    <img class="image" src="${product.image}" alt="${product.title}">
    </div>
    <p class="price">$${product.price}</p>
    <p class="rating">${"★".repeat(Math.floor(product.rating.rate))} (${
    product.rating.count
  }) </p>
    <p>${product.description}</p>
    <button onclick="openEditModal(${product.id})">Edit</button>
    <button onclick="openDeleteModal(${product.id})">Delete</button>
    `;
  return card;
}
