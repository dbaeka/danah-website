export default function() {
  return [
    {
      title: "Hub",
      to: "/admin/",
      htmlBefore: '<i class="material-icons">home</i>',
    },
    {
      title: "Blog Posts",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/admin/blog-posts",
    },
    {
      title: "Videos",
      htmlBefore: '<i class="material-icons">movie</i>',
      to: "/admin/videos",
    },
    {
      title: "Books",
      htmlBefore: '<i class="material-icons">local_library</i>',
      to: "/admin/books",
    },
  ];
}
