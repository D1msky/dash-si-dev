// Dummy imports

async function getPosts(id) {
    const res = await fetch(`https://api.vercel.app/blog`)
    const post = await res.json()
    if (!post) notFound()
    return post
}
export default async function Page() {

    const posts = await getPosts()

    return (
        <ul>
            {posts.map((post) => (
                <p>{post.id} judulnya {post.title}</p>
            ))}
        </ul>
    )
}