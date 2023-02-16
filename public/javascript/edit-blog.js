async function editFormHandler(event) {
    event.preventDefault();
    
    const blog_content = document.querySelector('input[name="blog-content"]').value.trim();
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    const response = await fetch(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        blog_content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
  
  document
    .querySelector(".edit-blog-form")
    .addEventListener("submit", editFormHandler);
  