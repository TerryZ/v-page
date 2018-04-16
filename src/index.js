import vPage from './vPagination';

const Plugin = {
    install(Vue, options = {}){
        Vue.component(vPage.name, vPage);
    }
};

export default Plugin;