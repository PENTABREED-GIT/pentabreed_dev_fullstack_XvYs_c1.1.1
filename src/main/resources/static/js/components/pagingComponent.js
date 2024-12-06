//! 뷰를 위한 페이징 컴포넌트
const Pagination = {
    props: {
        clickPage: { type: Number, required: true },
        totalCount: { type: Number, required: true },
    },
    emits: ['call-back'],
    setup(props, {emit}) {
        console.log('\n\n---------- 컴포넌트 setup ----------')
        console.log('전달 받은 props')
        console.log({...props})


        const pageShowButtonCount = computed(() => 10);
        const lastPageButtonNum = computed(() => Math.ceil(props.totalCount / limit));
        const clickPage = computed(() => props.clickPage);
        const totalCount = computed(() => props.totalCount);


        const doEmit = (n) => {
            console.log(`doEmit 호출  param = ${n}`)
            emit('call-back', n)
        }

        return {pageShowButtonCount, lastPageButtonNum, doEmit, clickPage, totalCount}
    },
    template: `
        <nav aria-label="Page navigation example">
            <ul class="pagination" id="paging">
        
                <!--맨앞 버튼-->
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous" @click.prevent="doEmit(1)">
                    <span aria-hidden="true">&laquo;&laquo;</span>
                  </a>
                </li>        
        
                <!--이전 버튼-->
                <li class="page-item" v-if="clickPage > 1">
                  <a class="page-link" href="#" aria-label="Previous" @click.prevent="doEmit(clickPage-1)">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item" v-else>
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
        
                <!--페이지 버튼들-->
                <template v-for="n in pageShowButtonCount">
                    <template v-if="n <= lastPageButtonNum">
                        <template v-if="n == clickPage">
                            <li class="page-item active" v-if="n <= lastPageButtonNum">
                                <a class="page-link" href="#" @click.prevent="doEmit(n)">{{ n }}</a>
                            </li>
                        </template>
                        <template v-else>
                            <li class="page-item" v-if="n <= lastPageButtonNum">
                                <a class="page-link" href="#" @click.prevent="doEmit(n)">{{ n }}</a>
                            </li>
                        </template>
                    </template>
                </template>
        
                <!--다음 버튼-->
                <li class="page-item" v-if="clickPage < lastPageButtonNum">
                  <a class="page-link" href="#" aria-label="Next" @click.prevent="doEmit(clickPage+1)">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
                <li class="page-item" v-else>
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
                
                
                <!--맨끝 버튼-->
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next" @click.prevent="doEmit(lastPageButtonNum)">
                    <span aria-hidden="true">&raquo;&raquo;</span>
                  </a>
                </li>
                
            </ul>
        </nav>
    `
};
