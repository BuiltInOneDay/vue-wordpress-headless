/*
this is where we will eventually hold the data for all of our posts
*/
export const state = () => ({
    posts: []
})


/*export const getters = {
    getterValue: state => {
        return state.value
    }
}*/

/*
this will update the state with the posts
*/
export const mutations = {
    updatePosts: (state, posts) => {
        state.posts = posts
    }
}

/*

actions is where we will make an API call that gathers the posts,
and then commits the mutation to update it
*/
export const actions = {
    //this will be asynchronous
    async getPosts({
        state,
        commit
    }) {
        //the first thing we'll do is check if there's any length to the posts array in state, this means we already called the API, so don't do it again.
        if (state.posts.length) return
        try {
            let posts = await fetch('https://css-tricks.com/wp-json/wp/v2/posts?page=1&per_page=20&_embed=1').then(res => res.json())
            posts = posts
                .filter(el => el.status === "publish")
                .map(({ id, slug, title, excerpt, date, tags, content }) => ({
                    id,
                    slug,
                    title,
                    excerpt,
                    date,
                    tags,
                    content
                }))
            commit("updatePosts", posts)
        } catch (err) {
            console.log(err)
        }
    }
}