interface Blog {
  slug: string;
  title: string;
}

export interface PropsGroupedBlogs {
  tag: string;
  blogs: Blog[];
}