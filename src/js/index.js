import "./import/modules";

document.addEventListener("DOMContentLoaded", () => {
    const $productBox = document.querySelector(".js-product");

    const $filterInput = document.querySelector(".js-filter");

    const API_URL = "https://603e38c548171b0017b2ecf7.mockapi.io/homes";

    const handleProduct = (product) => {
        $productBox.innerHTML = product.map(item => {
            const product_id = item.id;
            const product_title = item.title;
            const product_adress = item.address;
            const product_type = item.type;
            const product_price = item.price;

            if (product_type === "IndependentLiving") {
                return `
                <li class="product__item">
                    <a href="/details/${product_id}" class="product__link">
                        <div class="product__img">
                            <img src="img/img/product/product-img${product_id}.jpg"> 
                            <div class="product__hint product__hint--independent">
                                <span class="product__hint-text">
                                    Independent livin
                                </span>
                            </div>
                        </div>
                        <div class="product__info">
                            <span class="product__title">
                                ${product_title}
                            </span>
                            <span class="product__address">
                                ${product_adress}
                            </span>
                            <span class="product__price">
                                New Properties for Sale from <span class="product__price--bold">£${product_price}</span>
                            </span>
                            <span class="product__shared">
                                Shared Ownership Available
                            </span>
                        </div>
                    </a>
                </li>
            `;
            }

            if (product_type === "SupportAvailable") {
                return `
                <li class="product__item">
                    <a href="/details/${product_id}" class="product__link">
                        <div class="product__img">
                            <img src="img/img/product/product-img${product_id}.jpg"> 
                            <div class="product__hint product__hint--support">
                                <span class="product__hint-text">
                                Restaurant & Support available
                                </span>
                            </div>
                        </div>
                        <div class="product__info">
                            <span class="product__title">
                                ${product_title}
                            </span>
                            <span class="product__address">
                                ${product_adress}
                            </span>
                            <span class="product__price">
                                New Properties for Sale from <span class="product__price--bold">£${product_price}</span>
                            </span>
                            <span class="product__shared">
                                Shared Ownership Available
                            </span>
                        </div>
                    </a>
                </li>
            `;
            }
        }).join("");
        $productBox.classList.remove("error");
    };

    const handleProductError = () => {
        $productBox.classList.add("error");
        $productBox.innerHTML = "";
    };

    const getProduct = (url, value) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        xhr.responseType = "json";
        xhr.onload = function () {

            if (xhr.status != 200) {
                alert("Ошибка: " + xhr.status);
                return;
            }

            let product = xhr.response;

            if (value.length > 3) {
                product = product.filter(item => {
                    return item.title.includes(value);
                });

                if (!product.length) {
                    handleProductError();
                } else {
                    handleProduct(product);
                }
            } else {
                handleProduct(product);
            }
        };

        xhr.onerror = function () {
            alert("Ошибка, попробуйте позже");
        };
    };

    if ($productBox) {
        getProduct(API_URL, $filterInput.value);

        $filterInput.addEventListener("input", (e) => {
            const correctValue = e.currentTarget.value;
            getProduct(API_URL, correctValue);
        });
    }
});