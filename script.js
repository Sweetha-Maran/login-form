function login() {
    const username = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    const validUsername = "admin";
    const validPassword = "admin@123";

   
    if (!username || !password) {
        alert("Please fill in all required fields");
        return;
    }

    if (username === validUsername && password === validPassword) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert("Hai " + username + ", your account logged in successfully");
        window.location.href = 'Product.html';
    } 
    else {
        alert("Invalid username or password");
    }
}


// 
 document.addEventListener("DOMContentLoaded", () => {
  const productForm = document.getElementById("productForm");
  const productList = document.getElementById("productList");

  function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    productList.innerHTML = "";
    products.forEach(prod => {
      const row = `<tr>
        <td>${prod.name}</td>
        <td>₹${prod.price}</td>
        <td>${prod.stock}</td>
        <td>${prod.description}</td>
      </tr>`;
      productList.innerHTML += row;
    });
  }

  function validateInput(input, condition) {
    const feedback = input.nextElementSibling;
    if (!condition) {
      feedback.style.display = "block";
      input.classList.add("error");
      return false;
    } else {
      feedback.style.display = "none";
      input.classList.remove("error");
      return true;
    }
  }

  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const price = document.getElementById("price");
    const stock = document.getElementById("stock");
    const description = document.getElementById("description");

    const isNameValid = validateInput(name, name.value.trim() !== "");
    const isPriceValid = validateInput(price, Number(price.value) > 0);
    const isStockValid = validateInput(stock, Number(stock.value) >= 0);
    const isDescValid = validateInput(description, description.value.trim().length >= 5);

    if (isNameValid && isPriceValid && isStockValid && isDescValid) {
      const products = JSON.parse(localStorage.getItem("products")) || [];
      products.push({
        name: name.value.trim(),
        price: Number(price.value),
        stock: Number(stock.value),
        description: description.value.trim()
      });
      localStorage.setItem("products", JSON.stringify(products));
      productForm.reset();
      loadProducts();
    }
  });

  loadProducts();
});
