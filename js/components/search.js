Vue.component('search', {
    template: `
        <form action="#" class="search-form">
            <input 
            type="text" 
            class="search-field"
            v-model="searchLine"
            :changed.lazy="$emit('filter-search', searchLine)">
            <button 
            class="btn-search" 
            type="submit" 
            @click="$emit('filter-search', searchLine)">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `,
    data() {
        return {
            searchLine: ''
        }
    }
})