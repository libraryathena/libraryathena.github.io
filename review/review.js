const COLLECTION_ID = 'library';
const title = document.querySelector('#review-title');
const content = document.querySelector('#editor');
const submit = document.querySelector('#review-submit');
const formFile = document.querySelector('#formFile');

var quill;

function loadReview() {
    db.collection(COLLECTION_ID)
        .doc('review').get()
        .then((doc) => {
            let review = doc.data();
            title.value = review.title;
            content.innerHTML = review.content;
            if (review.cover) {
                preview.src = review.cover;
            }

            quill = new Quill('#editor', {
                theme: 'snow'
            });
        });
}

var image;

function saveReview() {
    if (formFile.files.length > 0) {
        storage.ref().child(uuidV4())
            .put(formFile.files[0])
            .then((file) => file.ref.getDownloadURL())
            .then((url) => db.collection(COLLECTION_ID)
                .doc('review')
                .update({
                    reviews: firebase.firestore.FieldValue.arrayUnion({
                        title: title.value,
                        content: quill.root.innerHTML,
                        cover: url
                    })
                })
            )
            .then(() => {
                alert('Success');
                location.reload();
            });
    } else {
        db.collection(COLLECTION_ID)
            .doc('review')
            .set({
                title: title.value,
                content: quill.root.innerHTML,
            })
            .then(() => {
                alert('Success');
            });
    }
}

function uuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

window.onload = () => {
    submit.onclick = saveReview;
    // loadReview();

    quill = new Quill('#editor', {
        theme: 'snow'
    });
}