// Function to handle comment form submission
function commentFormHandler(event) {
  event.preventDefault();

  // Get values from the form
  const postIdInput = document.querySelector('input[name="post-id"]');
  const commentBodyInput = document.querySelector('textarea[name="comment-body"]');
  const postId = postIdInput.value;
  const body = commentBodyInput.value;

  // Check if the comment body is not empty
  if (body) {
    // Create a comment object
    const commentData = {
      postId: postId,
      body: body
    };

    // Send a POST request to the server
    fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Reload the page after successful comment submission
          document.location.reload();
        } else {
          console.error('Failed to submit comment');
        }
      })
      .catch(error => {
        console.error('Error submitting comment:', error);
      });
  }
}

// Attach the commentFormHandler to the forms submit
const newCommentForm = document.querySelector('#new-comment-form');
if (newCommentForm) {
  newCommentForm.addEventListener('submit', commentFormHandler);
}
