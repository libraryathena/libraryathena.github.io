function preload() {
  let grid = document.querySelector("#grid");
  let output = "";
  books.forEach((book) => {
    output += `
    <li class="book-item small-12 medium-6 columns" data-groups='${JSON.stringify(book.categories)}' data-date-created='${book.year}' data-title='${book.title}' data-color='${book.color}'>
      <div class="bk-img">
          <div class="bk-wrapper">
              <div class="bk-book bk-bookdefault">
                  <div class="bk-front">
                      <div class="bk-cover" style="background-image: url('${book.cover.small}')">
                      </div>
                  </div>
                  <div class="bk-back"></div>
                  <div class="bk-left"></div>
              </div>
          </div>
      </div>
      <div class="item-details">
          <h3 class="book-item_title">${book.title}</h3>
          <p class="author">by ${book.author} &bull; ${book.year}</p>
          <p>${book.preview}</p>
          <a href="#" class="button ">Details</a>
      </div>
    
      <div class="overlay-details row">
          <a href="#" class="close-overlay-btn">Close</a>
          <div class="overlay-image medium-4 small-3 columns">
              <img src="${book.cover.large}" alt="Book Cover">
              <div class="back-color"></div>
          </div>
          <div class="overlay-desc activated medium-8 small-9 columns">
              <h2 class="overlay_title">${book.title}</h2>
              <p class="author">by ${book.author}</p>
              <p class="published">${book.year}</p>
              <p class="synopsis">${book.synopsis}</p>
              <a href="#" class="button preview">Review</a>
          </div>
          <div class="overlay-preview medium-8 small-9 columns">
              <a href="#" class="back-preview-btn">Back</a>
              <h4 class="preview-title">Review</h4>
              <div class="preview-content">
                  <h5>${book.contents[0].title}</h5>
                  ${book.contents[0].paragraph}
              </div>
          </div>
      </div>
    </li>
    `;
  });
  grid.innerHTML = output;
}

preload();

var bookTitles = books.map((book) => book.title);

// Get Color Attribute
// Set the background book color
$("li.book-item").each(function () {
  var $this = $(this);

  $this.find(".bk-front > div").css('background-color', $(this).data("color"));
  $this.find(".bk-left").css('background-color', $(this).data("color"));
  $this.find(".back-color").css('background-color', $(this).data("color"));

  $this.find(".item-details a.button").on('click', function () {
    displayBookDetails($this);
  });
});

function displayBookDetails(el) {
  var $this = $(el);
  $('.main-container').addClass('prevent-scroll');
  $('.main-overlay').fadeIn();

  $this.find('.overlay-details').clone().prependTo('.main-overlay');

  $('a.close-overlay-btn').on('click', function (e) {
    e.preventDefault();
    $('.main-container').removeClass('prevent-scroll');
    $('.main-overlay').fadeOut();
    $('.main-overlay').find('.overlay-details').remove();
  });

  $('.main-overlay a.preview').on('click', function () {
    $('.main-overlay .overlay-desc').toggleClass('activated');
    $('.main-overlay .overlay-preview').toggleClass('activated');
  });

  $('.main-overlay .back-preview-btn').on('click', function () {
    $('.main-overlay .overlay-desc').toggleClass('activated');
    $('.main-overlay .overlay-preview').toggleClass('activated');
  });
}

function displayGuestForm() {
  $('.main-overlay').fadeIn();
  $('.main-overlay').prepend(`
  <form class="guest-form hidden">
      <div class="guest-form-title">GUEST BOOK</div>
      <div class="row">
          <div class="columns medium-6">
              <label>First Name
                  <input type="text" id="guest-first-name">
              </label>
          </div>
          <div class="columns medium-6">
              <label>Last Name
                  <input type="text" id="guest-last-name">
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label>Cabin
                  <select id="guest-cabin">
                      <option value="Aphrodite">Aphrodite</option>
                      <option value="Apollo">Apollo</option>
                      <option value="Ares">Ares</option>
                      <option value="Athena">Athena</option>
                      <option value="Demeter">Demeter</option>
                      <option value="Dionysus">Dionysus</option>
                      <option value="Hephaestus">Hephaestus</option>
                      <option value="Hermes">Hermes</option>
                  </select>
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns" style="width: 100%; text-align: center;">
              <button class="button" id="guest-submit">SUBMIT</button>
          </div>
      </div>
  </form>
  `);

  $this = $('.guest-form');
  $this.removeClass('hidden');
  $this.fadeIn();

  $('#guest-submit').on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    setCookie("first-name", $('#guest-first-name').val(), 10 * 60);
    setCookie("last-name", $('#guest-last-name').val(), 10 * 60);
    setCookie("visiting-date", new Date(), 10 * 60);

    isAllowCloseOverlay = true;
    closeOverlay();

    return false;
  });
}

function displayReturnForm() {
  $('.main-container').removeClass('nav-menu-open');
  $('.main-overlay').prepend(`
  <form class="return-form hidden">
      <div class="return-form-title">RETURN BOOK</div>
      <div class="row">
          <div class="columns medium-6">
              <label>First Name
                  <input type="text" id="return-first-name">
              </label>
          </div>
          <div class="columns medium-6">
              <label>Last Name
                  <input type="text" id="return-last-name">
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label>Cabin
                  <select id="return-cabin">
                      <option value="Aphrodite">Aphrodite</option>
                      <option value="Apollo">Apollo</option>
                      <option value="Ares">Ares</option>
                      <option value="Athena">Athena</option>
                      <option value="Demeter">Demeter</option>
                      <option value="Dionysus">Dionysus</option>
                      <option value="Hephaestus">Hephaestus</option>
                      <option value="Hermes">Hermes</option>
                  </select>
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label>Book Name
                  <input type="text" id="return-book-name" />
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label for="return-book-card">Upload Membership Card</label>
              <input type="file" id="return-book-card" accept="image/*"/>
          </div>
      </div>
      <div class="row">
          <div class="columns" style="width: 100%; text-align: center;">
              <button class="button" id="return-submit">RETURN</button>
          </div>
      </div>
  </form>
  `);

  $this = $('.return-form');
  $this.removeClass('hidden');
  $this.fadeIn();

  $('#return-book-name').autocomplete({ source: bookTitles });
  $('#return-submit').on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    var returnEntry = new ReturnEntry({
      firstName: $('#return-first-name').val(),
      lastName: $('#return-last-name').val(),
      cabin: $('#return-cabin').val(),
      book: $('#return-book-name').val(),
      returnDate: moment(new Date()).format('DD MMM YYYY')
    });
    console.log(`Pre: ${JSON.stringify(returnEntry)}`);

    let docRef = db.collection(COLLECTION_ID)
      .withConverter(returnConverter)
      .doc(RETURN_ID);

    db.runTransaction((transaction) => {
      return transaction
        .get(docRef)
        .then((doc) => {
          console.log('Pre transaction');
          transaction.update(docRef, {
            entries: firebase.firestore.FieldValue.arrayUnion(returnEntry.toObject())
          })
          console.log('Post transaction')
        });
    }).then(() => {
      alert('Book returned');
      closeOverlay();
    }).catch((error) => {
      console.log("Error: " + error);
      alert(`Error: ${error}`);
    })

    return false;
  });
}

function displayRentForm() {
  $('.main-container').removeClass('nav-menu-open');
  $('.main-overlay').prepend(
    `
  <form class="rent-form">
      <div class="rent-form-title">RENT BOOK</div>
      <div class="row">
          <div class="columns medium-6">
              <label>First Name
                  <input type="text" id="rent-first-name">
              </label>
          </div>
          <div class="columns medium-6">
              <label>Last Name
                  <input type="text" id="rent-last-name">
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label>Cabin
                  <select id="rent-cabin">
                      <option value="Aphrodite">Aphrodite</option>
                      <option value="Apollo">Apollo</option>
                      <option value="Ares">Ares</option>
                      <option value="Athena">Athena</option>
                      <option value="Demeter">Demeter</option>
                      <option value="Dionysus">Dionysus</option>
                      <option value="Hephaestus">Hephaestus</option>
                      <option value="Hermes">Hermes</option>
                  </select>
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label>Rent Date
                  <input type="text" id="rent-date" value=""/>
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label>Book Name
                  <input type="text" id="rent-book-name" />
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label for="rent-book-card">Upload Membership Card</label>
              <input type="file" id="rent-book-card" accept="image/*"/>
          </div>
      </div>
      <div class="row">
          <div class="columns" style="width: 100%; text-align: center;">
              <button class="button" id="rent-submit">SUBMIT</button>
          </div>
      </div>
  </form>
  `);

  $this = $('.rent-form');
  $this.removeClass('hidden');
  $this.fadeIn();

  $('#rent-date').daterangepicker({
    opens: 'left',
    drops: 'up',
    minDate: new Date(),
    locale: {
      format: 'DD MMM YYYY',
      separator: ' - '
    }
  }, function (start, end, label) {
    console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
  });
  $('#rent-book-name').autocomplete({ source: bookTitles });
  $('#rent-submit').on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    var rentEntry = new RentEntry({
      firstName: $('#rent-first-name').val(),
      lastName: $('#rent-last-name').val(),
      cabin: $('#rent-cabin').val(),
      book: $('#rent-book-name').val(),
      startDate: $('#rent-date').val().split(' - ')[0],
      endDate: $('#rent-date').val().split(' - ')[1],
    });

    let docRef = db.collection(COLLECTION_ID)
      .withConverter(rentConverter)
      .doc(RENT_ID);

    db.runTransaction((transaction) => {
      return transaction
        .get(docRef)
        .then((doc) => {
          transaction.update(docRef, {
            entries: firebase.firestore.FieldValue.arrayUnion(rentEntry.toObject())
          })
        });
    }).then(() => {
      alert('Rent success');
      closeOverlay();
    }).catch((error) => {
      console.log("Error: " + error);
      alert(`Error: ${error}`);
    })

    return false;
  });
}

function displayRequestForm() {
  $('.main-container').removeClass('nav-menu-open');
  $('.main-overlay').prepend(`
  <form class="request-form hidden">
      <div class="request-form-title">REQUEST BOOK FORM</div>
      <div class="row">
          <div class="columns medium-6">
              <label>First Name
                  <input type="text" id="request-first-name">
              </label>
          </div>
          <div class="columns medium-6">
              <label>Last Name
                  <input type="text" id="request-last-name">
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label>Cabin
                  <select id="request-cabin">
                      <option value="Aphrodite">Aphrodite</option>
                      <option value="Apollo">Apollo</option>
                      <option value="Ares">Ares</option>
                      <option value="Athena">Athena</option>
                      <option value="Demeter">Demeter</option>
                      <option value="Dionysus">Dionysus</option>
                      <option value="Hephaestus">Hephaestus</option>
                      <option value="Hermes">Hermes</option>
                  </select>
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label>Book Title
                  <input type="text" id="request-book-title" />
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns">
              <label>Author
                  <input type="text" id="request-book-author" />
              </label>
          </div>
      </div>
      <div class="row">
          <div class="columns" style="width: 100%; text-align: center;">
              <button class="button" id="request-submit">REQUEST BOOK</button>
          </div>
      </div>
  </form>
  `);

  $this = $('.request-form');
  $this.removeClass('hidden');
  $this.fadeIn();

  $('#request-submit').on('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    var requestEntry = new RequestEntry({
      firstName: $('#request-first-name').val(),
      lastName: $('#request-last-name').val(),
      cabin: $('#request-cabin').val(),
      book: $('#request-book-title').val(),
      author: $('#request-book-author').val()
    });
    console.log(`Pre: ${JSON.stringify(requestEntry)}`);

    let docRef = db.collection(COLLECTION_ID)
      .withConverter(requestConverter)
      .doc(REQUEST_ID);

    db.runTransaction((transaction) => {
      return transaction
        .get(docRef)
        .then((doc) => {
          console.log('Pre transaction');
          transaction.update(docRef, {
            entries: firebase.firestore.FieldValue.arrayUnion(requestEntry.toObject())
          })
          console.log('Post transaction')
        });
    }).then(() => {
      alert('Book requested');
      closeOverlay();
    }).catch((error) => {
      console.log("Error: " + error);
      alert(`Error: ${error}`);
    });

    return false;
  });
}

/*
 *  Offcanvas Menu
 */
// Open Offcanvas Menu
$('.main-navigation a').on('click', function () {
  $('.main-container').addClass('nav-menu-open');
  $('.main-overlay').fadeIn();
});

// Close Offcanvas Menu
$('.overlay-full').on('click', closeOverlay);
$('#close-nav').on('click', closeOverlay);
$('.close-nav-btn').on('click', closeOverlay);

var isAllowCloseOverlay = true;

function closeOverlay() {
  if (!isAllowCloseOverlay) return;
  
  $('.main-container').removeClass('nav-menu-open');
  $('.main-container').removeClass('prevent-scroll');

  $('.main-overlay').fadeOut();
  $('.main-overlay').find('.overlay-details').remove();
  $('.main-overlay').find('.rent-form').remove();
  $('.main-overlay').find('.return-form').remove();
  $('.main-overlay').find('.request-form').remove();
  $('.main-overlay').find('.guest-form').remove();
}

/*
 *  Shuffle.js for Search, Catagory filter and Sort
 */

// Initiate Shuffle.js
var Shuffle = window.shuffle;

var bookList = function (element) {
  this.element = element;

  this.shuffle = new Shuffle(element, {
    itemSelector: '.book-item',
  });

  this._activeFilters = [];
  this.addFilterButtons();
  this.addSorting();
  this.addSearchFilter();
  this.mode = 'exclusive';
};

bookList.prototype.toArray = function (arrayLike) {
  return Array.prototype.slice.call(arrayLike);
};

// Catagory Filter Functions
// Toggle mode for the Catagory filters
bookList.prototype.toggleMode = function () {
  if (this.mode === 'additive') {
    this.mode = 'exclusive';
  } else {
    this.mode = 'additive';
  }
};

// Filter buttons eventlisteners
bookList.prototype.addFilterButtons = function () {
  var options = document.querySelector('.filter-options');
  if (!options) {
    return;
  }
  var filterButtons = this.toArray(options.children);

  filterButtons.forEach(function (button) {
    button.addEventListener('click', this._handleFilterClick.bind(this), false);
  }, this);
};

// Function for the Catagory Filter
bookList.prototype._handleFilterClick = function (evt) {
  var btn = evt.currentTarget;
  var isActive = btn.classList.contains('active');
  var btnGroup = btn.getAttribute('data-group');

  if (this.mode === 'additive') {
    if (isActive) {
      this._activeFilters.splice(this._activeFilters.indexOf(btnGroup));
    } else {
      this._activeFilters.push(btnGroup);
    }

    btn.classList.toggle('active');
    this.shuffle.filter(this._activeFilters);

  } else {
    this._removeActiveClassFromChildren(btn.parentNode);

    var filterGroup;
    if (isActive) {
      btn.classList.remove('active');
      filterGroup = Shuffle.ALL_ITEMS;
    } else {
      btn.classList.add('active');
      filterGroup = btnGroup;
    }

    this.shuffle.filter(filterGroup);
  }
};

// Remove classes for active states
bookList.prototype._removeActiveClassFromChildren = function (parent) {
  var children = parent.children;
  for (var i = children.length - 1; i >= 0; i--) {
    children[i].classList.remove('active');
  }
};

// Sort By
// Watching for the select box to change to run
bookList.prototype.addSorting = function () {
  var menu = document.querySelector('.sort-options');
  if (!menu) {
    return;
  }
  menu.addEventListener('change', this._handleSortChange.bind(this));
};

// Sort By function Handler runs on change
bookList.prototype._handleSortChange = function (evt) {
  var value = evt.target.value;
  var options = {};

  function sortByDate(element) {
    return element.getAttribute('data-date-created');
  }

  function sortByTitle(element) {
    return element.getAttribute('data-title').toLowerCase();
  }

  if (value === 'date-created') {
    options = {
      reverse: true,
      by: sortByDate,
    };
  } else if (value === 'title') {
    options = {
      by: sortByTitle,
    };
  }

  this.shuffle.sort(options);
};

// Searching the Data-attribute Title
// Advanced filtering
// Waiting for input into the search field
bookList.prototype.addSearchFilter = function () {
  var searchInput = document.querySelector('.shuffle-search');
  if (!searchInput) {
    return;
  }
  searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
};

// Search function Handler to search list
bookList.prototype._handleSearchKeyup = function (evt) {
  var searchInput = document.querySelector('.shuffle-search');
  var searchText = evt.target.value.toLowerCase();

  // Check if Search input has value to toggle class
  if (searchInput && searchInput.value) {
    $('.catalog-search').addClass('input--filled');
  } else {
    $('.catalog-search').removeClass('input--filled');
  }

  this.shuffle.filter(function (element, shuffle) {

    // If there is a current filter applied, ignore elements that don't match it.
    if (shuffle.group !== Shuffle.ALL_ITEMS) {
      // Get the item's groups.
      var groups = JSON.parse(element.getAttribute('data-groups'));
      var isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;

      // Only search elements in the current group
      if (!isElementInCurrentGroup) {
        return false;
      }
    }

    var titleElement = element.querySelector('.book-item_title');
    var titleText = titleElement.textContent.toLowerCase().trim();

    return titleText.indexOf(searchText) !== -1;
  });
};

function setCookie(key, value, expireDuration) {
  cookie = `${key}=${value}; max-age=${expireDuration}`;
  document.cookie = cookie;
}

function getCookie(key) {
  var match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
  if (match) return match[2];
}

// Wait till dom load to start the Shuffle js funtionality
document.addEventListener('DOMContentLoaded', function () {
  window.book_list = new bookList(document.getElementById('grid'));
  // if (!getCookie("first-name")) {
  //   isAllowCloseOverlay = false;
  //   displayGuestForm();
  // }
});