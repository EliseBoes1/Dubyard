const date = new Date();

if (document.querySelector('#addpost-form #submit-post') != null) {
    CKEDITOR.replace('posteditor');

}

if (document.querySelector('#edit-post #addpost-form') != null) {
    CKEDITOR.replace('posteditoredit');
};

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

let showPosts = () => {
    postData('http://127.0.0.1:12345/getposts', {
            'id': localStorage.getItem("userId")
        })
        .then(data => {
            if (data != null) {
                document.getElementById('noposts-warn').style.display = 'none';
                data.forEach(post => {
                    document.getElementById('manage-posts').insertAdjacentHTML('afterbegin', `
                        <article id="${post.id}">
                            <h2>${post.title}</h2>
                            <p>${post.description}</p>
                            <ul class="post-tags"><li>Tags: </li></ul>
                            <ul class="post-date">Geplaatst op: ${post.day}/${post.month}/${post.year}</ul>
                            <a class="edit-post ${post.id}">Edit post</a><a class="remove-post ${post.id}">Remove post</a>
                            <img src ="${post.img}" alt="">
                        </article>
                    `)
                    post.tags.forEach(tag => {
                        document.querySelector(`article#${post.id} .post-tags`).insertAdjacentHTML("beforeend", `
                            <li>${tag}</li>
                        `)
                    });
                    let removeBtns = document.querySelectorAll('.remove-post');
                    removeBtns.forEach(removeBtn => {
                        removeBtn.addEventListener('click', function () {
                            let postId = this.classList[1];
                            postData('http://127.0.0.1:12345/removepost', {
                                user: localStorage.getItem('userId'),
                                post: postId
                            }).then(data => {
                                window.location.href = "manageposts.html";
                            });
                        });
                    })
                    let editBtns = document.querySelectorAll('.edit-post');
                    editBtns.forEach(editBtn => {
                        editBtn.addEventListener('click', function () {
                            document.getElementById('edit-post').style.display = "flex";
                            let postId = this.classList[1];
                            let setForm = (post) => {
                                document.getElementById('title-post').value = post.title;
                                document.getElementById('description-post').value = post.description;
                                CKEDITOR.instances.posteditoredit.setData(post.content);
                                document.getElementById('img-post').value = post.img;
                                //CHECKED BUTTONS CHECKEN
                                // document.getElementById('title-post').value = data.title;
                            }
                            postData('http://127.0.0.1:12345/getpost', {
                                id: postId
                            }).then(data => {
                                setForm(data, postId);
                                postForm(data, postId);
                            });
                        });
                    })
                });
            } else {
                document.getElementById('noposts-warn').style.display = 'block';
            }
        });
}
if (document.getElementById('manage-posts') != null) {
    showPosts();
}

let postForm = (data, postId) => {
    document.getElementById('cancel').addEventListener('click', function () {
        document.getElementById('edit-post').style.display = "none";
    })

    let sendForm = (data, postId) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const editedPost = {
            title: document.getElementById('title-post').value,
            content: CKEDITOR.instances.posteditoredit.getData(),
            description: document.getElementById('description-post').value,
            img: document.getElementById('img-post'),
            tags: [],
            user: localStorage.getItem('userId'),
            id: postId,
            lastedited: {
                day: day,
                month: month,
                year: year
            }
        }
        let checkedTags = document.querySelectorAll('#tags input[type="checkbox"]:checked');
        Array.from(checkedTags).forEach(tag => {
            let tagName = tag.id;
            editedPost.tags.push(tagName.replace('-input', ''));
        });
        postData('http://127.0.0.1:12345/editpost', editedPost).then(data => {});
    }

    document.getElementById('edit-post-btn').addEventListener('click', function (e) {
        e.preventDefault();
        postData('http://127.0.0.1:12345/getpost', {
            id: postId
        }).then(data => {
            sendForm(data, postId);
        });
    });
}