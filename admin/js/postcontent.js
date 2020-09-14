if (document.querySelector('#addpost-form #submit-post') != null) {
    CKEDITOR.replace('posteditor');
    CKEDITOR.replace('posteditor-edit');
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
            console.log(data)
            if (data != null) {
                document.getElementById('noposts-warn').style.display = 'none';
                data.forEach(post => {
                    document.getElementById('manage-posts').insertAdjacentHTML('beforeend', `
                        <article id="${post.id}">
                            <h2>${post.title}</h2>
                            <p>${post.description}</p>
                            <ul class="post-tags"> </ul>
                            <a class="edit-post" ${post.id}>Edit post</a><a class="remove-post ${post.id}">Remove post</a>
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
                            }).then(data => {});
                        });
                    })
                    let editBtns = document.querySelectorAll('.edit-post');
                    editBtns.forEach(editBtn => {
                        editBtn.addEventListener('click', function () {
                            document.getElementById('edit-post').style.display = "flex";
                            let postId = this.classList[1];
                            postData('http://127.0.0.1:12345/getUser', {
                                id: localStorage.getItem('userId')
                            }).then(data => {
                                // document.getElementById('cancel').addEventListener('click', function () {
                                //     document.getElementById('edit-post').style.display = "none";
                                // })
                                // let postId = this.classList[1];
                                // const editedPost = {
                                //     title: document.getElementById('title-post').value,
                                //     content: CKEDITOR.instances.posteditor2.getData(),
                                //     description: document.getElementById('description-post').value,
                                //     user: localStorage.getItem('userId'),
                                //     tags: [],
                                //     id: postId
                                // }
                                // let checkedTags = document.querySelectorAll('#tags input[type="checkbox"]:checked');
                                // Array.from(checkedTags).forEach(tag => {
                                //     let tagName = tag.id;
                                //     editedPost.tags.push(tagName.replace('-input', ''));
                                // });
                                // postData('http://127.0.0.1:12345/editpost', editedPost).then(data => {});
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

let submitPostBtn = document.getElementById('submit-post');

if (document.getElementById('addpost-form') != null) {
    submitPostBtn.addEventListener('click', function (e) {
        e.preventDefault();

        Array.from(document.querySelectorAll('#tags input[type="checkbox"]')).forEach(checkbox => {
            console.log(checkbox.value);
        });

        const newPost = {
            title: document.getElementById('title-post').value,
            content: CKEDITOR.instances.posteditor.getData(),
            description: document.getElementById('description-post').value,
            user: localStorage.getItem('userId'),
            tags: []
        }
        let checkedTags = document.querySelectorAll('#tags input[type="checkbox"]:checked');
        Array.from(checkedTags).forEach(tag => {
            let tagName = tag.id;
            newPost.tags.push(tagName.replace('-input', ''));
        })

        postData('http://127.0.0.1:12345/addpost', newPost)
            .then(data => {
                showPosts();
            });

        e.preventDefault();
    });

}