const KEY = 'books'

var gBooks
var gNumberOfBook = 5
var gBooksName = ['Jane Eyre', 'Wuthering Heights', 'Agnes Grey','Villette','To a Wreath of Snow']

_createBooks()

// list
function getBooksForDisplay(){
    return gBooks;
}

//DELETE
function deleteBook(bookId) {
    // if
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    console.log(gBooks);
    _saveBooksToStorage()
}

// CREATE
function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

// READ
function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return book
}

// UPDATE
function updateBook(bookId, newPrice) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    book.price = newPrice;
    _saveBooksToStorage()
}


function chanegRating(bookId,add) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    if( book.rate + add >10 ||  book.rate + add < 0) return
    book.rate += add;
    _saveBooksToStorage()
}


function _createBook(bookName, price = getRandomIntInclusive(1,100)) {
   
    return {
        id: makeId(),
        title: bookName,
        price: price,
        imgUrl: bookName,
        Description:makeLorem(),
        rate:0
        
    }
}

function _createBooks(){
    var books = loadFromStorage(KEY)
    if(!books || !books.length){
        books = []
        // map
        for (var i = 0; i < gNumberOfBook; i++) {
            books.unshift( _createBook(gBooksName[i]))
            gBooks = books;
            _saveBooksToStorage();
            
        }
    }
    gBooks = books;
}


function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}