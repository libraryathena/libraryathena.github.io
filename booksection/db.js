class RentEntry {
    constructor(entry) {
        this.firstName = entry.firstName;
        this.lastName = entry.lastName;
        this.cabin = entry.cabin;
        this.book = entry.book;
        this.startDate = entry.startDate;
        this.endDate = entry.endDate;
    }

    toObject() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            cabin: this.cabin,
            book: this.book,
            startDate: this.startDate,
            endDate: this.endDate
        };
    }
}

var rentConverter = {
    toFirestore: (rentEntry) => rentEntry.toObject(),
    fromFirestore: function (snapshot, options) {
        let list = snapshot.data(options).entries;
        return list.map(entry => new RentEntry(entry));
    }
}

class ReturnEntry {
    constructor(entry) {
        this.firstName = entry.firstName;
        this.lastName = entry.lastName;
        this.cabin = entry.cabin;
        this.book = entry.book;
        this.returnDate = entry.returnDate;
    }

    toObject() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            cabin: this.cabin,
            book: this.book,
            returnDate: this.returnDate
        };
    }
}

var returnConverter = {
    toFirestore: (returnEntry) => returnEntry.toObject(),
    fromFirestore: function (snapshot, options) {
        let list = snapshot.data(options).entries;
        return list.map(entry => new ReturnEntry(entry));
    }
}

class RequestEntry {
    constructor(entry) {
        this.firstName = entry.firstName;
        this.lastName = entry.lastName;
        this.cabin = entry.cabin;
        this.book = entry.book;
        this.author = entry.author;
    }

    toObject() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            cabin: this.cabin,
            book: this.book,
            author: this.author
        };
    }
}

var requestConverter = {
    toFirestore: (requestEntry) => requestEntry.toObject(),
    fromFirestore: function (snapshot, options) {
        let list = snapshot.data(options).entries;
        return list.map(entry => new RequestEntry(entry));
    }
}

const COLLECTION_ID = 'library';
const RENT_ID = 'rent';
const RETURN_ID = 'return';
const REQUEST_ID = 'request';

var rentEntries = [];
var returnEntries = [];
var requestEntries = [];

function checkRentEntries() {
    db.collection(COLLECTION_ID)
        .withConverter(rentConverter)
        .doc(RENT_ID).get()
        .then((doc) => rentEntries = doc.data());
}

function checkReturnEntries() {
    db.collection(COLLECTION_ID)
        .withConverter(returnConverter)
        .doc(RETURN_ID).get()
        .then((doc) => returnEntries = doc.data());
}

function dbLoad() {
    checkRentEntries();
    checkReturnEntries();
}

function asyncDbLoad(callback) {
    let rentPromise = db.collection(COLLECTION_ID)
        .withConverter(rentConverter)
        .doc(RENT_ID).get();

    let returnPromise = db.collection(COLLECTION_ID)
        .withConverter(returnConverter)
        .doc(RETURN_ID).get();

    let requestPromise = db.collection(COLLECTION_ID)
        .withConverter(requestConverter)
        .doc(REQUEST_ID).get();

    Promise.all([rentPromise, returnPromise, requestPromise])
        .then(snapshots => {
            callback(snapshots);
        });
}

function renderRentTable(rentEntries) {
    $('#rent-table').DataTable({
        paging: false,
        data: rentEntries,
        columns: [
            { data: 'lastName' },
            { data: 'firstName' },
            { data: 'cabin' },
            { data: 'book' },
            { data: 'startDate' },
            { data: 'endDate' }
        ]
    });
}

function renderReturnTable(returnEntries) {
    $('#return-table').DataTable({
        paging: false,
        data: returnEntries,
        columns: [
            { data: 'lastName' },
            { data: 'firstName' },
            { data: 'cabin' },
            { data: 'book' },
            { data: 'returnDate' }
        ]
    });
}

function renderRequestTable(requestEntries) {
    $('#request-table').DataTable({
        paging: false,
        data: requestEntries,
        columns: [
            { data: 'lastName' },
            { data: 'firstName' },
            { data: 'cabin' },
            { data: 'book' },
            { data: 'author' }
        ]
    });
}

function dumpToExcel(rentEntries, returnEntries) {
    let workbook = XLSX.utils.book_new();
    workbook.Props = {
        Title: "Athena's Library",
        Subject: "Book Rent & Return",
        Author: "Athenians",
        CreatedDate: new Date()
    };

    workbook.SheetNames.push("Rents");
    let header = new RentEntry({
        firstName: 'First Name',
        lastName: 'Last Name',
        cabin: 'Cabin',
        book: 'Book Title',
        startDate: 'Start Rent',
        endDate: 'End Rent'
    });
    let withHeader = [header.toObject()].concat(
        rentEntries.map(entry => entry.toObject())
    );
    var worksheet = XLSX.utils.json_to_sheet(withHeader,
        { header: ["lastName", "firstName", "cabin", "book", "startDate", "endDate"], skipHeader: true }
    );
    workbook.Sheets["Rents"] = worksheet;

    workbook.SheetNames.push("Returns");
    header = new ReturnEntry({
        firstName: 'First Name',
        lastName: 'Last Name',
        cabin: 'Cabin',
        book: 'Book Title',
        returnDate: 'Return Date'
    });
    withHeader = [header.toObject()].concat(
        returnEntries.map(entry => entry.toObject())
    );
    worksheet = XLSX.utils.json_to_sheet(withHeader,
        { header: ["lastName", "firstName", "cabin", "book", "returnDate"], skipHeader: true }
    );
    workbook.Sheets["Returns"] = worksheet;

    var exportedFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([s2ab(exportedFile)], { type: "application/octet-stream" }), 'athena-library-rent.xlsx');
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;
}