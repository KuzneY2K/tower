<template>
    <div class="p-0 m-0 d-flex flex-column justify-content-center align-items-center">
        <img :src="props.comment.creator.picture" alt="" height="40" class="mt-3 rounded rounded-pill elevation-5 border border-1 border-dark">
        <span>{{ props.comment.creator.name }}</span>
    </div>
</template>

<script>
import { Comment } from '../models/Comment.js'
    export default {
    props: { comment: { type: Comment || Object, required: true } },
        setup(props){
            return{
                props,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>