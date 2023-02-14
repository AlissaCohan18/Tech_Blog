async function newFormHandler(event) {
  event.preventDefault();

  const blog_title = document.querySelector("#blog_title").value;
  const blog_content = document.querySelector("#blog_content").value;



  const response = await fetch("/api/blogs", {
    method: "post",
    body: JSON.stringify({
      blog_title,
      blog_content,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newFormHandler);
