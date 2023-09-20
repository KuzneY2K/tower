<template>
    <div>
        <h2>{{event.name}}</h2>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import {eventsService} from '../services/EventsService.js'
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';

    export default {
        setup(){
            const route = useRoute()

            async function getEventById(){
                try {
                    await eventsService.getEventById(route.params.eventId)
                    logger.log(AppState.activeEvent)
                } catch (error) {
                    Pop.error(error)
                }
            }

            onMounted(() => {
                // getEventById()
            })
            return {
                event: computed(() => AppState.activeEvent)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>