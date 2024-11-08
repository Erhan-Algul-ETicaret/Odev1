function openEditModal(productId) {
  // Ürün düzenleme modalını açan fonksiyon
  const modalContainer = document.getElementById("modal-container"); // Kapsayıcıya alıyoruz
  const product = products.find(p => p.id === productId); // Id ile düzenlenecek ürünü buluyoruz

  modalContainer.innerHTML = `
 <div class="modal" id="edit-modal">
    <div class="modal-content">
        <h2>Edit Product</h2>
        <form onsubmit="saveEdit(event, ${productId})">
        <input type="text" id="edit-title" value="${product.title}" required>
        <input type="number" id="edit-price" value="${product.price}" required>
        <textarea id="edit-description">${product.description}</textarea>
        <button type="submit">Save</button>
        <button type="button" onclick="closeModal()">Cancel</button>
        </form>
    </div>
</div>
 `;
  document.getElementById("edit-modal").style.display = "flex"; // Modalu görünür yap.
}

function saveEdit(event, productId) {
  // Ürün düzenlemesini kaydeden fonksiyon.
  event.preventDefault(); // Formun otomatik gönderilmesini elgeller.
  // Güncellenen başlık, fiyat ve açıklamaları alıyoruz.
  const updatedTitle = document.getElementById("edit-title").value;
  const updatedPrice = document.getElementById("edit-price").value;
  const updatedDescription = document.getElementById("edit-description").value;

  const productIndex = products.findIndex((p) => p.id === productId); // Ürünün dizideki indexini buluyoruz.
  if (productIndex !== -1) {
    products[productIndex] = {
      ...products[productIndex],
      title: updatedTitle,
      price: updatedPrice,
      description: updatedDescription,
    }; // Ürünün bilgilerini güncelliyoruz.
    displayProducts(products); // Ürünleri ekrana yazdır.
  }
  closeModal(); // Modalı kapatıyoruz.
}

function openDeleteModal(productId) {
  // Silme modalını açan fonksiyon
  const modalContainer = document.getElementById("modal-container");

  modalContainer.innerHTML = `
    <div class=modal id="delete-modal">
        <div class="modal-content">
            <h2>Delete Product</h2>
            <p>Are you sure you want to delete this product?</p>
            <button type="button" onclick="deleteProduct(${productId})">Delete</button>
            <button type="button" onclick="closeModal()">Cancel</button>
        </div>
    </div>
  `;
  document.getElementById("delete-modal").style.display = "flex"; // Modalu görünür yap.
}

function deleteProduct(productId) {
  // Ürünü silen fonksiyon
  products = products.filter((p) => p.id !== productId); // Silinen ürünü diziden çıkarıyoruz.
  displayProducts(products); // Ürünleri ekrana yazdırıyoruz.
  closeModal();
}

function closeModal() {
  document.getElementById("modal-container").innerHTML = "";
}
