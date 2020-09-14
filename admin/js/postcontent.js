CKEDITOR.replace( 'posteditor' );

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

let submitPostBtn = document.getElementById('submit-post');
submitPostBtn.addEventListener('click', function(e) {
    e.preventDefault();

    Array.from(document.querySelectorAll('#tags input[type="checkbox"]')).forEach(checkbox =>{
        console.log(checkbox.value);
    });

    const newPost = {
        title: document.getElementById('title-post').value,
        content: CKEDITOR.instances.posteditor.getData(),
        description: document.getElementById('description-post').value,
        user: localStorage.getItem('userId'),
        tags : []
    }
    let checkedTags = document.querySelectorAll('#tags input[type="checkbox"]:checked');
    Array.from(checkedTags).forEach(tag =>{
        let tagName = tag.id;
        newPost.tags.push(tagName.replace('-input', ''));
    })

    postData('http://127.0.0.1:12345/addpost', newPost)
        .then(data => {
            console.log(data);
        });

    e.preventDefault();

});



