export default {
    orderByDesc(state) {
        let posts = state.allPosts.sort((a, b) => b.id - a.id);
        // console.log(posts);
        return (posts);
    }
};