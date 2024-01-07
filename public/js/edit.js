// Function to handle form submission for editing a post
function editFormHandler(event) {
  event.preventDefault();

  // Get values from the form
  const titleInput = document.querySelector('input[name="post-title"]');
  const bodyInput = document.querySelector('textarea[name="post-body"]');
  const title = titleInput.value;
  const body = bodyInput.value;

  // Check if title and body are not empty
  if (title && body) {
    // Create a post object
    const postData = {
      title: title,
      body: body
    };

    // Send a PUT request to update the post
    fetch(`/api/post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Redirect to the dashboard after successful update
          document.location.replace('/dashboard');
        } else {
          console.error('Failed to update post');
        }
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  }
}

// Function to handle click event for deleting a post
function deleteClickHandler() {
  // Send a DELETE request to delete the post
  fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (response.ok) {
        // Redirect to the dashboard after successful deletion
        document.location.replace('/dashboard');
      } else {
        console.error('Failed to delete post');
      }
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
}

// Attach event listeners to the form and delete button
const editPostForm = document.querySelector('#edit-post-form');
const deleteButton = document.querySelector('#delete-btn');

if (editPostForm) {
  editPostForm.addEventListener('submit', editFormHandler);
}

if (deleteButton) {
  deleteButton.addEventListener('click', deleteClickHandler);
}
