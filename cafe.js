"use strict";
const getElement = selector => document.querySelector(selector);

const getSelectedProduct = src => {
    const filename = src.split("/").pop().replace("_info", "");

    switch (filename) {
        case "espresso.jpg":
            return { name: "Espresso", price: 1.95 };
        case "latte.jpg":
            return { name: "Latte", price: 2.95 };
        case "cappuccino.jpg":
            return { name: "Cappuccino", price: 3.45 };
        case "coffee.jpg":
            return { name: "Drip coffee", price: 1.75 };
        case "biscotti.jpg":
            return { name: "Biscotti", price: 1.95 };
        case "scone.jpg":
            return { name: "Scone", price: 2.95 };
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const order = getElement("#order");
    const totalDisplay = getElement("#total");
    let total = 0;

    for (const image of document.querySelectorAll("#menu img")) {
        const originalSrc = image.getAttribute("src");
        const rollover = new Image();
        rollover.src = image.id;

        image.addEventListener("mouseenter", () => {
            image.src = image.id;
        });

        image.addEventListener("mouseleave", () => {
            image.src = originalSrc;
        });

        image.parentElement.addEventListener("click", event => {
            event.preventDefault();
            const product = getSelectedProduct(originalSrc);
            const item = document.createElement("option");
            item.textContent = "$" + product.price.toFixed(2) +
                " - " + product.name;
            order.appendChild(item);

            total += product.price;
            totalDisplay.textContent = "Total: $" + total.toFixed(2);
        });
    }

    getElement("#place_order").addEventListener("click", () => {
        window.location.href = "checkout.html";
    });

    getElement("#clear_order").addEventListener("click", () => {
        order.textContent = "";
        total = 0;
        totalDisplay.textContent = "";
    });
});
