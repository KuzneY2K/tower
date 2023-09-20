<template>
          <ul class="list-group list position-relative d-flex flex-row justify-content-center align-items-center text-center ms-5">
            <li class="list-item li-o me-4 px-4 py-3 rounded">
              Concerts
            </li>
            <li class="list-item li-t mb-5 me-4 px-4 py-3 rounded">
              Conventions
            </li>
            <li class="list-item li-th me-4 px-4 py-3 rounded">
              Sports
            </li>
            <li class="list-item li-f mb-5 px-4 py-3 rounded">
              Digital
            </li>
          </ul>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

.list-item{

    background-color: transparent !important;
    list-style-type: none;
}
.li-o{
    top: 0rem;
    border: 1px solid black;
    width: 10rem;
}

.li-t{
    top: 10rem;
    border: 1px solid black;
        width: 10rem;
}

.li-th{
    top: 20rem;
    border: 1px solid black;
        width: 10rem;
}
.li-f{
    top: 30rem;
    border: 1px solid black;
        width: 10rem;
}

</style>