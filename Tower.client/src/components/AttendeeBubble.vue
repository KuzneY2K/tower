<template>
    <div class="p-0 m-0 d-flex flex-column justify-content-center align-items-center container" v-if="props.ticket">
        <img :src="props.ticket.profile.picture" alt="" height="60" width="60" class="mt-3 me-5 rounded rounded-pill elevation-5 border border-1 border-dark bubble" :title="props.ticket.profile.name" @click.prevent="deleteTicket(props.ticket.id)">
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Ticket } from '../models/Ticket.js';
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRouter } from 'vue-router';
    export default {
    props: { ticket: { type: Ticket, required: true } },
        setup(props){


            let router = useRouter()
            // function logTicket(){
            //     logger.log(props.ticket)
            // }

            // onMounted(() => {
            //     logTicket()
            // })
            return{
                props,

                async deleteTicket(ticketId){
                    try {
                        if(props.ticket.accountId == AppState.account.id){
                            if(await Pop.confirm('Unattend this event?')){
                                await ticketsService.deleteTicket(ticketId)
                                router.push({ name: 'Home', path: '/' })
                                Pop.toast('Event Unattended.')
                            } else {
                                Pop.toast('Ticket deletion cancelled.')
                            }
                        }
                    } catch (error) {
                        Pop.error(error)
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        width: 2rem;
    }

    .bubble{
        object-fit: cover;
    }
</style>