'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    var books = getBooksForDisplay()
    var book = books[0]

    var strHtml = '';
    strHtml += '<tr>';

    for (var key in book) {
        if (key === 'imgUrl' || key ==='Description'  || key=== 'rate') continue
        strHtml += `<th class="cell head-cell">${key}
                        </th>`
    }
    strHtml += `<th colspan="3" class="cell head-cell">action</th>`
    strHtml += '</tr>';

    books.map(function (book) {
        strHtml += '<tr>';
        for (var key in book) {
            if (key === 'imgUrl'|| key ==='Description' || key=== 'rate') continue
            strHtml += `<td  class="cell cell-${key}">
                                ${book[key]}
                            </td>`
        }

        strHtml += `<td colspan="3"  class="cell cell-action">   
            <button  class="button-read" onclick="onReadBook('${book.id}')">read</button>
            <button  class="button-update" onclick="onUpdateBook('${book.id}')">upDate</button>
            <button  class="button-delete" onclick="onRemoveBook('${book.id}')">delete</button></td>`

        strHtml += '</tr>';

    });
    var elMat = document.querySelector('.books-table');
    elMat.innerHTML = strHtml;
}

function onUpdateBook(bookId) {
    var bookPrice = + prompt('the update price')
    updateBook(bookId, bookPrice);
    renderBooks()
}

function onRemoveBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}



function onReadBook(bookId) {


    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h5').innerText = book.title
    elModal.querySelector('.rate').innerHTML = `<button onclick="onChanegRating('${book.id}',-1)">-</button>${book.rate} <button onclick="onChanegRating('${book.id}',1)">+</button>`
  elModal.querySelector('img').src = 'img/'+book.imgUrl+'.jpg';
   // console.log( elModal.querySelector('img'));
     elModal.querySelector('p').innerText = book.Description
    elModal.hidden = false;


}

function onAddBook() {
    var title = prompt('the book title');
    var price = +prompt('the book price');
    console.log('add', title, price);
    addBook(title, price)
    renderBooks()
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}

function onChanegRating(bookId,add){
    var book = getBookById(bookId)
    chanegRating(bookId,add);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('.rate').innerHTML = `<button onclick="onChanegRating('${book.id}',-1)">-</button>${book.rate} <button onclick="onChanegRating('${book.id}',1)">+</button>`

}