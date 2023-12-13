function showQuantityCart() {
	var cartArray = JSON.parse(localStorage.getItem('cart'));
	const quantityCard = document.querySelector('.cart-quantity');
	const quantityCardText = document.querySelector('.cart-quantity-text');
	if (cartArray == null || cartArray == [] || cartArray.length == 0) {
		quantityCard.style.display = 'none';
	} else if (cartArray.length < 10) {
		quantityCard.style.display = 'flex';
		quantityCardText.textContent = cartArray.length;
	} else {
		quantityCard.style.display = 'flex';
		quantityCardText.textContent = "9+";
	}
}
document.addEventListener('DOMContentLoaded', function() {
    showQuantityCart();
});

function checkQuantity() {
	let quantityInput = document.querySelector('.quantity-input');
	let quantity = quantityInput.value.trim();
	let check = parseInt(quantity);
	if (!Number.isInteger(check) || !/^[1-9]\d*$/.test(quantity)) {
		quantity = check;
		quantityInput.value = quantity;
	}
	if (isNaN(check) || quantity == 0) {
		quantity = 1;
		quantityInput.value = 1;
	}
	if (quantity < 20 && quantity != 11 && quantity != 10) {
        quantityInput.value = quantity%10;
    }
	console.log(quantity);
}

function addToCart(productid1) {
	var size = document.getElementById('size').value;
	var quantity = document.querySelector('.quantity-input').value;
	var productArray = JSON.parse(localStorage.getItem('listProducts'));
	var producttemp;
	for (var i = 0; i < productArray.length; i++) {
		if (productArray[i].id == productid1) {
			producttemp = productArray[i];
		}
	}
	if (localStorage.getItem('cart') === null) {
		var cartArray = [];
		producttemp.quantity = quantity;
		producttemp.size = size;
		var price = parseFloat(producttemp.price.replace('$', ''));
		producttemp.totalprice = (quantity * price).toLocaleString() + "$";
		cartArray.unshift(producttemp);
		localStorage.setItem('cart', JSON.stringify(cartArray));
	} else {
		let flag = 0;
		var cartArray = JSON.parse(localStorage.getItem('cart'));
		for (var i = 0; i < cartArray.length; i++) {
			if (cartArray[i].id == productid1 && cartArray[i].size == size) {
				cartArray[i].quantity = (parseInt(cartArray[i].quantity) + parseInt(quantity)).toLocaleString();
				var price = parseFloat(cartArray[i].price.replace('$', ''));
				cartArray[i].totalprice = (cartArray[i].quantity * price).toLocaleString() + "$";
				flag = 1;
				localStorage.setItem('cart', JSON.stringify(cartArray));
			}
		}
		if (flag == 0) {
			producttemp.quantity = quantity;
			producttemp.size = size;
			var price = parseFloat(producttemp.price.replace('$', ''));
			producttemp.totalprice = (quantity * price).toLocaleString() + "$";
			cartArray.unshift(producttemp);
			localStorage.setItem('cart', JSON.stringify(cartArray));
		}
	}
	showQuantityCart();
}

function showCartTable() {
	if (localStorage.getItem('cart') === null || localStorage.getItem('cart') == '[]') {
		var s = '<tr><p>Không có sản phẩm nào trong giỏ hàng</p></tr>';
		document.getElementsByClassName('carttable')[0].innerHTML = s;
		document.getElementById('totalprice').innerHTML = 0;
	} else {
		var cartArray = JSON.parse(localStorage.getItem('cart'));
		var s = '<tr><th></th><th>Sản phẩm</th><th>Giá</th><th>Số lượng</th><th>Tổng</th><th></th></tr>';
		var totalprice = 0;
		for (var i = 0; i < cartArray.length; i++) {
			s += '<tr>' +
				'<td><img src="' + cartArray[i].url + '"></td>' +
				'<td>' +
				'<div>' + cartArray[i].name + '</div>' +
				'<div>Size: ' + cartArray[i].size + '</div>' +
				'</td>' +
				'<td>' + cartArray[i].price + '</td>' +
				'<td>' +
				'<button onClick="quantitydown2(' + cartArray[i].id + ',' + cartArray[i].size + ')">-</button>' +
				'<input id="quantity" type="text" disabled value="' + cartArray[i].quantity + '" onchange="updateCart(this.value,' + cartArray[i].id + ')">' +
				'<button onClick="quantityup2(' + cartArray[i].id + ',' + cartArray[i].size + ')">+</button>' +
				'</td>' +
				'<td>' + cartArray[i].totalprice + '</td>' +
				'<td><img src="../assets/img/img__delete.png" class="img-delete" onClick="deletecartitem(' + cartArray[i].id + ')"></td>' +
				'</tr>';
			let price = parseFloat(cartArray[i].price.replace('$', ''));
			totalprice += cartArray[i].quantity * price;
		}
		totalprice = totalprice.toLocaleString() + "$";
		document.getElementsByClassName('carttable')[0].innerHTML = s;
		document.getElementById('totalprice').innerHTML = totalprice;
	}
}
showCartTable();

function deletecartitem(id) {
	var cartArray = JSON.parse(localStorage.getItem('cart'));
	for (var i = 0; i < cartArray.length; i++) {
		if (cartArray[i].id == id) {
			cartArray.splice(i, 1);
		}
	}
	localStorage.setItem('cart', JSON.stringify(cartArray));
	showCartTable();
	showQuantityCart();
}

function deletecart() {
	localStorage.removeItem('cart');
	showCartTable();
	showQuantityCart();
}

function updateCart(quantity, id) {
	var cartArray = JSON.parse(localStorage.getItem('cart'));
	for (var i = 0; i < cartArray.length; i++) {
		if (cartArray[i].id == id) {
			cartArray[i].quantity = quantity;
		}
	}
	localStorage.setItem('cart', JSON.stringify(cartArray));
	showCartTable();
}

function quantitydown() {
	if (document.getElementById('quantity').value > 1) {
		document.getElementById('quantity').value--;
	}
}

function quantityup() {

	document.getElementById('quantity').value++;
}

function quantitydown2(id, size) {
	var cartArray = JSON.parse(localStorage.getItem('cart'));
	for (var i = 0; i < cartArray.length; i++) {
		if (cartArray[i].id == id && cartArray[i].size == size) {
			if (cartArray[i].quantity > 1)
				cartArray[i].quantity--;
			let price = parseFloat(cartArray[i].price.replace('$', ''));
			cartArray[i].totalprice = (price * cartArray[i].quantity) + '$';
		}
	}
	localStorage.setItem('cart', JSON.stringify(cartArray));
	showCartTable();
}

function quantityup2(id, size) {
	var cartArray = JSON.parse(localStorage.getItem('cart'));
	for (var i = 0; i < cartArray.length; i++) {
		if (cartArray[i].id == id && cartArray[i].size == size) {
			cartArray[i].quantity++;
			let price = parseFloat(cartArray[i].price.replace('$', ''));
			cartArray[i].totalprice = (price * cartArray[i].quantity) + '$';
		}
	}
	localStorage.setItem('cart', JSON.stringify(cartArray));
	showCartTable();
}

function purchase() {
	var info = '';
	var totalprice = 0;
	if (localStorage.getItem('cart') === null || localStorage.getItem('cart') == '[]') {
		return false;
	}
	var cartArray = JSON.parse(localStorage.getItem('cart'));
	for (var i = 0; i < cartArray.length; i++) {
		info += cartArray[i].name + ' size ' + cartArray[i].size + ' x' + cartArray[i].quantity + '<br>';
		let price = parseFloat(cartArray[i].price.replace('$', ''));
		totalprice += cartArray[i].quantity * price;
	}
	totalprice = totalprice + '$';
	var customer = JSON.parse(localStorage.getItem("name"));
	var date = new Date();
	var d = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
	if (localStorage.getItem('bill') === null) {
		var billArray = [];
		var bill = { id: billArray.length, info: info, totalprice: totalprice, customer: customer, date: d, status: 'Đang nhận đơn hàng' };
		billArray.unshift(bill);
		localStorage.setItem('bill', JSON.stringify(billArray));
	}
	else {
		var billArray = JSON.parse(localStorage.getItem('bill'));
		var bill = { id: billArray.length, info: info, totalprice: totalprice, customer: customer, date: d, status: 'Đang nhận đơn hàng' };
		billArray.unshift(bill);
		localStorage.setItem('bill', JSON.stringify(billArray));
	}
	localStorage.removeItem('cart');
	showBillTable();
	document.querySelector('.bill').style.display = 'flex';
	showCartTable();
	showQuantityCart();
}

function showBillTable() {
	let bill = JSON.parse(localStorage.getItem('bill'));
	if (bill == null) {
		let s = '<p>Lịch sử đơn hàng trống</p>'
		document.querySelector('.table-bill').innerHTML = s;
	}
	else {
		let name = JSON.parse(localStorage.getItem('name'));
		let s = '<table>' +
			'<tr class="first-row">' +
			'<td>Mã đơn hàng</td>' +
			'<td>Thông tin đơn hàng</td>' +
			'<td>Giá</td>' +
			'<td>Ngày đặt</td>' +
			'<td>Tình Trạng</td>' +
			'<td></td>' +
			'</tr>';
		for (let i = 0; i < bill.length; i++) {
			if (bill[i].customer == name && bill[i].status == 'Đang nhận đơn hàng') {
				s += '<tr>' +
					'<td class="center-column">' + bill[i].id + '</td>' +
					'<td class="info-column">' + bill[i].info + '</td>' +
					'<td class="center-column">' + bill[i].totalprice + '</td>' +
					'<td class="center-column">' + bill[i].date + '</td>' +
					'<td class="center-column">' + bill[i].status + '</td>' +
					'<td class="center-column"><button class="cancel-order" onclick="cancelOrder(' + bill[i].id + ')">Hủy đơn hàng</button></td>' +
					'</tr>'
			}
			else if (bill[i].customer == name) {
				s += '<tr>' +
					'<td class="center-column">' + bill[i].id + '</td>' +
					'<td class="info-column">' + bill[i].info + '</td>' +
					'<td class="center-column">' + bill[i].totalprice + '</td>' +
					'<td class="center-column">' + bill[i].date + '</td>' +
					'<td class="center-column">' + bill[i].status + '</td>' +
					'<td class="center-column"><button class="cancel-order not-allowed" onclick="cancelOrder(' + bill[i].id + ')">Hủy đơn hàng</button></td>' +
					'</tr>'
			}
		}
		s += '</table>';
		document.querySelector('.table-bill').innerHTML = s;
		console.log(bill);
		console.log(s);
	}

}
showBillTable();

function cancelOrder(id) {
	bill = JSON.parse(localStorage.getItem('bill'));
	for (let i = 0; i < bill.length; i++) {
		if (bill[i].id == id && bill[i].status == 'Đang nhận đơn hàng') {
			bill[i].status = 'Đã hủy đơn hàng';
		}
		localStorage.setItem('bill', JSON.stringify(bill));
		showBillTable();
	}
}

function cancelBillTable() {
	document.querySelector('.bill').style.display = 'none';
}

function showBillTable1() {
	document.querySelector('.bill').style.display = 'flex';
}

