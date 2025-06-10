function add() {
    var itemInput = document.getElementById("task");
    var qtyInput = document.getElementById("quantity");
    var priceInput = document.getElementById("price");

    var item = itemInput.value.trim();
    var quantity = qtyInput.value.trim();
    var price = priceInput.value.trim();

    if (item === "" || quantity === "" || price === "") return;

    var li = document.createElement('li');
    li.className = "list-item";

    var span = document.createElement('span');
    span.className = 'taskname';

    let total = (parseFloat(price) * parseFloat(quantity)).toFixed(2);
    span.innerHTML = `
        <div class="item-title">${item} —</div>
        <div class="item-detail">Qty: <span>${quantity}</span></div>
        <div class="item-detail">Price: ₹<span>${price}</span></div>
        <div class="item-detail total">Total: ₹<span>${total}</span></div>
    `;

    var buttons = document.createElement('div');
    buttons.className = "buttons";

    var canbut = document.createElement('button');
    canbut.className = "Cancel";
    canbut.innerText = "Cancel";
    canbut.onclick = () => li.remove();

    var edit = document.createElement('button');
    edit.className = "edit";
    edit.innerText = "Edit";
    edit.onclick = () => {
        var newItem = prompt("Edit item name:", item);
        var newQty = prompt("Edit quantity:", quantity);
        var newPrice = prompt("Edit price:", price);

        if (newItem && newQty && newPrice) {
            item = newItem.trim();
            quantity = newQty.trim();
            price = newPrice.trim();
            let newTotal = (parseFloat(price) * parseFloat(quantity)).toFixed(2);
            span.innerHTML = `
                <div class="item-title">${item} —</div>
                <div class="item-detail">Qty: <span>${quantity}</span></div>
                <div class="item-detail">Price: ₹<span>${price}</span></div>
                <div class="item-detail total">Total: ₹<span>${newTotal}</span></div>
            `;
        }
    };

    var complete = document.createElement('button');
    complete.className = "complete";
    complete.innerText = "Bought";
    complete.onclick = () => {
        span.style.textDecoration =
            span.style.textDecoration === "line-through" ? "none" : "line-through";
    };

    buttons.appendChild(canbut);
    buttons.appendChild(edit);
    buttons.appendChild(complete);

    li.appendChild(span);
    li.appendChild(buttons);
    document.getElementById("out").appendChild(li);

    itemInput.value = "";
    qtyInput.value = "";
    priceInput.value = "";
}

["task", "quantity", "price"].forEach(id => {
    document.getElementById(id).addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); 
            add();
        }
    });
});
